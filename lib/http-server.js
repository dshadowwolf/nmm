/*
 * core HTTP server for NMM
 * based on hapi and bus.io
 */

var console = require('console'),
    hapi = require('hapi'),
    busio = require('bus.io'),
    fu = require('./file-utils');
