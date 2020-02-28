//mysqlConfig.js
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    // 查询数据库
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    },
   findUserData: function (name) {
        let _sql = `select * from testTable where name="${name}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
         let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
         return allServices.query(_sql, obj)
     },
     //成功
     resultSuccessJson:(code=0,message="成功",data={})=>{
         return {
             code:code,
             data:data,
             message:message
         }
     },
     //失败
     resultErrorJson:(code=-1,message="失败",data={})=>{
         return{
            code:code,
            data:data,
            message:message
         }
     }

}

module.exports = allServices;