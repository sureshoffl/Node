const authService = require("../service/authService");
const _ = require("lodash");
const validator = require("validator");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// < --- Login --- >

module.exports.login = async (req, res) => {
  try {
    const loginSchema = Joi.object({
      //username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(14).required(),
    });

    const { error } = loginSchema.validate(req.body);

    if (!error) {
      console.log("Login Success");
    } else {
      // console.log(error.message);
      return res.send({
        message: error.message,
      });
    }
    var email = req.body.email;
    const isUserExist = await authService.checkUser(email);
    if (!_.isNull(isUserExist)) {
      const response = await authService.login(req.body);
      if (!_.isNull(response)) {
        return res.send({
          status: true,
          message: "Login Success",
        });
      } else {
        return res.send({
          status: false,
          message: "Invalid Credentials",
        });
      }
    } else {
      return res.send({
        status: false,
        message: "User Not Found!",
      });
    }
  } catch (error) {
    console.log("error", error);
  }

  return res.send({
    status: false,
    message: "Invalid Credentials",
  });
};

// < --- Add User --- >

module.exports.adduser = async (req, res) => {
  try {
    //adduser Validation
    const addloginSchema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      address: Joi.string().optional(),
    });

    const { error } = addloginSchema.validate(req.body);

    if (error) {
      return res.send({
        status: false,
        message: error.message,
      });
    }

    //bcrpyt (hashing password)

    // const hashpassword = bcrypt.hashSync(req.body.password, 10);

    const result = await authService.adduser(req.body);
    console.log("result", result);

    // console.log(hashpassword);
    if (result) {
      return res.send({
        status: true,
        message: "User Added Successfully",
      });
    } else {
      return res.send({
        status: false,
        message: "Faild to add user",
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "Please Enter Properly",
    });
  }
};

// < ----- CRUD OPERATION ----- >

module.exports.createProduct = async (req, res) => {
  try {
    const response = await authService.createProduct(req.body);
    if (response.length != 0) {
      return res.send({
        status: true,
        message: "Inserted Successfully",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
  return res.send({
    status: "false",
    message: "does not inserted",
  });
};

module.exports.readProduct = async (req, res) => {
  try {
    const read = await authService.readProduct();
    if (!_.isEmpty(read)) {
      return res.send({ status: true, message: "success", response: read });
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    message: "failed",
    response: [],
  });
};

module.exports.updateProduct = async (req, res) => {
  try {
    const update = await authService.updateProduct(req.body);
    if (update.length != 0) {
      return res.send({
        status: true,
        message: "Updated Successfully",
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: "false",
    message: "does not updated",
  });
};

module.exports.removeproduct = async (req, res) => {
  try {
    const remove = await authService.removeproduct(req.body);
    if (remove.length != 0) {
      return res.send({
        statud: true,
        message: "Deleted Successfully",
      });
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status: false,
    message: "could not deleted",
  });
};
