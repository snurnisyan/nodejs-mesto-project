import StatusCodes from '../utils/status-codes';

class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message: string) {
    return new CustomError(StatusCodes.BAD_REQUEST, message);
  }

  static Unauthorized(message: string) {
    return new CustomError(StatusCodes.UNAUTHORIZED, message);
  }

  static Forbidden(message: string) {
    return new CustomError(StatusCodes.FORBIDDEN, message);
  }

  static NotFound(message: string) {
    return new CustomError(StatusCodes.NOT_FOUND, message);
  }

  static Conflict(message: string) {
    return new CustomError(StatusCodes.CONFLICT, message);
  }
}

export default CustomError;
