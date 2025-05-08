import express from 'express';
import setup from './src/controller/routes.js';
import connectionToDb from './database.js';
import cors from 'cors';

const app = express();
/*const host = 'localhost';*/
const host = '0.0.0.0';
const port = 8000;

app.use(express.json());
/*app.use(cors({ origin: 'http://localhost:5173' }));*/
app.use(cors({
	origin: ['http://localhost:5173', 'http://localhost:8080'],
}));

connectionToDb().then(() => {
	setup(app);
	app.listen(port, host, () => {
		console.log('Server is running on http://localhost:8000');
	})
}).catch((error) => {
	console.log('Server not started' + error)
})

export default app;

