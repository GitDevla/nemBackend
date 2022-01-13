import { compare, hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import config from '../../config';
import { Post } from './postModel';

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

	@OneToMany(() => Post, (post) => post.message)
	@JoinTable()
	posts: Post[];

	async setPassword(plain: string) {
		this._password = hashSync(plain + config.encryption.papper, config.encryption.rounds);
	}

	async validatePassword(plainPass: string) {
		return await compare(plainPass + config.encryption.papper, this._password);
	}
}
