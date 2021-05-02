const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddatabase'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = `INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)`
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    })
})

app.get('/api/data', (req, res) => {
    const sqlInsert = `SELECT * from movie_reviews;`
    db.query(sqlInsert, (err, result) => {
        // console.log(result)
        res.send(result)
    })
})

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDelete = `DELETE from movie_reviews WHERE movieName = ?;`
    db.query(sqlDelete, name, (err, result) => {
        // console.log(result)
        if(err) { console.log(err)}
    })
})

app.put('/api/update/', (req, res) => {
    const name = req.body.movieName
    const review = req.body.movieReview
    const sqlUpdate = `UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;`
    db.query(sqlUpdate, [review, name], (err, result) => {
        // console.log(result)
        if(err) { console.log(err)}
        if(result) { console.log(result)}
    })
})

app.listen(3001, () => {
    console.log('listening on port 3001')
})