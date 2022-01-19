import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from '../conversation/conversation.model';
import { User } from '../user/user.model';

@Entity()
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Conversation)
	room: Conversation;

	@ManyToOne(() => User)
	@JoinColumn()
	creator: User;

	@Column()
	message: string;
}
