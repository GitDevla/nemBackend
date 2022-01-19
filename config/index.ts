import { CorsOptions } from 'cors';
import { config } from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { generateSecret, getSecret } from './utils';
config({ path: `.env.${process.env.NODE_ENV}` });

const isProduction = process.env.NODE_ENV === 'prod';

export default {
	isProduction,
	port: process.env.PORT || 3001,

	db: <ConnectionOptions>{
		type: 'mysql',
		url: process.env.DB_URL,
		synchronize: !isProduction,
		entities: ['src/api/**/*.model.ts'],
	},

	cors: <CorsOptions>{
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'REMOVE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	},

	jwt: {
		token: getSecret('jwt') || generateSecret('jwt', 32),
		config: { expiresIn: '90d' },
	},

	encryption: {
		rounds: 12,
		papper: getSecret('papper') || generateSecret('papper', 14),
	},
};
