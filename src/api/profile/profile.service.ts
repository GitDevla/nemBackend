import { User } from '../user/user.model';
import { Profile } from './profile.model';
import { UpdateProfileType } from './profile.schema';

export const updateProfile = async (user: User, input: UpdateProfileType['body']) => {
	let user2 = await User.findOne({ id: user.id }, { relations: ['profile'] });
	if (!user2) throw new Error();
	let infoCard;
	if (!user2.profile) {
		infoCard = new Profile();
		infoCard.owner = user;
	} else infoCard = user2.profile;
	infoCard.birthDate = input.birthDate || infoCard.birthDate;
	infoCard.VAT = input.VAT || infoCard.VAT;
	infoCard.birthPlace = input.birthPlace || infoCard.birthPlace;
	infoCard.contactEmail = input.contactEmail || infoCard.contactEmail;
	infoCard.fullName = input.fullName || infoCard.fullName;
	infoCard.mothersName = input.mothersName || infoCard.mothersName;
	infoCard.phoneNumber = input.phoneNumber || infoCard.phoneNumber;
	await infoCard.save();
	return infoCard;
};
