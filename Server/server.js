const express = require("express");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-route");
const inRoutes = require("./routes/in-routes");
const adminRoutes = require("./routes/admin-routes");
const profileRoutes = require("./routes/profile-route.js");
const passportSetup = require("./config/passport-setup");
const localStrategy = require("./config/local-strategy");
const ServiceRoutes = require("./routes/service-routes");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const Admin = require("./Models/admin-model");
const MapStyle = require("./Models/mapStyle");
const {
  Deppanage,
  Garages,
  Hotels,
  Restaurant,
  Parking,
  Mechanic,
} = require("./Models/services-model");
const port = 3000;
const cors = require("cors");
const { ObjectId } = require("mongodb");
// const ip = "192.168.1.104";
const ip = "192.168.229.189";

// initiaize express
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

// Express session
app.use(
  expressSession({
    secret: keys.session.cookiekey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/DriverDB",
      collection: "sessions",
    }),
  })
);
// Passport config
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/DriverDB", {
  useNewUrlParser: true,
});

// Routes
app.use("/auth", authRoutes);
app.use("/in", inRoutes);
app.use("/admin", adminRoutes);
app.use("/Services", ServiceRoutes);
app.use("/user", profileRoutes);

app.listen(port, ip, () => {
  console.log(`Server is running on ${ip}:${port}`);
});
