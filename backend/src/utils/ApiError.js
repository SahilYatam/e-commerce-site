export class ApiError extends Error{
    constructor(statusCode, message="Internal Server Error", errors = [], stack = ""){
        super(message);
        this.status = statusCode;
        this.error = errors;

        this.success = false;
        this.data = null;

        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}