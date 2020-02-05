const HttpError = require("../models/http-error");
const uuid = require("uuid/v4");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Jack Wachowsky",
    email: "test@test.com",
    password: "password"
  }
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const registeredUser = DUMMY_USERS.find(u => u.email === email);
  if (registeredUser) {
    throw new HttpError("Could not create user, email existed", 422);
  }

  const createdUser = {
    id: uuid(),
    name: name, // name: name
    email: email,
    password: password
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user", 401);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
