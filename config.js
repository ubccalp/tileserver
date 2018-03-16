"use strict";

var path = require('path');

var config = {
  PORT: process.env.PORT|| 80,
  IPADDRESS: process.env.IPADDRESS || '0.0.0.0',
  TILES_DIR: process.env.MY_DATA_DIR || path.join(__dirname, '/data'),
  MAP_DIR: path.join(__dirname, '/static/map'),
}

module.exports = config;
