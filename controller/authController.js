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
const env = require('dotenv');
const logger = require('../config/logger');
const { error } = require("winston");
const { response } = require("express");




// < --- Login --- >

module.exports.login = async (req, res) => {
  try {
    const loginSchema = Joi.object({
      //username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).max(14).required(),
    });

    const { error } = loginSchema.validate(req.body);

    if(error){
      return res.send({
        status : false,
        message: error.message,
      });
    }

      
      const response = await authService.login(req.body);

      if (!_.isNull(response)) {
       
        return res.send({
          status: true,
          message: "Login Success",
          response
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
    
    const result = await authService.adduser(req.body);
    console.log("result", result);

    // console.log(hashpassword);
    if (result) {
      return res.send({
        status: true,
        message: "User Added Successfully",
        response : result,
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
    res.status(200)
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
    const inner = await authService.innerjoin()
      const verifytoken = (req, res, next) => {
        const token = req.body.token || req.body.token || req.headers["e-access-token"];
        const verifytoken =jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifytoken);
        req.isUserExist = decoded
      }
   

    if(!_.isEmpty(read) && !_.isEmpty(inner) ){
       return res.send({
        status: true,
        message: "Success!",
        leftJoin: read,
        inner : inner
       })
    }
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
    res.status(200)
    return res.send({
      status : true,
      values : salary
    })
  } catch (error) {
    console.log(error);
  }
 }


 module.exports.employee = async (req, res) => {
  try {
    const employee = await authService.employee(req.body)
    console.log(employee);
    res.status(200)
    return res.send({
      status : true,
      values : employee
    })
  } catch (error) {
    console.log(error);
  }

  
 }

 module.exports.info = async (req, res) => {
  try {
    const info = await authService.info(req.body)
    return res.send({
      status : true,
      value : info
    })
  } catch (error) {
    logger.error(error)
  }
  

}


module.exports.rightjoin = async (req, res) => {
  try {
    const result = await authService.rightjoin()
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        Response : result
      })
    } 
  } catch (error) {
   logger(error)
  }
}

module.exports.fulljoin = async (req, res) => {
  try {
    const result = await authService.fulljoin()
    if(!_.isEmpty(result)) {
     return res.send({
        status : true,
        message : 'Success',
        Response : result
      })
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports.crossjoin = async (req, res) => {
  try {
    const result = await authService.crossjoin()
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : result
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.selfjoin = async (req, res) => {
  try {
    const result = await authService.selfjoin()
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : result
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.min = async (req, res) => {
  try {
    const min = await authService.min()
    if (!_.isEmpty(min)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : min
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}

module.exports.max = async (req, res) => {
  try {
    const max = await authService.max()
    if (!_.isEmpty(max)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : max
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}

module.exports.avg = async (req, res) => {
  try {
    const avg = await authService.avg()
    if (!_.isEmpty(avg)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : avg
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}



module.exports.queries = async (req, res) => {
  try {
    const min = await authService.min()
    const max = await authService.max() 
    const avg = await authService.avg()
    const count = await authService.count()
    const offset = await authService.offset()
    const limit = await authService.limit()
    const groupby = await authService.groupby()
    const orderby = await authService.orderby()
    const distinctquery = await authService.distinct()

      return res.send({
        status : true,
        Message : 'Success',
        minResponse : min,
        maxResponse : max,
        avgResponse : avg,
        countResponse : count,
        offsetResponse : offset,
        limitResonse : limit,
        groupbyResponse  : groupby,
        orderbyResponse : orderby,
        distinctResponse : distinctquery   
      })
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.case = async (req, res) => {
  try {
    const result = await authService.case()
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        Message : 'Success',
        Response : result
      })
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.addemployee =  async (req, res) => {
  try {
    const result = await authService.addemployee(req.body)
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : "Success",
        Response : result
      })
    }
  } catch (error) {
    console.log(error);   
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.date = async (req, res) => {
  try {
    const result = await authService.date(req.body)
    console.log(result);
  if(!_.isEmpty(result)) {
    return res.send({
      status : true,
      message : 'Success',
      Response : result
    })
  }
  } catch (error) {
    console.log(error);   
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.rank = async(req, res) => {
  try {
    const result = await authService.rank()
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
    
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}

module.exports.denserank = async(req, res) => {
  try {
    const result = await authService.denserank()
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  return res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.highestsalary = async(req, res) => {
  try {
    const result = await authService.highestsalary()
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}

module.exports.query1 = async(req, res) => {
  try {
    const result = await authService.query1(req.body)
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.query2 = async(req, res) => {
  try {
    const result = await authService.query2(req.body)
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.query3 = async(req, res) => {
  try {
    const result = await authService.query3(req.body)
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.query4 = async(req, res) => {
  try {
    const result = await authService.query4(req.body)
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}

module.exports.duplicate = async(req, res) => {
  try {
    const result = await authService.duplicate(req.body)
    console.log(result);
    if (!_.isEmpty(result)) {
      return res.send({
        status : true,
        message : 'Success',
        response : result
      })  
    }
  } catch (error) {
    console.log(error);
  }
  res.send({
    status : false,
    message : 'Failed'
  })
}


module.exports.signin = async(req, res) => {
  try {

      const loginSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(3).max(14).required(),
        });
    
        const { error } = loginSchema.validate(req.body);
    
        if(error){
          return res.send({
            status : false,
            message: error.message,
          });
        }
    
      const result = await authService.signin(req.body)
      if (!_.isEmpty(result)) {
          return res.send({
              status : true,
              message : "Success",
              result
          })
      }
  } catch (error) {
      console.log(error);
  }
  return res.send({
      logger
  })
}
// module.exports.refreshToken = async(req, res) => {
// try {
//   const result = await authService.refreshToken()
//   if(!_.isEmpty(result)) {
//     return res.send({
//       result
//     })
//   }
// } catch (error) {
//   console.log(error);
// }
// return res.send({
//     message : 'failed'
// })
// }