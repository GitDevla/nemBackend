import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.model';

@Entity()
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => User, (u) => u.profile)
	@JoinColumn()
	owner: User;

	@Column({ default: '' })
	fullName: string;

	@Column({ default: '' })
	birthPlace: string;

	@Column({ default: '' })
	birthDate: string;

	@Column({ default: '' })
	mothersName: string;

	@Column({ default: '' })
	socialSecurityNumber: string;

	@Column({ default: '' })
	VAT: string;

	@Column({ default: '' })
	phoneNumber: string;

	@Column({ default: '' })
	contactEmail: string;
}
