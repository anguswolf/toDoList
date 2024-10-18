import express from 'express';
import setup from './src/controller/routes.js';
import connectionToDb from './database.js';

const app = express();
const host = 'localhost';
const port = 8000;

app.use(express.json());

connectionToDb().then(() => {
	setup(app);
	app.listen(port, host, () => {
		console.log('Server is running on http://localhost:8000');
	})
}).catch((error) => {
	console.log('Server not started' + error)
})

