
const NoteModel = require('../Model/Note.Model');

exports.getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.findAll();
        res.json(notes);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getNotesByUserId = async (req, res) => {
        const id = req.params.id;
        const notes = await NoteModel.findByUserId(id);
        res.json(notes);
};

exports.getNoteById = async (req, res) => {
        const id = req.params.id;
        const note = await NoteModel.findById(id);
        res.json(note);
};

exports.createNote = async (req, res) => {
        const {user_id,category_id,title,description} = req.body;
        const result = await NoteModel.create( user_id,category_id,title,description
        );


};

exports.updateNote = async (req, res) => {
        const id = req.params.id;
        const {
            category_id,
            title,
            description
        } = req.body;
        const result = await NoteModel.update(
            id,category_id, title,description);
};

exports.deleteNote = async (req, res) => {
        const id = req.params.id;
        const result = await NoteModel.delete(id);
        res.json({
            message: 'Note Deleted',
            result
        })
};