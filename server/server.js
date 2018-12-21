var fs = require('fs');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const md5 = require('MD5')
var jwt = require('jwt-simple');
const moment = require('moment')
var multer = require("multer")
var mkdirp = require('mkdirp');
const users = require('./user.json')
const user = users[0]
app.set('jwtTokenSecret', user.pw);

var uploadFolder = '../dist/upload/';


mkdirp(uploadFolder, function(err) {

    // path exists unless there was an error

})

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
    },
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

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

// 单图上传
app.post('/upload_img', upload.single('logo'), function(req, res, next) {
    var file = req.file;
    var path = file.path;
    path = path.replace('..', '')
    if (file) {
        res.send({ success: true, filePath: path });
    } else {
        res.send({ success: false })
    }

});
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

app.listen(3000, () => {
    console.log('App is listening port 3000')
})