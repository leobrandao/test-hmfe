var express = require( 'express' ),
	request = require( 'request'),
	handlebars = require( "express-handlebars" ),
	app = express(),
	PORT = 3000,
	authenticate = require( './modules/authenticate.js' )
	getList = require( './modules/getList.js' ),
	getAddress = require( './modules/getAddress.js' ),
	addAddress = require( './modules/addAddress.js' ),
	editAddress = require( './modules/editAddress.js' ),
	deleteAddress = require( './modules/deleteAddress.js' ),
	bodyParser = require( 'body-parser' ),
	userLogged = false,
	hm_access_token = '';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

function isAuthenticated(req, res, next) {

    if (userLogged) {
        return next();
    }

    res.redirect('/');
}

/*
 * Template Engine - Handlebars
 */
handlebars = handlebars.create( {
	"defaultLayout": "main"
} );
app.engine( "handlebars", handlebars.engine );
app.set( "view engine", "handlebars" );

app.get('/', function ( req, res ) {
	if( !userLogged ){
		res.render('home');
	} else {
		res.redirect('/list')
	}
});

app.post('/login', function ( req, res ) {
	authenticate( req.body.email, req.body.password ).then( function (data) {
		if(typeof data.access_token !== 'undefined' && data.expires_in > 0 ){
			userLogged = true;
			hm_access_token = data.access_token;
			res.redirect('/list');
		} else {
			console.log('unable to log in');
			res.redirect('/');
		}
		
	}, function (error) {
		console.log('error: ', error);
		res.redirect('/');
	});
});

app.get('/list', isAuthenticated, function ( req, res ) {
	getList( hm_access_token ).then( function ( data ) {
		res.render( 'list', {'data': data.data } );
	}, function( error ){
		console.log('error: ', error);
	});
});

app.get('/edit/:id', isAuthenticated, function ( req, res ) {
	getAddress( req.params.id, hm_access_token ).then( function ( data ) {
		res.render( 'edit', {'data': data } );
	}, function( error ){
		console.log('error: ', error);
	});
});

app.post('/edit/:id', isAuthenticated, function ( req, res ) {
	var editedAddress = {
		  'label': req.body.label,
		  'latitude': req.body.latitude,
		  'longitude': req.body.longitude,
		  'city': req.body.city,
		  'zipCode': req.body.zipCode,
		  'state': req.body.state,
		  'complement': req.body.complement,
		  'address': req.body.address,
		  'neighborhood': req.body.neighborhood,
		  'number': req.body.number,
		  'country': req.body.country,
		  'availableItems': [] 
		};

	editAddress( editedAddress, req.params.id, hm_access_token ).then( function ( data ) {
		res.redirect( '/list' );
	}, function( error ){
		console.log('error: ', error);
	});
});

app.get('/create', isAuthenticated, function (req, res) {
    res.render( 'create' );
});

app.post('/create', isAuthenticated, function ( req, res ) {
	var newAddress = {
		  'label': req.body.label,
		  'latitude': req.body.latitude,
		  'longitude': req.body.longitude,
		  'city': req.body.city,
		  'zipCode': req.body.zipCode,
		  'state': req.body.state,
		  'complement': req.body.complement,
		  'address': req.body.address,
		  'neighborhood': req.body.neighborhood,
		  'number': req.body.number,
		  'country': req.body.country
		};

	addAddress( newAddress, hm_access_token ).then( function (data) {
		console.log('success, redirecting...');
		res.redirect('/list');
	}, function( error ){
		console.log('error: ', error);
	});
});

app.get('/delete/:id', isAuthenticated, function ( req, res ) {
	deleteAddress( req.params.id, hm_access_token ).then( function ( data ) {
		res.redirect( '/list' );
	}, function( error ){
		console.log('error: ', error);
	});
});
	

app.listen(PORT, function() {
	console.log('The application is running on port: ' + PORT + '!');
})