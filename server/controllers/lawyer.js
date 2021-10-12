import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Lawyer from "../models/Lawyer.js";

export const getLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find();

    res.status(200).json(lawyers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getLawyerByUserId = async (req, res) => {
//   const { userId } = req.params;
//   const { lawyerId } = req.params;
//   const { manadri } = req.params;
//   console.log("userId : " + userId);
//   console.log("lawyerId : " + lawyerId);
//   console.log("manadri : " + manadri);

//   try {
//     console.log("hi");
//   } catch (error) {}
// };

export const getLawyerById = async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer = await Lawyer.findById(id);
    res.status(200).json(lawyer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLawyer = async (req, res) => {
  const body = req.body;
  const newLawyer = new Lawyer(body);
  try {
    const salt = await bcrypt.genSalt();
    newLawyer.password = await bcrypt.hash(newLawyer.password, salt);

    await newLawyer.save();

    res.status(200).json(newLawyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLawyer = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const address = JSON.parse(body.address);

  let image = body.image;
  if (req.file) image = req.file.path;

  try {
    const lawyer = await Lawyer.findByIdAndUpdate(
      id,
      { ...body, address, image },
      { new: true }
    );
    res.status(200).json(lawyer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteLawyer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Lawyer.deleteOne({ _id: id });
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const body = req.body;

  let image = "images/default_avatar.jpeg";
  if (req.file) image = req.file.path;

  let newLawyer = new Lawyer({ ...body, image });
  try {
    // hash password
    const salt = await bcrypt.genSalt();
    newLawyer.password = await bcrypt.hash(newLawyer.password, salt);
    // save user
    newLawyer = await newLawyer.save();

    // create token
    const payload = {
      id: newLawyer.id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ lawyer: newLawyer, token });
  } catch (error) {
    // check if email user exist
    if (error.code === 11000) {
      res.status(400).json({ message: "that email is already registered" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // search user
    const foundLawyer = await Lawyer.findOne({ email });

    if (foundLawyer == null) {
      res.status(400).json({ message: "Bad credential" });
    }
    // compaire password
    const match = await bcrypt.compare(password, foundLawyer.password);
    if (!match) {
      res.status(400).json({ message: "Bad credential" });
    }
    // create token
    const payload = {
      id: foundLawyer.id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7 days",
    });

    res.status(200).json({ lawyer: foundLawyer, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const currentLawyer = async (req, res) => {
  res.status(200).json(req.lawyer);
};
