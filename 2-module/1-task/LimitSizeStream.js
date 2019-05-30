const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.size = 0;
<<<<<<< HEAD
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length;
=======
    this.isObjectMode = !!options.readableObjectMode;
  }

  _transform(chunk, encoding, callback) {
    if (this.isObjectMode) {
      this.size += 1;
    } else {
      this.size += chunk.length;
    }
>>>>>>> 86a56d226299d5b2c3acca9da4bc75dea23fe2f2

    if (this.size > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
