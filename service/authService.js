const { query } = require('express');
const db = require('../config');
const knex = require('knex');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { date } = require('joi');
const router = require('../routes/route');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


// const upload = multer({storage:storage})
// const storage = multer.memoryStorage();


//Login

module.exports.login = async(props) => {
   
    
    try {
        const { email, password} = props
        //const hashpassword = bcrypt.compare(password, password)
        
        const response = await db('users').select('username','email','password').where('email', email).first();
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
        

        return !_.isNull(result) ? true : null;
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


