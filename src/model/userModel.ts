import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import bcrypt from 'bcrypt';
import config from '../../config';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	async validatePassword(plainPass: string) {
		return await bcrypt.compare(plainPass + config.encryption.papper, this.password);
	}
}
