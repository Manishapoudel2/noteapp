
const DB = require('../Config/DB');

class NoteModel {

    static async findAll() {

        const [notes] = await DB.query(`
           SELECT  * 
            FROM notees LEFT JOIN categories ON notees.category_id = categories.Id`);

        return notes;
    }

    static async findByUserId(user_id) {

        const [notes] = await DB.query(`
           SELECT  *  FROM notees LEFT JOIN categories ON notees.category_id = categories.Id WHERE notees.u_id = ?  `, [user_id]);
        return notes;
    }

    static async findById(id) {

        const [notes] = await DB.query(`
     SELECT  *  FROM notees LEFT JOIN categories ON notees.category_id = categories.Id WHERE notees.id = ?`, [id]);
        return notes;
    }

    static async create(user_id, category_id, title, description) {

        const [result] = await DB.query(`
            INSERT INTO notees (u_id, category_id, title, description) VALUES (?, ?, ?, ?)
        `, [user_id, category_id, title, description]);

        return result;
    }

    static async update(id, category_id, title, description) {

        const [result] = await DB.query(`
            UPDATE notees SET category_id = ?,
                title = ?,description = ? WHERE id = ?
        `, [category_id, title, description, id]);

        return result;
    }

    static async delete(id) {

        const [result] = await DB.query(
            `DELETE FROM notees WHERE id = ?`,[id]
        );

        return result;
    }

}

module.exports = NoteModel;