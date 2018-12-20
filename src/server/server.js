const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const md5 = require('MD5')
var jwt = require('jwt-simple');
const moment = require('moment')
const users = require('./user.json')
const user = users[0]
app.set('jwtTokenSecret', user.pw);
// 创建 application/json 解析
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// var jwt = require('jwt-simple');
// //设置密钥
// app.set('jwtTokenSecret', 'YOUR_SCRET_STRING');

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true })

const Product = mongoose.model('Product', new mongoose.Schema({
    title: String,
}))


app.use(express.static('public'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login', urlencodedParser, (req, res) => {
        if (!req.body) return res.sendStatus(400)
        if (md5(req.body.password) === user.pw && req.body.userName === user.name) {
            var expires = moment().add('days', 1).valueOf()
            var token = jwt.encode({
                iss: user.id,
                exp: expires,
            }, app.get('jwtTokenSecret'))
            res.send({
                token: token,
                success: true
            })
        } else {
            res.send({
                token: '',
                success: false
            })
        }
        console.log(req.body)
    })
    // app.get('/get_info', urlencodedParser, (req, res) => {
    //     if (!req.body) return res.sendStatus(400)
    //     if (req.body.token === 'TokenTest') {
    //         res.send({

//         })
//     }
//     console.log(req.body)
// })

app.get('/', (req, res) => {
    res.send({
        page: 'homePage'
    })
})
app.get('/about', (req, res) => {
    res.send({
        page: 'About page'
    })
})
app.get('/products', async(req, res) => {
    res.send(await Product.find())
})

app.listen(3000, () => {
    console.log('App is listening port 3000')
})