export abstract class APIError extends Error {
	statusCode: number = 0;
	name: string = '';
	constructor(m: string) {
		super(m);
		Object.setPrototypeOf(this, APIError.prototype);
	}
}

export class InvalidParameter extends APIError {
	statusCode: number = 400;
	name: string = 'INVALID_PARAMETER';
}

export class NotFound extends APIError {
	statusCode: number = 404;
	name: string = 'NOT_FOUND';
}

export class Unauthorized extends APIError {
	statusCode: number = 403;
	name: string = 'UNAUTHORIZED';
}

export class Conflict extends APIError {
	statusCode: number = 409;
	name: string = 'CONFLICT';
}
