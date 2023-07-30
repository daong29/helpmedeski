const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors  = require('cors')
const { CLIENT_MULTI_RESULTS, CLIENT_MULTI_STATEMENTS } = require('mysql/lib/protocol/constants/client');

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'helpdesk'
})
dbCon.connect();

//show ticket
app.get('/ticket', (req, res) =>{
    dbCon.query('SELECT * FROM ticket', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send(results); 
        }
    });      
})
//add
app.post('/ticket', (req, res) =>{
    let name =req.body.name;
    let description = req.body.description
    let contact = req.body.contact
    let information = req.body.information

    if (!name || !description ||!contact || !information){
        return res.status(400).send({ error: true});
    } else {
        dbCon.query('INSERT INTO ticket (name, description, contact, information) VALUES(?, ?, ?, ?)', [name, description, contact, information], (error, results) => {
            if (error) throw error;
            return res.send({ error: false, data: results})
        })
    }
})

app.get('/signup', (req, res) =>{
    dbCon.query('SELECT * FROM signup', (error, results) => {
        if (error) {
            console.log(error)
        } else {
            res.send(results); 
        }
    });      
}) 

//signup
app.post('/signup', (req, res) => {
    let user = req.body.user;
    let email = req.body.email
    let password = req.body.password

    if (!user || !email ||!password){
        return res.status(200).send({ error: true});
    } else {
        dbCon.query('INSERT INTO signup (user, email, password) VALUES(?, ?, ?)', [user, email, password], (error, results) => {
            if (error) throw error;
            return res.send({ error: false, data: results})
        })
    }
})
//retrieved
app.get('/ticket/:id', (req, res) =>{
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide ticket id"});
    } else {
        dbCon.query("SELECT * FROM ticket WHERE id = ?", id, (error, results, fields) =>{
            if (error) throw error;

            let message="";
            if (results === undefined || results.legth ==0) {
                message = "ticket not found";
            } else {
                message = "Success retrieved ticket data";
            }

            return res.send({ error: false, data: results[0], message: message})
        })
    }
})

app.put('/ticket', (req, res) => {
    let id =req.body.id;
    let name = req.body.name;
    let description = req.body.description;
    let contact =req.body.contact;
    let information =req.body.information;

    if (!id ||!name ||!description ||!contact ||!information){
        return res.status(400).send({ error: true});  
    } else {
        dbCon.query('UPDATE ticket SET name = ?, description = ?, contact = ?, information = ? WHERE id = ?', [name, description, contact, information, id], (error, results, fields) =>{
            if (error) throw error;

            if (results.changedRows === 0) {
                message = "ticket not found or data are same";
            } else {
                message = "ticket success updata";
            }

            return res.send({ error: false, data: results, message: message})
        })
    }
})
app.listen(5000, () =>{
    console.log('node App is running on port 5000')
})
module.exports = app;