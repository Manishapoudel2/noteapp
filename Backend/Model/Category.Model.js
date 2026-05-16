
const DB = require('../Config/DB');

class CategoryModel {

 static async findAll() {
    const [rows] = await DB.query(
        `SELECT Id as id, Name as name, created_at FROM categories`
    );

    return rows;
}

  static async findById(id) {
    const [rows] = await DB.query(
        `SELECT Id as id, Name as name, created_at FROM categories 
         WHERE Id = ?`, [id]
    );

    return rows;
}

    static async create(name) {
        const [result] = await DB.query(
            `INSERT INTO categories (name) VALUES (?)`,[name]
        );
        return result
    }

    static async update(id, name) {
        const [result] = await DB.query(
            `UPDATE categories SET name = ? WHERE id = ?`,[name, id]
        );

        return result;
    }

    static async delete(id) {
        const [result] = await DB.query(
            `DELETE FROM categories WHERE id = ?`, [id]);

        return result;
    }
}

module.exports = CategoryModel;