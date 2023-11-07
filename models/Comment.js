const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define any other fields you need for your comments
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Comment.belongsTo(models.BlogPost, {
      foreignKey: 'blogPostId',
    });
  };

  return Comment;
};
