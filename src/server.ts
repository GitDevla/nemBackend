import express from 'express';
import config from '../config';

const app = express();

app.use(express.json());

const PORT = config.port;
app.listen(PORT, () => {
	console.log('Server running on http://localhost:' + PORT);
});
