module.exports = class UserDto {
  email;
  id;
  userDataId;

  constructor(model) {
      this.email = model.email;
      this.id = model._id;
      this.userDataId = model.userDataId;
  }
}