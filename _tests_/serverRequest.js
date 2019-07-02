const $ = require('jquery');

module.exports.getItem = () => {
  $.ajax({
    url: `/api/${Math.floor(Math.random() * 100)}`,
    type: 'GET',
    success: (data) => {
      return data;
    }
  })
}