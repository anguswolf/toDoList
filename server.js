const express = require('express');
const app = express();
const host = 'localhost';
const port = 8000;
const setup = require('./controller/routes');


app.use(express.json());
setup(app);

app.listen(8000, () => {
	console.log('Server is running on http://localhost:8000');
})


//server.listen(port,host, () => {console.log('Server running at localhost:8000')});
//app.listen(port,host, () => {console.log('Server running at http:// ${host}:${port}')});

