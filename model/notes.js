const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,

    
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

//contact

const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,

    
  },
  address: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Note = mongoose.model('Note', notesSchema);
const Contact = mongoose.model('Contact', contactsSchema);
module.exports = {Note,Contact};