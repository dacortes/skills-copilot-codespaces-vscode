//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//Set up database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//Set up schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
const Comment = mongoose.model('Comment', commentSchema);

//Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Set up static files
app.use(express.static('public'));

//Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.send(comments);
        }
    });
}
);

app.post('/comments', (req, res) => {
    Comment.create(req.body, (err, newComment) => {
        if (err) {
            console.log(err);
        } else {
            res.send(newComment);
        }
    });
}
);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
}
);

//Set up Angular
app.get('/angular', (req, res) => {
    res.render('angular');
});

app.get('/angular/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.send(comments);
        }
    });
}
);
