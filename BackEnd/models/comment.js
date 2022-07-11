'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'postId',
      });

      models.Post.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: 'postId',
        otherKey: 'userId',
      });

      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      })
    }
  }
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'Post',
        Key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'User',
        key: 'id'
      }
  },
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};