const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jtw = require("jsonwebtoken");
const { Types } = require("mongoose");

const jtwSecret = process.env.JWT_SECRET;

// Gerando o TOKEN do USER

const generateToken = (id) => {
  return jtw.sign({ id }, jtwSecret, {
    expiresIn: "7d",
  });
};

// Registrar User e Logar
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Checar se o User existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
    return;
  }

  // Gerar a senha hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Criar User
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // Checar se o User foi criado com sucesso, returnar o token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Obter o usuário logado
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Entra no User
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //Checa se o User existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }

  //Checar a senha
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  //Retorna User com o Token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Update do usuario

const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(new Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  if (name) {
    user.name = name;
  }

  if (password) {
    // Gerar a senha hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Pegar o usuário pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(new Types.ObjectId(id)).select(
      "-password"
    );
    //Checar se o Usuário existe
    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado."] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado 2."] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};