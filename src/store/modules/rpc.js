import { stripExtraDoubleQuotes, booleanStringToBoolean } from './util/strings';

const MAX_HISTORY_PER_COMMAND = 7;

const initialState = {
  selectedName: '',
  input: {},
  commands: [],
  help: [],
  history: [],
  output: null,
};

const mutations = {
  /**
   * Add help text to the state.help array for the currently selected
   * command.
   */
  addHelp(state, text) {
    state.help.push({
      command: state.selectedName,
      text,
    });
  },

  /**
   * Add the current input and output for the selected command to the history array
   */
  addHistory(state) {
    // Lose any object references to state
    const input = Object.assign({}, state.input);
    const output = typeof state.output === 'object' ?
      Object.assign({}, state.output) :
      state.output;

    // Add item to top of history stack
    state.history.unshift({
      command: state.selectedName,
      time: new Date(),
      input,
      output,
    });

    // Trim old history
    state
      .history
      .filter(item => item.command === state.selectedName)
      .slice(MAX_HISTORY_PER_COMMAND)
      .forEach((item) => {
        const index = state
          .history
          .findIndex(candidate => candidate.command === item.command &&
            candidate.time === item.time);
        state.history.splice(index, 1);
      });
  },

  reloadHistoricalItem(state, { command, time }) {
    const item = state
      .history
      .find(itemX =>
        itemX.command === command &&
        itemX.time === time);
    if (item) {
      state.input = item.input;
      state.output = item.output;
    } else {
      throw new Error(`No history for command ${command} at time ${time} found`);
    }
  },

  /**
   * Reset input object to parameters for selected command with
   * values initialized to default value
   */
  resetInput(state) {
    state.input = {};
    if (state.selectedName) {
      // Get arguments for selected command
      const args = state
        .commands
        .find(command => command.name === state.selectedName)
        .args;

      // Add propert to state.input for each argument giving it a default
      // value from the scheme typedef or null
      if (args) {
        args.forEach((arg) => {
          state.input[arg.name] = JSON.parse(arg.defaultValue);
        });
      }
    }
  },

  setInputValue(state, { argumentName, argumentValue }) {
    state.input[argumentName] = argumentValue;
    // Reset output as it no longer matches input
    state.output = null;
  },

  setCommands(state, commands) {
    state.commands = commands;
  },

  setOutput(state, output) {
    state.output = output;
  },

  setSelected(state, name) {
    state.selectedName = name;
  },
};

const getters = {
  selectedCommand: state => state.commands.find(command => command.name === state.selectedName),
  selectedHelp: state => state.help
    .filter(help => help.command === state.selectedName)
    .map(help => help.text)[0],
  selectedHistory: state => state.history
    .filter(history => history.command === state.selectedName),
};

const actions = {
  async init({ dispatch, commit }) {
    // Get available RPC commands and their arguments via graphql introspection.
    // There's no way to query just what we need unfortunately so we'll have to get
    // everything and filter it later
    const query = `query {
        __schema {
          types {
            name
            fields {
              name
              description
              args {
                name
                type {
                  name
                  ofType {
                    name
                  }        
                }
                defaultValue
              }              
            }
          }
        }
      }      
    `;
    const variables = { };
    const response = await dispatch('session/request', { query, variables }, { root: true });

    // Get Rpc object from whole schema and add the rpc commands to our state
    // eslint-disable-next-line no-underscore-dangle
    const rpcObject = response.__schema.types.find(({ name }) => name === 'Rpc');
    const rpcCommands = rpcObject.fields.filter(command => command.name !== 'authorized');
    commit('setCommands', rpcCommands);
  },

  async execute({ state, commit, dispatch }) {
    commit('setOutput', null);

    // Build arguments / values string
    const command = getters.selectedCommand(state);
    let argsString = '';
    const args = state.input;
    Object.keys(args)
      .filter(arg => args[arg] != null)
      .forEach((argName) => {
        const argDef = command.args.find(arg => arg.name === argName);
        const graphQlType = argDef.type.name || argDef.type.ofType.name;
        let nextArg;
        if (graphQlType === 'String') {
          nextArg = `${argName}: "${args[argName]}"`;
        } else if (graphQlType === 'Boolean') {
          nextArg = `${argName}: ${booleanStringToBoolean(args[argName])}`;
        } else {
          nextArg = `${argName}: ${args[argName]}`;
        }
        if (!argsString) {
          argsString = nextArg;
        } else {
          argsString = `${argsString}, ${nextArg}`;
        }
      });
    if (argsString) {
      argsString = `(${argsString})`;
    }

    // Build query
    const query = `query {
      rpc {
        ${state.selectedName}${argsString}
      }
    }`;

    const response = await dispatch('session/request', { query, variables: state.input }, { root: true });
    const output = response.rpc[state.selectedName];
    const convertedOutput = JSON.parse(output);
    commit('setOutput', convertedOutput);
    commit('addHistory');
  },

  async setSelected({ state, commit, dispatch }, commandName) {
    // Clear any previous results
    commit('setOutput', null);

    // See if we need to load all commands from server first
    if (!state.commands.length) {
      await dispatch('init');
    }

    // Set selected command and reset any input from previous commands
    commit('setSelected', commandName);
    commit('resetInput');

    // If we haven't already stored help for this command, request it now
    if (!getters.selectedHelp(state)) {
      const query = `{
        rpc {
          help(command: "${state.selectedName}")
        }
      }`;

      const response = await dispatch('session/request', { query, variables: {} }, { root: true });
      const help = response.rpc.help;
      const parsed = JSON.parse(help);
      commit('addHelp', parsed);
    }
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions,
};
