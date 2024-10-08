class DomainException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      // This clips the constructor invocation from the stack trace.
      // It's not absolutely essential, but it does make the stack trace a little nicer.
      // @see Node.js reference
      Error.captureStackTrace(this, this.constructor);
    }
  }
  export default DomainException;