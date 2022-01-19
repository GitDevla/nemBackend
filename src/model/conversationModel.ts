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
import { Message } from './messageModel';
import { User } from './userModel';

@Entity()
export class Conversation extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => User)
	@JoinColumn()
	creator: User;

	@ManyToMany(() => User)
	@JoinTable()
	users: User[];

	@OneToMany(() => Message, (m) => m.room)
	@JoinColumn()
	messages: Message[];
}
