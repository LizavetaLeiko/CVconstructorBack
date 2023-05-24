const UserDataModel = require("../models/userData-model")

class UserDataService {

  async setUserData(_id, photo, name, speciality, experiens, contacts, hardSkills, aboutMe, education, work, technologes) {
    const body = {
      _id,
      photo,
      name,
      speciality,
      experiens,
      contacts,
      hardSkills,
      aboutMe,
      education,
      work,
      technologes,
    }
    const user = await UserDataModel.findOneAndUpdate({ _id: _id }, { ...body }, { new: true });
    return user;
  }

  async getUserData(id) {
    const user = await UserDataModel.findOne({_id: id});
    return user
  }
}

module.exports = new UserDataService();
