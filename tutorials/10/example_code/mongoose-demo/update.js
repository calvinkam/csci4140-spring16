var mongoose = require( 'mongoose' );
var User = require( './model' );
var uristring = require( './config' );

var db = mongoose.connection;

if ( process.argv.length <= 2 ) {
	console.error( 'Usage: node update [Object ID]' );
	return;
}

var disconnect = ( function() {
	db.close();
	console.log( 'Disconnected' );
} );

db.on( 'error', console.error );
db.once( 'open', function() {
	console.log( 'Connection established' );

	// Find user by ID
	User.findById( process.argv[ 2 ], function( err, user ) {
		if ( err )
			throw err;

		user.age = 22;
		user.save( function( err ) {
			if ( err )
				throw err;
			else
				console.log( 'Updated' );

			disconnect();
		} );
	} );
} );

mongoose.connect( uristring );
