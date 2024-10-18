import DomainException from './DomainException.js'
class ForbiddenException extends DomainException {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.status = 403;
    this.code = code || null;
  }
}
export default ForbiddenException;