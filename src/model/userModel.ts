import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { hashSync, compare } from 'bcrypt';
import { Exclude } from 'class-transformer';
import config from '../../config';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Exclude()
	@Column({ name: 'password' })
	private _password: string;

	async setPassword(plain: string) {
		this._password = hashSync(plain + config.encryption.papper, config.encryption.rounds);
	}

	async validatePassword(plainPass: string) {
		return await compare(plainPass + config.encryption.papper, this._password);
	}
}
