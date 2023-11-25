const { query } = require('express');
const db = require('../config');
const knex = require('knex');
const _ = require('lodash');
const bcrypt = require('bcrypt');



//Login

module.exports.login = async(props) => {
    
    const {username, email, password } = props
    
    try {
        const response = await db('users').select('username','email','password').andWhere({username}).andWhere({email}).andWhere({password})
        // db.raw('SELECT * FROM users where username = ? and password = ?',[username, password])
        console.log("response..",response)
        return !_.isEmpty(response[0] ? response[0] : null);
    }
    catch(error) {
        console.log('Error Occured', error);
    }
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
        const { username, email, address, hashpassword } = props
        const result =  await db('users').insert({username, email, password:hashpassword, address  })
        return !_.isEmpty(result[0] ? result[0] : null)
    } catch (error) {
       console.log(error); 
    }
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
    const { productPrice, id } = props
    try {
        const update = await db('product').where({id}).update({productPrice})
        console.log("update",update)
        return !_.isEmpty(update[0] ? update[0] : null)
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
    const { productName } = props

    try {
        const remove =  await db('product').where({productName}).delete()
        console.log("remove..",remove)
        return !_.isEmpty(remove[0] ? remove[0] : null)

    } catch (error) {
        console.log(error);
    }
    return null
}