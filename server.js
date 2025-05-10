import express from 'express';
import setup from './src/controller/routes.js';
import connectionToDb from './database.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
	origin: [process.env.CLIENT_URL, process.env.ALT_CLIENT_URL],
}));

connectionToDb().then(() => {
	setup(app);
	app.listen(port, host, () => {
		console.log(`Server is running on http://${host}:${port}`);
	})
}).catch((error) => {
	console.log('Server not started' + error)
})

export default app;

