// nodemon server.js
// page 30
var express	= require('express');
var app		= express();
var path	= require('path');

app.get('/', function(req, res)
{
	res.sendFile(path.join(__dirname + '/index.html'));
});

var adminRouter	= express.Router();

adminRouter.get('/', function(req, res)
{
	res.send ('Soy el panel principal.');
});

adminRouter.get('/users', function(req, res)
{
	res.send ('Muestro todos los usuarios.');
});

adminRouter.get('/users/:name', function(req, res)
{
	res.send ('Usuario: ' + req.params.name);
});

adminRouter.get('/posts', function(req, res)
{
	res.send ('Muestro todos los post.');
});

adminRouter.get('/login').get(function(req, res)
{
	res.send('Formulario de Login');
}).post(function(req, res)
{
	console.log('Procesar login');
	res.send('Procesando login');
});

app.use(function(req, res, next)
{
	console.log('[server] ' + req.method, req.url);

	next();
});

adminRouter.param('name', function(req, res, next, name)
{
	console.log('[server] ' + 'validación para: ' + name);
	req.name = name;

	next();
});

adminRouter.get('/hola/:name', function(req, res)
{
	res.send ('Hola ' + req.name);
});

app.use('/admin', adminRouter);

app.listen(1337);
console.log('1337 is listening');