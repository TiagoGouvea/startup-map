const axios = require('axios');
const baseUrl = '@@baseUrl';

module.exports = {
  getAddress: function(cep) {
    return axios.get('http://api.postmon.com.br/v1/cep/' + cep)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.debug(error)
      })
  },
  getAllCompanies: function() {
    return axios.get(baseUrl + 'apiNew.php')
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.debug(error)
      })
  },
  getCompanyById: function(id) {
    return axios.get(baseUrl + 'apiNew.php?id=' + id)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.debug(error)
      })
  },
  sendCompanyData: function(data) {
    return axios.post(baseUrl + 'addNew.php', {
        data
      })
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.debug(error)
      })
  }
}
