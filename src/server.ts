import config from '@config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';
import routes from './api/routes';
import deserializeUser from './middleware/deserializeUser';
import ErrorHandler from './middleware/ErrorHandler';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors(config.cors));
app.use(compression());
app.use(express.json());
app.use(deserializeUser);

// Routes
app.use(routes);

// Error Handlers
app.use(ErrorHandler);

const PORT = config.port;
const api = app.listen(PORT, async () => {
	const db = await createConnection(config.db);

	console.log('Server running on http://localhost:' + PORT);
});
