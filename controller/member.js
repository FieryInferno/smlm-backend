let data;
let code;
let status;
let message;

const {Member} = require('../models');
const {validationResult} = require('express-validator');
const {Op} = require('sequelize');

const getAll = async (req, res) => {
  try {
    const {limit, filter} = req.query;

    data = await Member.findAndCountAll({
      include: ['parent', 'children'],
      limit,
      where: filter ? {member: {[Op.iLike]: `%${filter}%`}} : '',
    });

    status = 'Success';
    message = 'Success';
    code = 200;
  } catch (error) {
    console.log(error);
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

const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      status = 'Bad Request';
      message = errors;
      code = 400;
      data = {};
    } else {
      data = await Member.create(req.body);
      status = 'Success';
      message = 'Success';
      code = 201;
    }
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

module.exports = {getAll, create};
