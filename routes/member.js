const controller = require('../controller/member');
const {body} = require('express-validator');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
    );

    next();
  });

  app.get('/member', controller.getAll);
  app.get('/parent', controller.getAllParent);
  app.post(
      '/member',
      body('member').notEmpty().withMessage('Member cannot be null'),
      controller.create,
  );
};
