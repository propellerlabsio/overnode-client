/**
 * This vuex module manages the user account and related actions.
 *
 * See the 'session' module initiating a session once an access token
 * has been acquired.
 */

const actions = {
  /**
   * Create a new user account
   *
   * @param {any} { commit }
   * @param {any} { email, password }
   * @returns {Boolean}  User was created (true/false)
   */
  create({ dispatch }, { email, password }) {
    // Mutation query
    const query = `
      mutation($email: String!, $password: String!){
        createUser(email: $email, password: $password)
      }
    `;

    // Mutation variables
    const variables = {
      email,
      password,
    };

    return dispatch('session/request', { query, variables }, { root: true });
  },

  async requestAccessToken({ dispatch }, { email, password, permanent = false }) {
    // Mutation query
    const query = `mutation($email: String!, $password: String!, $permanent: Boolean!){
      requestToken(email: $email, password: $password, permanent: $permanent)
    }`;

    // Mutation variables
    const variables = {
      email,
      password,
      permanent,
    };

    const response = await dispatch('session/request', { query, variables }, { root: true });
    return response.requestToken;
  },
};

export default {
  namespaced: true,
  actions,
};
