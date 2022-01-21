import { InferType, object } from 'yup';

const body = object().shape({});

const params = object().shape({});

const updateBody = object().shape({});

export const CreateTempSchema = object({ body });
export const ReadTempSchema = object({ params });
export const UpdateTempSchema = object({ params, body: updateBody });
export const DeleteTempSchema = object({ params });

export type CreateTempType = InferType<typeof CreateTempSchema>;
export type ReadTempType = InferType<typeof ReadTempSchema>;
export type DeleteTempType = InferType<typeof DeleteTempSchema>;
export type UpdateTempType = InferType<typeof UpdateTempSchema>;
