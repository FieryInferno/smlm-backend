let data;
let code;
let status;
let message;

const {Member} = require('../models');

const getAll = async (req, res) => {
  try {
    data = await Member.findAndCountAll();
    status = 'Success';
    message = 'Success';
  } catch (error) {
    data = {};
    status = 'Failed';
    message = 'Failed';
  } finally {
    return res.status(code).send({
      status,
      message,
      data,
    });
  }
};

module.exports = {getAll};
