import express from 'express';
import config from '../config';
import cors from 'cors';
import routes from './routes/routes';
import ErrorHandler from './middleware/ErrorHandler';
import { createConnection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

// Middlewares
app.use(helmet());
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'REMOVE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(compression());
app.use(express.json());

// Routes
app.use(routes);

// Error Handlers
app.use(ErrorHandler);

const startServer = async () => {
	const db = createConnection();

	const PORT = config.port;
	const api = app.listen(PORT, () => {
		console.log('Server running on http://localhost:' + PORT);
	});
};

startServer();

module.exports = app;
