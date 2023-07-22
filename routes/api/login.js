var express = require('express');
var router = express.Router();
const UserModel = require('../../modules/userModule');
// 导入 md5
const md5 = require('md5');
// 使用 JWT  npm i jsonwebtoken
const jwt = require('jsonwebtoken');

// 注册
// 注册提交api
router.post('/reg', function (req, res) {
    // 获取请求体数据
    // console.log(req.body);
    UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
        if (err) {
            res.status(500).send('注册失败，请稍后再试~~');
            return;
        }
    })
    // 响应成功的提示
    res.json({
        code: '200',
        msg: '注册成功',
        data: {}
    })
})

//登录api
router.post('/login', (req, res) => {
    // 获取请求体的用户名和密码
    let { username, password } = req.body
    UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.json({
                code: '400',
                msg: '登录失败'
            })
            return;
        }
        if (!data) {
            return res.json({
                code: '2002',
                msg: '用户名或密码错误~~',
                data: null
            })
        }

        //创建 token
        let token = jwt.sign({
            username: data.username,
            _id: data._id    //data._id 为mongoose文档的id
        }, 'ApiLogin', {
            expiresIn: 60 * 60 * 24 * 7  //一周过期时间,  单位秒
        })
        res.json({
            code: '200',
            token: token,
            msg: '登录成功',
            data: {}
        })

        // 写入session  (要在app.js导入session中间件 )   npm i express-session connect-mongo
        // console.log(req.session);
        req.session.username = data.username;
        req.session._id = data._id; //data._id 为mongoose文档自动携带的id
        // res.render('success', { msg: '登陆成功', url: '/account' })

    })

});

module.exports = router;
