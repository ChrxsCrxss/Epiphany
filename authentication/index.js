require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const mongoose = require("mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const findOrCreate = require("mongoose-findorcreate");

// - - - - - - - - - - - Set up Express Server and Middleware - - - - - - - - - 
const app = express();

app.use(cors());

// initalize passport middleware 
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());


// set up cors to allow us to accept requests from our client
app.use(cors());

app.use(
    cookieSession({
      name: "session",
      keys: 'randomKey',
      maxAge: 24 * 60 * 60 * 100
    })
  );

// parse cookies
app.use(cookieParser());

// set up routes
app.use("/auth", authRoutes);

// - - - - - - - - - -  Connect to MongoDB and create Schema - - - - - - - - - -  
// Connect to remote Mongo Atlas database
mongoose.connect("mongodb+srv://ChrisCross:Crossmongo@cluster0.wwh6v.mongodb.net/impactHackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    googleId: String,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);




// - - - - - - - - - -  Setup Google strategy using Passport API - - - - - - - - - -  

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(e => {
            done(new Error("Failed to deserialize an user"));
        });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/redirect",
},
    async (accessToken, refreshToken, profile, done) => {

        // find current user in UserModel
        const currentUser = await User.findOne({
            twitterId: profile._json.id_str
        });
        // create new user if the database doesn't have this user
        if (!currentUser) {
            const newUser = await new User({
                name: profile._json.name,
                screenName: profile._json.screen_name,
                twitterId: profile._json.id_str,
                profileImageUrl: profile._json.profile_image_url
            }).save();
            
            if (newUser) {
                done(null, newUser);
            }
        }

        console.log(profile);

        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return done(err, user);
        });

    })
);

const authCheck = (req, res, next) => {
    next();
};

app.get("/", authCheck, (req, res) => {
    res.status(200)
});

// connect react to nodejs express server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
});