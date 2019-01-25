const constant   = require(__basePath + '/app/config/constant');
const database   = require(constant.path.app + 'core/database');
const utility    = require(constant.path.app + 'util/utility');
const underscore = require("underscore");

class UserModel {

    constructor() {
        this.databaseObj = database.getInstance();
    }

    static get DB() {
        return {
            READSLAVE: 'READSLAVE',
            MASTER   : 'MASTER'
        };
    }

    createUser(name, email, password, callback) {
        let userData = {
            userId   : utility.uuid(),
            name     : name,
            email    : email,
            password : utility.md5(password)
        };

        let query = `
            INSERT INTO 
                user (
                    userId,
                    name,
                    email,
                    password                    
                ) 
            VALUES (
                :userId,
                :name,
                :email,
                :password
            ) 
        `;

        this.databaseObj.query(
            UserModel.DB.MASTER,
            {
                sql   : query,
                values: userData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };

    updateUserPassword(email, password, callback) {
        let userData = {
            email  : email,
            password : utility.md5(password),
            currentData : new Date()
        };

        let query = `
            UPDATE 
                user 
            SET 
                password = :password,
                createdAt = :currentData
            WHERE (
                email = :email
            ) 
        `;

        this.databaseObj.query(
            UserModel.DB.MASTER,
            {
                sql   : query,
                values: userData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };


    getEmailInfo(email, callback) {

        let query = `
            SELECT
                userId,
                name,
                email,
                password
            FROM 
                user
            WHERE
                email = ?
        `;

        this.databaseObj.query(
            UserModel.DB.READSLAVE,
            {
                sql   : query,
                values: [email]
            },
            callback
        );
    };

    loginCheck(email, password, callback) {
        password = utility.md5(password);

        let query = `
            SELECT
                userId,
                name,
                email
            FROM 
                user
            WHERE
                email = '${email}'
            AND
                password = '${password}'
        `;

        this.databaseObj.query(
            UserModel.DB.READSLAVE,
            {
                sql   : query
            },
            callback
        );
    };

}

module.exports = UserModel;
