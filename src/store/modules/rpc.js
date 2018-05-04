import Vue from 'vue';

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
    // Lose any references to state objects/arrays
    const input = Object.assign({}, state.input);
    Object.keys(input)
      .forEach((key) => {
        if (Array.isArray(input[key])) {
          input[key] = input[key].slice();
        }
      });
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
          let defaultValue = JSON.parse(arg.defaultValue);
          if (arg.type.kind === 'LIST' && defaultValue === null) {
            // Insert empty record for form input field
            defaultValue = [null];
          }
          Vue.set(state.input, arg.name, defaultValue);
        });
      }
    }
  },

  addInputArrayItem(state, { argumentName, argumentValue, arrayIndex = null }) {
    const array = state.input[argumentName].slice();
    array.splice(arrayIndex, 0, argumentValue);
    Vue.set(state.input, argumentName, array);

    // Reset output as it no longer matches input
    state.output = null;
  },

  removeInputArrayItem(state, { argumentName, arrayIndex }) {
    state.input[argumentName].splice(arrayIndex, 1);

    // Reset output as it no longer matches input
    state.output = null;
  },


  setInputValue(state, { argumentName, argumentValue, arrayIndex = null }) {
    if (arrayIndex !== null) {
      Vue.set(state.input[argumentName], arrayIndex, argumentValue);
    } else {
      state.input[argumentName] = argumentValue;
    }
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
                  kind
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
    const args = Object.assign({}, state.input);
    let argsString = '';
    Object
      .keys(args)
      .filter((argName) => {
        // Filter out no value arguments
        let hasValue = false;
        const argValue = args[argName];
        if (Array.isArray(argValue)) {
          // Test array has any value
          hasValue = argValue.findIndex(value => value != null && value !== '') > -1;
        } else {
          // Test for null or undefined with != instead of !==
          hasValue = argValue != null;
        }
        return hasValue;
      })
      .forEach((argName) => {
        if (!argsString) {
          argsString = '(';
        } else {
          argsString = argsString.concat(', ');
        }

        // Filter out no value array elements (arrays may contain mix of user values +
        // null or zero-length string 'new entry' lines)
        let argValue = args[argName];
        if (Array.isArray(argValue)) {
          argValue = argValue.filter(x => x != null && x !== '');
        }

        // Parse/validate and the stringify JSON type arguments
        const argDef = getters.selectedCommand(state).args.find(x => x.name === argName);
        const argType = argDef.type.name || argDef.type.ofType.name;
        const isJson = argType === 'JSON';
        if (isJson) {
          argValue = JSON.parse(argValue);
          argValue = JSON.stringify(argValue);
        }

        argsString = argsString.concat(argName, ': ', JSON.stringify(argValue));
      });

    // Close parenthesis
    if (argsString) {
      argsString = argsString.concat(')');
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
        rpc_help(command: "${state.selectedName}")
      }`;

      const response = await dispatch('session/request', { query, variables: {} }, { root: true });
      const help = JSON.parse(response.rpc_help);
      commit('addHelp', help);
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
