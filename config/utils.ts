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
	const dirpath = path.join(__dirname, '/tokens');
	if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath);
	const filePath = path.join(dirpath, filename);
	const secret = randomBytes(strength).toString('hex');
	fs.writeFileSync(filePath, secret);
	return secret;
}
