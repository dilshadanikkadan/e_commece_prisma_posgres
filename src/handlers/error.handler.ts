 class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const createError = (
  statusCode: number,
  message: any
): CustomError => {
  try {
    return new CustomError(statusCode, message);
  } catch (error) {}
};
