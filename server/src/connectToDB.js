const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/alena-site', function (err) {
    if (err) throw err;
});

let authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

const jamieAuthor = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: 'Jamie',
        lastName: 'Munro'
    },
    biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
    twitter: 'https://twitter.com/endyourif',
    facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
});

jamieAuthor.save(function(err) {
    if (err) throw err;

    console.log('Author successfully saved.');

    const mvcBook = new Book({
        _id: new mongoose.Types.ObjectId(),
            title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
            author: jamieAuthor._id,
            ratings:[{
            summary: 'Great read'
        }]
    });

    mvcBook.save(function(err) {
        if (err) throw err;

        console.log('Book successfully saved.');
    });

    const knockoutBook = new Book({
        _id: new mongoose.Types.ObjectId(),
            title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
            author: jamieAuthor._id
    });

    knockoutBook.save(function(err) {
        if (err) throw err;

        console.log('Book successfully saved.');
    });
});