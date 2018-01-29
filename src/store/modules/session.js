/* Can't use vuex mutations with these airbnb rules:                     */
/* eslint-disable no-param-reassign                                      */

import axios from 'axios';

// Axios config
const config = {
  validateStatus(httpCode) {
    // Accept HTTP 200 to 500 Return codes
    return httpCode >= 200 && httpCode <= 500;
  },
};

const actions = {
  request(vuexUnused, { query, variables }) {
    return new Promise((resolve, reject) => {
      // Request payload: query + arguments (variables)
      const payload = {
        query,
        variables,
      };

      return axios.post('/graphql', payload, config)
        .then((response) => {
          if (response.data.errors) {
            const serverMessage = response.data.errors[0].message;
            reject(new Error(serverMessage));
          } else {
            resolve(response.data.data);
          }
        })
        .catch((err) => {
          // Humanize error messages for known error conditions
          if (err.message.includes('504')) {
            reject(new Error('Unable to connect to the server.  Please try again later.'));
          } else {
            reject(err);
          }
        });
    });
  },
};

export default {
  namespaced: true,
  actions,
};
