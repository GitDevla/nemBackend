import { Router } from 'express';
import validateSchema from '../../middleware/schemaValidator';
import {
	createTempHandler,
	deleteTempHandler,
	readTempHandler,
	readTempsHandler,
	updateTempHandler,
} from './temp.controller';
import {
	CreateTempSchema,
	DeleteTempSchema,
	ReadTempSchema,
	UpdateTempSchema,
} from './temp.schema';

const tempRoute = Router();

// CREATE
tempRoute.post('/', validateSchema(CreateTempSchema), createTempHandler);

// READ
tempRoute.get('/', readTempsHandler);
tempRoute.get('/:id', validateSchema(ReadTempSchema), readTempHandler);

// UPDATE
tempRoute.post('/:id', validateSchema(UpdateTempSchema), updateTempHandler);

// DELETE
tempRoute.post('/:id', validateSchema(DeleteTempSchema), deleteTempHandler);

export default tempRoute;
