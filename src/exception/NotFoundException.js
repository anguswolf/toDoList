import DomainException from './DomainException.js'
class NotFoundException extends DomainException {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.status = 404;
    this.code = code || null;
  }
}
export default NotFoundException;