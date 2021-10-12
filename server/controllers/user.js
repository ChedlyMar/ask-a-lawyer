import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const signup = async (req, res) => {
  const body = req.body;
  let image = "images/default_avatar.jpeg";

  if (req.file) image = req.file.path;

  let newUser = new User({ ...body, image });
  try {
    // hash password
    const salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, salt);
    // save user
    newUser = await newUser.save();

    // create token
    const payload = {
      id: newUser.id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ user: newUser, token });
  } catch (error) {
    // check if email user exist
    if (error.code === 11000) {
      res.status(400).json({ message: "that email is already registered" });
    }

    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // search user
    const foundUser = await User.findOne({ email });
    if (foundUser == null) {
      res.status(400).json({ message: "Bad credential" });
    }
    // compaire password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      res.status(400).json({ message: "Bad credential" });
    }
    // create token
    const payload = {
      id: foundUser.id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });

    res.status(200).json({ user: foundUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const currentUser = async (req, res) => {
  console.log("req.user");
  res.status(200).json(req.user);
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await User.deleteOne({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).message({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  let image = body.image;
  if (req.file) image = req.file.path;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { ...body, image },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
