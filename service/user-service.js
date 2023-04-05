const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
// const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const userDataModel = require("../models/userData-model");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `User with email ${email}  already exists`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    // const activationLink = uuid.v4();
    const userData = await userDataModel.create({});
    const user = await UserModel.create({
      email,
      password: hashPassword,
      // activationLink,
      userDataId: userData._id,
    }).populate('userDataId');
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/accountinfo/${activationLink}`
    // );

    const userDto = new UserDto(user); 
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  // async activate(activationLink) {
  //   const user = await UserModel.findOne({ activationLink });
  //   if (!user) {
  //     throw ApiError.BadRequest("Неккоректная ссылка активации");
  //   }
  //   user.isActivated = true;
  //   await user.save();
  // }

  async login(email, password) {
    const user = await UserModel.findOne({ email }).populate('userDataId');
    if (!user) {
      throw ApiError.BadRequest("User with this email not found");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Incorrect password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id).populate('userDataId');
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find().populate('userDataId');
    return users;
  }

  async getUser(userId) {
    const user = await UserModel.findOne({ _id: userId }).populate('userDataId');
    return user;
  }
}

module.exports = new UserService();