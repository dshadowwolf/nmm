/* jshint node: true */

var yaml = require("../dependencies/js-yaml");
var fs = require( "fs" );
var path = require( "path" );
var console = require( "console" );
var conf;

function config( options ) {
    var base_path, filename;
    if( options ) {
	base_path = 'path' in options ? options.path : path.dirname(require.main.filename);
	filename = 'file' in options ? options.file : "settings.yaml";
    } else {
	base_path = path.dirname(require.main.filename);
	filename = "settings.yaml";
    }	
    var full_path = path.resolve( base_path, filename );
    var base_data = "";
    var hasFile = false;

    try {
	base_data = fs.readFileSync( full_path, 'utf8' );
	hasFile = true;
    } catch(err) {
	if( err.code == 'ENOENT' ) {
	    console.warn( 'Configuration file not found - using defaults' );
	} else {
	    // rethrow error
	    throw err;
	}
    }
    
    if( hasFile ) {
	try {
	    conf = yaml.load(base_data);
	} catch(err) {
	    // simply rethrow the error
	    throw err;
	}
    }
}

config.prototype.getValue = function(name) {
	if( name in this.conf ) {
	    return this.conf[name];
	} else {
	    return undefined;
	}
};

config.prototype.setValue = function(name,val) {
	this.conf[name] = val;
};

config.prototype.conf = [];

module.exports = config;

