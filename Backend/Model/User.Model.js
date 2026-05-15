const DB = require('../Config/DB')
class UserModel {
    static async findAll() {
        const [data] = await DB.query(`SELECT * FROM users`)
        return data;
    }
    static async findById(user_id) {
        const [data] = await DB.query(
            `SELECT * FROM users WHERE user_id = ?`,
            [user_id]
        );
        return data[0];
    }
    static async create(firstname, lastname, email, address, password) {
        const [data] = await DB.query(`INSERT INTO users ( firstname , lastname , email,address , password) VALUES(?,?,?,?,?)`, [firstname, lastname, email, address, password])
        return data;
    }
    static async delete(user_id) {
        const [data] = await DB.query(`DELETE FROM users WHERE user_id = ${user_id}`, user_id);
        return data

    }
    static async findByEmail(email) {
        const [data] = await DB.query(`SELECT * FROM users WHERE email = ? `, [email])
        return data
    }


}
module.exports = UserModel;