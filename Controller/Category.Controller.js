
const CategoryModel = require('../Model/Category.Model');


exports.getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const result = await CategoryModel.create(name);
        res.status(201).json({
            message: "Category created",
            data: result
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        const result = await CategoryModel.update(id, name);
        res.json({
            message: "Category updated",
            data: result
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await CategoryModel.delete(id);
        res.json({
            message: "Category deleted"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};