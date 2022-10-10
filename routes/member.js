const controller = require('../controller/member');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
    );

    next();
  });

  app.get('/member', controller.getAll);
};
