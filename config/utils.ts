import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path/posix';

export function getSecret(filename: string) {
	const filePath = path.join(__dirname, '/tokens', filename);
	if (!fs.existsSync(filePath)) return null;
	let secret = fs.readFileSync(filePath, 'utf8');
	return secret;
}

export function generateSecret(filename: string, strength = 32) {
	const filePath = path.join(__dirname, '/tokens', filename);
	const secret = randomBytes(strength).toString('hex');
	fs.writeFileSync(filePath, secret);
	return secret;
}
