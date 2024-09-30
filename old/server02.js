const express = require('express');
const app = express();
/*app.use((req,res,next)=>{
	console.log('Sono un middleware di app');
	next();
	});
*/
//const http = require('http');
const host = 'localhost';
const port = 8000;

const getListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('My First Server<br>' + 'param1 = ' + req.query.param1);
	};
//const server = http.createServer(requestListener);

const postListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('Chiamata: POST<br>' + 'param1 = ' + req.query.param1);
	};

const putListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('Chiamata: PUT<br>' + 'param1 = ' + req.query.param1);
	};

const patchListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('Chiamata: PATCH<br>' + 'param1 = ' + req.query.param1);
	};

const deleteListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('Chiamata: DELETET<br>' + 'param1 = ' + req.query.param1);
	};

app.get('/',
	(req,res,next)=>{
		console.log('Sono un middleware di api/get');
		next(new Error('Sono un errore del middleware get'));
		},
	(req,res,next)=>{
		console.log('Sono un middleware di api/get2');
		next();
		},
	getListener);

app.get('/prova', getListener);

app.post('/', postListener);
app.put('/', putListener);
app.patch('/', patchListener);
app.delete('/', deleteListener);

//server.listen(port,host, () => {console.log('Server running at localhost:8000')});
app.listen(port,host, () => {console.log('Server running at http:// ${host}:${port}')});

