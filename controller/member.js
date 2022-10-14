/* eslint-disable max-len */
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
      limit,
      where: filter ? {member: {[Op.iLike]: `%${filter}%`}} : '',
    });

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

const hierarchy = async (data) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const children = await Member.findAll({
      where: {parent_id: element.id}});

    if (children) {
      children.children = await hierarchy(children);
    }

    data[index].dataValues.children = children;
  }

  return data;
};

const getAllParent = async (req, res) => {
  try {
    const dataMember = await Member.findAll({
      where: {parent_id: null},
    });

    if (dataMember) {
      data = await hierarchy(dataMember);
    }

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

module.exports = {getAll, create, getAllParent};
