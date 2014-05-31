var cookieParser = require('generic-cookie-parser');

function parseCookies(parser, cookies, container, callback) {
  container.cookies = {};
  container.signedCookies = {};

  if (cookies) {
    try {
      parser(cookies, function(err, cookies, signedCookies) {
        if(err) {
          throw err;
        }

        container.cookies = cookies;
        container.signedCookies = signedCookies;
      });
    } catch (err) {
      if(typeof callback === 'function') {
        return callback(err);
      }
    }
  }

  callback();
}

module.exports = function createCookieParsers(secret, options) {
  var parser = cookieParser(secret, options);
  return {
    express: function parse(req, res, next) {
      if (req.cookies) {
        return next();
      }

      req.secret = secret;
      parseCookies(parser, req.headers.cookie, req, function(err) {
        if(err) {
          err.status = 400;
          return next(err);
        }

        next();
      });
    },

    socket: function parse(socket, next) {
      if (socket.cookies) {
        return next();
      }

      socket.secret = secret;
      parseCookies(parser, socket.request.headers.cookie, socket, next);
    }
  };
};