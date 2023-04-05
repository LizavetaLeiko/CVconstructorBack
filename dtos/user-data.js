module.exports = class UserDataDto {
  photo;
  name;
  speciality;
  experiens;
  contacts;
  hardSkills;
  aboutMe;
  education;
  work;
  technologes;

  constructor(model) {
    this.photo = model.photo;
    this.name = model.name;
    this.speciality = model.speciality;
    this.experiens = model.experiens;
    this.contacts = model.contacts;
    this.hardSkills = model.hardSkills;
    this.aboutMe = model.aboutMe;
    this.education = model.education;
    this.work = model.work;
    this.technologes = model.technologes;
  }
}
