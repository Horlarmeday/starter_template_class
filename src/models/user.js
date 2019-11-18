/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import config from '../config/secret';

class User {
  initSchema() {
    const schema = new Schema(
      {
        firstname: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },

        lastname: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },

        email: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
          unique: true,
          lowercase: true,
        },

        password: {
          type: String,
          required: true,
          min: 5,
          max: 255,
        },
      },
      { timestamps: true }
    );

    schema.methods.generateAuthToken = function() {
      const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.jwtToken);
      return token;
    };

    mongoose.model('User', schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('User');
  }
}

// function to validate
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };
  return Joi.validate(user, schema);
}

exports.validate = validateUser;
export default User;
