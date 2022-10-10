let data;
let code;
let status;
let message;

const {Member} = require('../models');

const getAll = async (req, res) => {
  try {
    data = await Member.findAndCountAll({include: ['parent', 'children']});
    status = 'Success';
    message = 'Success';
    code = 200;
  } catch (error) {
    data = {};
    status = 'Failed';
    message = error;
    code = 400;
  } finally {
    return res.status(code).send({
      status,
      message,
      data,
    });
  }
};

module.exports = {getAll};
