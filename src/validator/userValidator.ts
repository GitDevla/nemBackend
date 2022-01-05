import * as Yup from 'yup';

export const registerSchema = Yup.object({
	username: Yup.string().required(),
	email: Yup.string().email().lowercase().required(),
	password: Yup.string().min(5).required(),
});

export type registerType = Yup.InferType<typeof registerSchema>;
