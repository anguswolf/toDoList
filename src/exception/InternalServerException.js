import DomainException from './DomainException.js'

class InternalServerException extends DomainException {
  constructor(message, code) {
    super(message);
    this.status = 500;
    this.code = code || null;
  }
}
export default InternalServerException