'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line require-jsdoc
  class Member extends Model {
    // eslint-disable-next-line require-jsdoc
    static associate(models) {

    }
  }
  Member.init({
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    member: DataTypes.STRING,
    parent_id: DataTypes.UUIDV4,
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
