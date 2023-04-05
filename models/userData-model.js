const { Schema, model } = require("mongoose");

const UserDataSchema = new Schema({
  photo: { type: String, default: ''},
  name: { type: String, default: ''},
  speciality: { type: String, default: ''},
  experiens: { type: String, default: ''},
  contacts: { type: Array, default: []},
  hardSkills: { type: Array, default: []},
  aboutMe: { type: String, default: ''},
  education: { type: String, default: ''},
  work: { type: Array, default: []},
  technologes: { type: Array, default: []},
});

module.exports = model("UserData", UserDataSchema);