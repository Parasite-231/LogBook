const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {Note,Contact} = require('./model/notes');


// express app
const app = express();

// connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://ninad:123@notes.1qbyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const dbURI = "mongodb+srv://muktadir:123@notes.8gbkp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/mynotes');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.get('/mycontacts', (req, res) => {
  res.render('mycontacts', { title: 'Contact List' });
});


//contact routes

app.get('/addcontact', (req, res) => {
  res.render('addcontact', { title: 'Add Contact' });
});


app.get('/mycontacts', (req, res) => {
  Contact.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('mycontacts', { contacts: result, title: 'All Contact' });
    })
    .catch(err => {
      console.log(err);
    });
});
app.post('/mycontacts', (req, res) => {
  // console.log(req.body);
  const contact = new Contact(req.body);

  contact.save()
    .then(result => {
      res.redirect('/mycontacts');
    })
    .catch(err => {
      console.log(err);
    });
});



// app.get('/mycontacts/:id', (req, res) => {
//   const id = req.params.id;
//   Contact.findById(id)
//     .then(result => {
//       res.render('details', { note: result, title: 'Note Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });


// blog routes
app.get('/mynotes/makenotes', (req, res) => {
  res.render('makenotes', { title: 'Create a new Note' });
});

app.get('/mynotes', (req, res) => {
  Note.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('mynotes', { notes: result, title: 'All Notes' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/mynotes', (req, res) => {
  // console.log(req.body);
  const note = new Note(req.body);

  note.save()
    .then(result => {
      res.redirect('/mynotes');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/mynotes/:id', (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then(result => {
      res.render('details', { note: result, title: 'Note Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/mynotes/:id', (req, res) => {
  const id = req.params.id;
  
  Note.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/mynotes' });
    })
    .catch(err => {
      console.log(err);
    });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('errormessage', { title: '404' });
});