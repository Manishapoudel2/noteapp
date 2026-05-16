
const express = require('express');
const NoteController = require('../Controller/Note.Controller');
const router = express.Router();
router.get('/', NoteController.getNotes);
router.get('/user/:id', NoteController.getNotesByUserId);
router.get('/:id', NoteController.getNoteById);
router.post('/', NoteController.createNote);
router.put('/:id', NoteController.updateNote);
router.delete('/:id', NoteController.deleteNote);

module.exports = router;