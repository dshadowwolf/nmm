/*
 * core HTTP server for NMM
 * based on hapi and bus.io
 */

var console = require('console'),
    hapi = require('hapi');

function server(address,port,options) {
    var sa, sp, so; // safety check storage
    if( options !== undefined )
	so = options;
    else
	so = { cors: true };

    if( port !== undefined )
	sp = port;
    else
	sp = 80;

    if( address !== undefined )
	sa = address;
    else
	sa = '0.0.0.0'; // bind to all interfaces, basically

    var self = this;

    this.status = {
	actual: 'ok',
	handler: function( request, reply ) {
	    reply( self.status.actual );
	}
    };

    this.server = new hapi.Server(sa,sp,so);
    this.bus = require('bus.io')(this.server.listener);
    this.server.route({ method: 'GET', path: '/status', config: this.status });
};

server.prototype.route = function(data) {
    this.server.route(data);
};

server.prototype.onMessage = function(ev,cb) {
    this.bus.on(ev,cb);
};

server.prototype.server = function() {
    return this.server;
};

server.prototype.bus = function() {
    return this.bus;
};

server.prototype.run = function(cb) {
    this.server.start(cb);
};

server.prototype.stop = function(opts,cb) {
    this.server.stop(opts,cb);
};
