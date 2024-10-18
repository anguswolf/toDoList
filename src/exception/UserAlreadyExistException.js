import DomainException from './DomainException.js'

class UserAlreadyExistsException extends DomainException {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.status = 409;
    this.code = code;
  }
}
export default UserAlreadyExistsException;