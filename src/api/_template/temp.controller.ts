import { Request, Response } from 'express';
import { CreateTempType, DeleteTempType, ReadTempType, UpdateTempType } from './temp.schema';

export const createTempHandler = async (
	req: Request<{}, {}, CreateTempType['body']>,
	res: Response,
) => {};

export const readTempsHandler = async (req: Request, res: Response) => {};

export const readTempHandler = async (req: Request<ReadTempType['params']>, res: Response) => {};

export const updateTempHandler = async (
	req: Request<UpdateTempType['params'], {}, UpdateTempType['body']>,
	res: Response,
) => {};

export const deleteTempHandler = async (
	req: Request<DeleteTempType['params']>,
	res: Response,
) => {};
