import DomainException from './DomainException.js'

class UnauthorizedException extends DomainException {
  constructor(message, code) {
    super(message);
    this.status = 401;
    this.code = code || null;
  }
}

export default UnauthorizedException;