const initialState = {
  selectedName: '',
  input: {},
  commands: [],
  output: null,
};

const mutations = {
  /**
   * Reset input object to parameters for selected command with
   * values initialized to default value
   */
  resetInput(state) {
    state.input = {};
    if (state.selectedName) {
      const args = state
        .commands
        .find(command => command.name === state.selectedName)
        .args;
      if (args) {
        args.forEach((arg) => {
          const graphQlType = arg.type.name || arg.type.ofType.name;
          if (arg.defaultValue && graphQlType === 'Int') {
            state.input[arg.name] = Number(arg.defaultValue);
          } else {
            state.input[arg.name] = arg.defaultValue;
          }
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
    // eslint-disable-next-line no-underscore-dangle
    const rpcObject = response.__schema.types.find(({ name }) => name === 'Rpc');
    const rpcCommands = rpcObject.fields.filter(command => command.name !== 'authorized');
    commit('setCommands', rpcCommands);
  },

  /* eslint-disable */
  async execute({ state, commit, dispatch }) {
    commit('setOutput', null);

    // Build arguments / values string
    let argsString = '';
    const args = state.input;
    Object.keys(args)
      .filter(arg => args[arg] != null)
      .forEach((arg) => {
        let nextArg
        if (typeof args[arg] === "string") {
          nextArg = `${arg}: "${args[arg]}"`;
        } else {
          nextArg = `${arg}: ${args[arg]}`;
        }
        if (!argsString) {
          argsString = nextArg;
        } else {
          argsString = `${argsString}, ${nextArg}`
        }
      });
    if (argsString) {
      argsString = `(${argsString})`
    }

    // Build query
    const query = `query {
      rpc {
        ${state.selectedName}${argsString}
      }
    }`;

    const response = await dispatch('session/request', { query, variables: state.input }, { root: true });
    const output = response.rpc[state.selectedName];
    let convertedOutput = JSON.parse(output);
    commit('setOutput', convertedOutput);
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
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions,
};
