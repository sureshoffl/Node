const { query } = require('express');
const db = require('../config/config');
const knex = require('knex');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { date } = require('joi');
const router = require('../routes/route');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
var nodemailer = require('nodemailer');
const { log } = require('console');

// const upload = multer({storage:storage})
// const storage = multer.memoryStorage();


//Login

module.exports.login = async(props) => {
   
    
    try {
        const { email, password} = props
        //const hashpassword = bcrypt.compare(password, password)
        const response = await knex('users').select('username','email','password').where('email', email).first();
        // db.raw('SELECT * FROM users where username = ? and password = ?',[username, password])
        var orginalPassword = response.password;
        const hashpassword = await bcrypt.compare(password, orginalPassword)
        if(hashpassword) {
            return true;
        } else {
            return null;
        }
        
    }
    catch(error) {
        console.log('Error Occured', error);
    }
    return null
}


//adduser  --- RAW QUERY ---

// module.exports.adduser =  async(props) => {
    
//     try {
//         const { username, email, address ,hashpassword } = props
//         //console.log(hashpassword);
//         const result = await db.raw('INSERT INTO users(username, email, password, address) VALUES (?, ?, ?, ?)',[username, email, hashpassword, address])
//         return !_.isEmpty(result[0] ? result[0] : null)
//     } catch (error) {
//         console.log('Error Occured',error);        
//     }

// } 



//adduser 
module.exports.adduser = async(props) => {
    
    try {
        const { username, email, address, password } = props

        const hashpassword = bcrypt.hashSync(password, 10);
        
        const result =  await db('users').insert({username, email, address, password:hashpassword})
        console.log(result);
        // return !_.isEmpty(result[0] ? result[0] : null)
        

        return result
    } catch (error) {
       console.log(error); 
    }
    return null

}




//Create Operation  --- RAW QUERY ---

// module.exports.createProduct = async(props) => {
//     const {productName, productType, productPrice} = props
//     try {
//         const response = await db.raw('INSERT INTO product(productName, productType, productPrice) VALUES (?, ?, ?)', [productName, productType, productPrice])
//         return !_.isEmpty(response[0] ? response[0] : null);
//     }
//     catch(error) {
//         console.log('Error Occured',error);
//     }
// }


//Create Operation

module.exports.createProduct = async(props) => {
    const {productName, productType, productPrice} = props
    try {
        const response = await db('product').insert({productName, productType, productPrice})
        return !_.isEmpty(response[0] ? response[0] : null);
    }
    catch(error) {
        console.log('Error Occured',error);
    }
}
 
//Read Operation

module.exports.readProduct = async() => {
    try {
        const read = await db('product').select('*')
       
        return !_.isEmpty(read) ? read : null
    } catch (error) {
        console.log(error);
    }
    
}

//Update Operation --- RAW QUERY ---

// module.exports.updateProduct =  async (props) => {
//     const { productPrice, id } = props
//     try {
//         const update = await db.raw('UPDATE product SET productPrice = ? where id = ?',[productPrice, id])
//         console.log("update",update)
//         return !_.isEmpty(update[0] ? update[0] : null)
//     } catch (error) {
//         console.log(error);
//     }
// }



//Update Operation

module.exports.updateProduct =  async (props) => {
    const {productName, productType, productPrice, id } = props
    try {
        const update = await db('product').where({id}).update({productName, productType, productPrice})
        console.log("update",update)
        return !_.isEmpty(update ? update : null)
    } catch (error) {
        console.log(error);
    }
}

//Delete Operation  --- RAW QUERY ---

// module.exports.removeproduct =  async (props) => {
//     const { productName } = props

//     try {
//         const remove =  await db.raw('DELETE FROM product WHERE productName = ?', [productName])
//         console.log("remove..",remove)
//         return !_.isEmpty(remove[0] ? remove[0] : null)

//     } catch (error) {
//         console.log(error);
//     }
//     return null
// }



//Delete Operation

module.exports.removeproduct =  async (props) => {
    const { id } = props

    try {
        const remove =  await db('product').where({id}).delete()
        console.log("remove..",remove)
        return !_.isEmpty(remove[0] ? remove[0] : null)

    } catch (error) {
        console.log(error);
    }
    return null
}

module.exports.checkUser = async (email) => {
    try {
        //console.log(email);
        const result = await db('users').select('*').where('email', '=', email).first();
        // console.log(result);
        if(result) {
            return true;
        } else {
            return null;
        }
    } catch (error) {
        
    }
}

//File Upload

module.exports.fileupload = async(images) => {

    try {

        console.log("images",images);
        
         const fileinsert = await db('file').insert({name:images})
         if(fileinsert) {
            return true;
         } else {
            return null;
         }

    } catch (error) {
        console.log(error);
    }
    return null;
}


//File View

module.exports.fileview = async (files) => {
    // const fileview = await db('files').select('name')
    const response = await global.db('files').select("*",global.db.raw(`CONCAT('http://localhost:8000/', image) as imageurl`))
    return !_.isEmpty(fileview) ? fileview : null
    // return fileview
}


//Nodemailer for Sending Mail
// module.exports.sendingmail = async (props) => {
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'ssureshoffl@gmail.com',
//           pass: 'kpbf yzuz hiyy kole'
//         }
//       });
      
//       const { to, subject, text, path} = props
//       var mailOptions = {
//         from: 'ssureshoffl@gmail.com',
//         to: to,
//         subject: subject,
//         text: text
//       };
      
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//    }


//Queries
//innerjoin
module.exports.innerjoin = async(data) => {
try {
    const read =  await db('employee').select('employee.employeeName', 'employee.salary').innerJoin('employeeinfo', 'employee.employeeid','=', 'employeeinfo.employeeid')
    console.table(read);
    return !_.isEmpty(read) ? read : null;

} catch (error) {
    console.log(error);
}
return null
}

//left join
module.exports.leftjoin = async () => {
    try {
        const read  = await db('employee').select('*').leftJoin('employeeinfo', 'employee.employeeid', '=', 'employeeinfo.employeeid')
        console.log(read);
        return !_.isEmpty(read) ? read : null
    } catch (error) {
        console.log(error);
    }
}


// Employee Salary

module.exports.salary = async (data) => {
    try {
        const salary = await db('employee').select('employeeName', 'salary').where('employee.salary', '>=', 60000);
        return !_.isEmpty(salary) ? salary : null;
    } catch (error) {
        console.log(error);
    }
}


//Show Employee Details

module.exports.employee = async (data) => {
    try {
        const { employeeName } = data
        const showemployee = await db('employee').select('*').where('employeeName', "=", employeeName)
        console.log(showemployee);
        return showemployee
      
    } catch (error) {
        console.log(error);
    }
}

module.exports.info = async(data) => {
    try {
        const { employeeid } = data
        const info = await db('employeeinfo').select('*').where('employeeid', '=', employeeid)
        console.log(info);
        return info    
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports.rightjoin = async() => {
    try {
        const result = db('employee').select('*').rightJoin('employeeinfo', 'employee.employeeid', '=', 'employeeinfo.employeeid')
        if (!_.isEmpty(result)) {
            return !_.isEmpty(result) ? result : null            
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.fulljoin = async() => {
    try {
        const result = await db('employee').select('*').fullOuterJoin('employeeinfo', 'employee.employeeid', '=', 'employeeinfo.employeeid');
        console.log(result);
            return !_.isEmpty(result) ? result : null

    } catch (error) {
        console.log(error);
    }
}

module.exports.crossjoin = async () => {
    try {
        const result =  await db('employee').select('*').crossJoin('employeeinfo', 'employee.employeeid', '=', 'employeeinfo.employeeid');
        return !_.isEmpty(result) ? result : null;
    } catch (error) {
        console.log(error);
    }
}

module.exports.selfjoin = async() => {
    try {
        // const result = await db('employee').select('*').selfJoin('employeeinfo', 'employee.employeeid', '=', 'employeeinfo.employeeid');
       const result = await db.raw('SELECT * FROM employee e JOIN employeeinfo ei ON e.employeeid = ei.employeeid')
        return !_.isEmpty(result) ? result : null;
    } catch (error) {
        console.log(error);
    }
}

module.exports.min = async() => {
    try {
        const min = await db('employee').select('*').min('salary')
        return !_.isEmpty(min) ? min : null
    } catch (error) {
        console.log(error);       
    }
}

module.exports.max = async() => {
    try {
        const max = await db('employee').select('*').max('salary')
        return !_.isEmpty(max) ? max : null
    } catch (error) {
        console.log(error);
    }
}


module.exports.avg = async() => {
    try {
        const avg = await db('employee').select('*').avg('salary')
        return !_.isEmpty(avg) ? avg : null
    } catch (error) {
        console.log(error);
    }
}

module.exports.count = async() => {
    try {
        const avg = await db('employee').select('salary').count('salary')
        return !_.isEmpty(avg) ? avg : null
    } catch (error) {
        console.log(error);
    }
}

module.exports.offset = async() => {
    try {
        const offset = await db('employee').select('*').offset(3);
        const limit = await db('employee').select('*').limit(5)
        return !_.isEmpty(offset) ? offset : null;
    } catch (error) {
        console.log(error);
    }
}

module.exports.limit = async() => {
    try {
        const limit = await db('employee').select('*').limit(5)
        return !_.isEmpty(limit) ? limit : null;
    } catch (error) {
        console.log(error);
    }
}

module.exports.groupby = async() => {
    try {
        const groupby = await db('employee').select('EmployeeName', 'Age', 'Position', 'Salary').groupBy('salary');
        return !_.isEmpty(groupby) ? groupby : null;
    } catch (error) {
        console.log(error);
    }
}

module.exports.orderby = async() => {
    try {
        const groupby = await db('employee').select('EmployeeName', 'Age', 'Position', 'Salary').orderBy('Age');
        return !_.isEmpty(groupby) ? groupby : null;
    } catch (error) {
        console.log(error);
    }
}


module.exports.case = async() => {
    try {
        const casequery = await db.raw(`SELECT Salary, CASE WHEN salary > 60000 THEN 'High' WHEN salary < 60000 THEN 'Low' ELSE 'Basic' END AS SalaryType FROM employee`)
        return !_.isEmpty(casequery) ? casequery : null
    } catch (error) {
        console.log(error);
    }
}

module.exports.distinct = async() => {
    try {
        const distinctquery = await db('employee').select('*').distinct('age');
        return !_.isEmpty(distinctquery) ? distinctquery : null
    } catch (error) {
        console.log(error);
    }
}


module.exports.addemployee = async(props) => {
    try {
        const { employeeid, employeeName, age, email, mobileNo, city, state, position, salary } = props
        const result = await db('employee').insert({ employeeid, employeeName, age, email, mobileNo, city,  state, position, salary });
        return !_.isEmpty(result) ? result : null
    } catch (error) {
        console.log(error);
    }
}


module.exports.date =  async(props) => {
    try {
        const { created } = props
        const result = await db.raw(`SELECT * FROM employee WHERE created BETWEEN ? AND ?`,[ created ])
        console.log(created);
        return result = !_.isEmpty(result) ? result : null
    } catch (error) {
        console.log(error);
    }
}