import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
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
}
