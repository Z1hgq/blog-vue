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


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true })
let db = mongoose.connection;
const BlogCls = mongoose.model('BlogCls', new mongoose.Schema({
    name: String,
    avatar: String,
    createTime: String,
    updateTime: String,
}))

app.use(express.static('public'))
    //解决跨域问题
app.use(require('cors')())
    //获取上传参数内容
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 单图上传
app.post('/upload_img', upload.single('logo'), function(req, res, next) {
    var file = req.file;
    var path = file.path;
    if (req.ip.indexOf('127.0.0.1')) {
        path = path.replace('..', '')
    } else {
        path = path.replace('../dist', '')
        path = 'http://www.cnarthub.com' + path;
    }
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
app.post('/addBlogCla', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400)
    } else {
        var whereStr = { name: req.body.name }; // 查询条件
        BlogCls.find(whereStr, (err, ress) => {
            console.log(ress.length)
            if (ress.length !== 0) {
                res.send({
                    success: '0',
                    message: '请勿添加已有的分类'
                })
            } else {
                BlogCls.insertMany(req.body, (errr, resss) => {
                    if (errr) {
                        res.send({
                            success: '0',
                            message: '添加失败'
                        })
                    } else {
                        res.send({
                            success: '1',
                            message: '添加成功'
                        })
                        console.log("分类添加成功");
                    }
                })
            }
        })
    }
})
app.get('/test', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400)
    } else {
        if (req.ip.indexOf('127.0.0.1'))
            console.log(req.ip)
        else
            console.log('not match')
    }
})
app.get('/getCls', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400)
    } else {
        BlogCls.find({}, (err, ress) => {
            if (err) {
                res.send({
                    success: '0',
                    message: '分类信息获取失败'
                })
            } else {
                res.send({
                    success: '1',
                    message: '分类信息获取成功',
                    data: ress,
                })
            }
        })
    }
})

app.listen(3000, () => {
    console.log('App is listening port 3000')
})