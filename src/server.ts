import express from 'express';
import config from '../config';
import cors from 'cors';
import routes from './routes/routes';
import ErrorHandler from './middleware/ErrorHandler';
import { createConnection } from 'typeorm';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

// Error Handlers
app.use(ErrorHandler);

const startServer = async () => {
	// Database
	await createConnection();

	// API
	const PORT = config.port;
	app.listen(PORT, () => {
		console.log('Server running on http://localhost:' + PORT);
	});
};

startServer();
