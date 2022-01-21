import { InferType, object, string } from 'yup';

export const body = object().shape({
	fullName: string(),
	birthPlace: string(),
	birthDate: string(),
	mothersName: string(),
	socialSecurityNumber: string(),
	VAT: string(),
	phoneNumber: string(),
	contactEmail: string(),
});

export const UpdateProfileSchema = object({ body });

export type UpdateProfileType = InferType<typeof UpdateProfileSchema>;
