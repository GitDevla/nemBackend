import { config } from 'dotenv';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path/posix';
config();

export default {
	port: process.env.PORT || 3000,
	jwt: {
		token: process.env.JWT_TOKEN || getSecret('jwt') || generateSecret('jwt', 32),
		config: { expiresIn: '90d' },
	},
};

function getSecret(filename: string) {
	const filePath = path.join(__dirname, filename);
	if (!fs.existsSync(filePath)) return null;
	let secret = fs.readFileSync(filePath, 'utf8');
	return secret;
}

function generateSecret(filename: string, strength = 32) {
	const filePath = path.join(__dirname, filename);
	const secret = randomBytes(strength).toString('hex');
	fs.writeFileSync(filePath, secret);
	return secret;
}
