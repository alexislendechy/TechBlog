const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const Sequelize = require('sequelize'); // Import Sequelize
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const app = express();

// Sequelize Configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'your-password',
  database: 'your-database-name',
});

// Import your Sequelize models
const User = sequelize.import(__dirname + '/models/User');
const BlogPost = sequelize.import(__dirname + '/models/BlogPost');
const Comment = sequelize.import(__dirname + '/models/Comment');

// Define associations between models
BlogPost.belongsTo(User);
User.hasMany(BlogPost);

Comment.belongsTo(User);
Comment.belongsTo(BlogPost);
User.hasMany(Comment);
BlogPost.hasMany(Comment);

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure sessions
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport.js setup for authentication

// ... Configure passport local strategy and serialize/deserialize user

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes')(passport);
const blogRoutes = require('./routes/blogRoutes')(User, BlogPost, Comment); 
const userRoutes = require('./routes/userRoutes')(User, BlogPost, Comment); 
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
