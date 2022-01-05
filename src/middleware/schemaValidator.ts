import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import { InvalidParameter } from '../util/ApiErrors';

const validateSchema = (schema: Yup.AnySchema) => {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			const validated = await schema.validate(req.body);
			req.body = validated;
			next();
		} catch (err: any) {
			throw new InvalidParameter(err.message);
		}
	};
};

export default validateSchema;
