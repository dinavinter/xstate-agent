'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.postScreenSet = function postScreenSet (req, res, next, body, screenSet) {
  Default.postScreenSet(body, screenSet)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
