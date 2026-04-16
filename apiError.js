class ApiError extends Error {
    constructor(statuscode , message , error = []) {
        super(message);
        this.message = message;
        this.statuscode = statuscode;
        this.success = statuscode < 400;
        this.error = error;
    }
}


export default ApiError;