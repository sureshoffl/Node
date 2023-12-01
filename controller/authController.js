const authService = require("../service/authService");
const _ = require("lodash");
const validator = require("validator");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const multer = require('multer')
const lodash = require('lodash');
const nodemailer = require('nodemailer');
const mailservice = require('../config/mailservice');
const jwt =  require('jsonwebtoken');
const env = require('dotenv')




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
      
      // console.log(process.env.JWT_SECRET_KEY);
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

      const token = jwt.sign({
        response
       }, 
       process.env.JWT_SECRET_KEY,
       {
         expiresIn :'1m'
       }
       )
       jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, docs) {
        console.log(err);
        console.log(docs);
       })

      if (!_.isNull(response)) {
       
       
         console.table({email,token}) 
        return res.send({
          status: true,
          message: "Login Success",
          token : token
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


//File Upload

module.exports.fileupload = async (req, res) => {
 try {
  console.log(req.file.path);
  
  const fileinsert = await authService.fileupload(req.file.path);
  console.log(fileinsert);
  if (!_.isNull(fileinsert)) {
    return res.send({
      status : true,
      message : 'File Upload Successfully'
    })
  } else {
    return res.send({
      status : false,
      message : 'File Upload Failed'
    })
  }
 } catch (error) {
  console.log('File Upload Failed');
  res.send({
    status : false,
    message : 'File upload failed'
  })
 } 
 return null;
}


module.exports.fileview = async (req, res) => {

  const image = await authService.fileview();
  console.log(image);
  return res.send(image)
}


module.exports.sendingmail = async (req, res) => {
  try {
    const mail = await mailservice.sendingmail(req.body)
    console.log(req.body.to);
    res.send({
      status : true,
      message : 'Mail Sent Successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message : 'OK'
    })
    return res.send({
      status : false,
      message : 'Mail sent Failed'   
    })
  }
}


module.exports.innerjoin = async (req, res) => {
  try {
     const read = await authService.innerjoin()
  if(!_.isEmpty(read))
  {
    return res.send({
      status : true,
      message : 'Data Received',
      Data : read
    })
  }
  else {
    return res.send({
      status : false,
      message : 'Data Received Failed'
    })
  }

  } catch (error) {
    console.log(error);    
  }
 }


 module.exports.leftjoin = async (req, res) => {
  try {
    const read = await authService.leftjoin()
    return res.send({
      status : true,
      message : 'Query Executed',
      Result : read
    })
  } catch (error) {
    console.log(error);
  }  
  return res.send({
    status : false, 
    message : 'Query Executed Failed'
  })
 }


 //EmployeeSalary

 module.exports.salary =  async (req, res) => {
  try {
    const salary = await authService.salary()
    return res.send({
      status : true,
      values : salary
    })
  } catch (error) {
    
  }
 }