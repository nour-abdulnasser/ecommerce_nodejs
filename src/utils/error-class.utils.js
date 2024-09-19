export class ErrorClass extends Error {
    constructor(message, {statusCode}, data, location, stack) {
      // super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.data = data;
      this.location = location;
      this.stack = stack;
    }
  }
  