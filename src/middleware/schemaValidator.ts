import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { InvalidParameter } from '../util/ApiErrors';

const validateSchema =
	(schema: Yup.AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			return next();
		} catch (err: any) {
			throw new InvalidParameter(err.message);
		}
	};

export default validateSchema;
