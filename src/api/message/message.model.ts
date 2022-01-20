import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from '../conversation/conversation.model';
import { User } from '../user/user.model';

@Entity()
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Conversation, (conv) => conv.messages, { onDelete: 'CASCADE' })
	room: Conversation;

	@ManyToOne(() => User)
	@JoinColumn()
	creator: User;

	@Column()
	message: string;
}
