import { compare, hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import config from '../../config';
import { ConversationRoom } from './conversationRoomModel';

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

	@ManyToMany(() => ConversationRoom)
	conversationRooms: ConversationRoom[];

	async setPassword(plain: string) {
		this._password = hashSync(plain + config.encryption.papper, config.encryption.rounds);
	}

	async validatePassword(plainPass: string) {
		return await compare(plainPass + config.encryption.papper, this._password);
	}
}
