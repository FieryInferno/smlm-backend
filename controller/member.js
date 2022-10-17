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

const getChildAndBonus = async (element) => {
  try {
    const children = await Member.findAll({
      where: {parent_id: element.id},
    });

    let bonus = 0;

    if (children) {
      bonus += children.length * 1;
      children.children = await hierarchy(children);

      children.forEach((child) => {
        bonus += child.dataValues.children?.length * 0.5;
      });
    }

    return {children, bonus};
  } catch (error) {
    console.log(error);
  }
};

const hierarchy = async (data) => {
  try {
    if (Array.isArray(data)) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const {bonus, children} = await getChildAndBonus(element);

        data[index].dataValues.children = children;
        data[index].dataValues.bonus = bonus;
      }
    } else {
      const {bonus, children} = await getChildAndBonus(data);

      data.dataValues.children = children;
      data.dataValues.bonus = bonus;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
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

const get = async (req, res) => {
  try {
    const {id} = req.params;
    const dataMember = await Member.findByPk(id);

    if (dataMember) {
      data = await hierarchy(dataMember);
    }

    status = 'Success';
    code = 200;
    message = 'Success';
  } catch (error) {
    data = {};
    code = 400;
    message = error;
    status = 'Failed';
  } finally {
    return res.status(code).send({
      status,
      message,
      data,
    });
  }
};

const migrate = async (req, res) => {
  try {
    const errors = validationResult(req);
    const {id} = req.params;

    if (!errors.isEmpty()) {
      status = 'Bad Request';
      message = errors;
      code = 400;
      data = {};
    } else {
      data = await Member.update({parent_id: req.body.parent_id}, {where: {id}});
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

module.exports = {getAll, create, getAllParent, get, migrate};
