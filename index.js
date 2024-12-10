const express = require('express');

const fs = require('fs')

const app = express();

const path = require('path');
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// routers 

app.get("/", (req, res) => {
    fs.readdir('./files', function (err, files) {
        if (err) {
            console.log(err);
            return res.status(500).send("Server error");
        }
        const filenames = files.map(file => file.replace('.txt', ''));
        res.render('index', { files: filenames });
    });
});;

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, () => {
        res.redirect('/')

    })
})
app.get("/files/:name", (req, res) => {

    const fileName = req.params.name + '.txt';
    const filePath = path.join(__dirname, 'files', `${fileName}`);
    const ubdatedfilename = fileName.replace('.txt', '')

    fs.readFile(filePath, 'utf-8', (err, data) => {
        res.render('show', { file: ubdatedfilename, content: data });
    })


    })

    app.get("/removefile/:name", (req, res) => {
        const removenotename = req.params.name + '.txt'
        const delfilepath = path.join(__dirname, 'files', `${removenotename}`);
        fs.unlink(delfilepath, (err) => {
            if (!err)  res.redirect('/')
        })
    })
    
app.listen(3000)
