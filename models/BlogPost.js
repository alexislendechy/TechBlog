const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Define any other fields you need for your blog post
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    BlogPost.hasMany(models.Comment, {
      foreignKey: 'blogPostId',
    });
  };

  return BlogPost;
};
