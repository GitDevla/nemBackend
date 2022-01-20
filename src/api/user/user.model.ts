import config from '@config';
import { compare, hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Conversation } from '../conversation/conversation.model';

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
	_password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToMany(() => Conversation)
	conversationRooms: Conversation[];

	async setPassword(plain: string) {
		this._password = hashSync(plain + config.encryption.papper, config.encryption.rounds);
	}

	async validatePassword(plainPass: string) {
		return await compare(plainPass + config.encryption.papper, this._password);
	}
}
