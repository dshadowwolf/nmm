var console = require('console');
var cnf = require('./config.js');
//var conf = new cnf( { 'file' : "settings01.yaml", 'path' : "/etc" } );
var conf = new cnf();

console.log( conf.getValue('blargh') );
conf.setValue( 'blargh', true );
console.log( conf.getValue('blargh') );
