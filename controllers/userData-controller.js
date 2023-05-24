const userDataService = require("../service/userData-service");

class UserDataController {

  async setUserData(req, res, next) {
    try {
      const { _id, photo, name, speciality, experiens, contacts, hardSkills, aboutMe, education, work, technologes } = req.body;
      const userData = await userDataService.setUserData(_id, photo, name, speciality, experiens, contacts, hardSkills, aboutMe, education, work, technologes);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUserData(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userDataService.getUserData(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new UserDataController();