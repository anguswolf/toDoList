const express = require('express');
const app = express();
const host = 'localhost';
const port = 8000;
const setup = require('./controller/routes');
const connectionToDb = require('./database')

app.use(express.json());

connectionToDb().then(() => {
	setup(app);
	app.listen(8000, () => {
		console.log('Server is running on http://localhost:8000');
	})
}).catch((error) => {
	console.log('Server not started' + error)
})

