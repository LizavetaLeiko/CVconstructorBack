module.exports = class UserDto {
  email;
  id;
  userDataId;

  constructor(model) {
      this.email = model.email;
      this.id = model._id;
      this.likedFilms = model.likedFilms;
      this.userDataId = model.userDataId;
  }
}