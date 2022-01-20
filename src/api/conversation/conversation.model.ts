import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../message/message.model';
import { User } from '../user/user.model';

@Entity()
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => User)
	@JoinColumn()
	owner: User;

	@ManyToMany(() => User)
	@JoinTable()
	users: User[];

	@OneToMany(() => Message, (m) => m.room)
	@JoinColumn()
	messages: Message[];
}
