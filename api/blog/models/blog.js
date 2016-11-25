'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['mongoose', 'crypto', 'uuid'], function (mongoose, crypto, uuid) {

  var Schema = mongoose.Schema;

  var PostSchema = new Schema({
    _id: String,
    title: {type: String},
    text: {type: String}
  });


  // /**
  //  * Validations
  //  */
  //
  // var validatePresenceOf = function (value) {
  //   return value && value.length;
  // };
  //
  // UserSchema.path('email').validate(function (email) {
  //   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  //   return emailRegex.test(email);
  // }, 'The specified email is invalid.');
  //
  // UserSchema.path('email').validate(function (value, respond) {
  //   mongoose.models.User.findOne({
  //     email: value
  //   }, function (err, user) {
  //     if (err) {
  //       throw err;
  //     }
  //     if (user) {
  //       return respond(false);
  //     }
  //     respond(true);
  //   });
  // }, 'The specified email address is already in use.');
  //
  // UserSchema.path('username').validate(function (value, respond) {
  //   mongoose.models.User.findOne({
  //     username: value
  //   }, function (err, user) {
  //     if (err) {
  //       throw err;
  //     }
  //     if (user) {
  //       return respond(false);
  //     }
  //     respond(true);
  //   });
  // }, 'The specified username is already in use.');

  /**
   * Pre-save hook
   */

  PostSchema.pre('save', function (next) {
    if (this._id === undefined) {
      this._id = uuid.v1();
    }
    next();

  });

  /**
   * Methods
   */

  PostSchema.methods = {

    // /**
    //  * validatePassword - check if the passwords are the same
    //  */
    //
    // validatePassword: function (plainText) {
    //   return this.encryptPassword(plainText) === this.hashedPassword;
    // }

  };

  return mongoose.model('Post', PostSchema);

});
