const express = require('express');
const app = express();

//const http = require('http');
const host = 'localhost';
const port = 8000;

const requestListener = function(req,res){
	res.setHeader('Content-Type','text/html');	
	res.writeHead(200);
	res.end('My First Server<br>' + 'param1 = ' + req.param('param1'));
	};
//const server = http.createServer(requestListener);

app.get('/',requestListener);
app.get('/prova',requestListener);

//server.listen(port,host, () => {console.log('Server running at localhost:8000')});
app.listen(port,host, () => {console.log('Server running at localhost:8000')});

