class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(message: string) {
    return new CustomError(400, message);
  }

  static Unauthorized(message: string) {
    return new CustomError(401, message);
  }

  static NotFound(message: string) {
    return new CustomError(404, message);
  }

  static InternalServer() {
    return new CustomError(500, 'Произошла ошибка на сервере');
  }
}

export default CustomError;
