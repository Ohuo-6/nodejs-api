const jwt = require('jsonwebtoken');
// 读取配置项
const {secret} = require('../config/config')
module.exports =  (req, res, next) => {
    // 获取 请求头token
    let token = req.get('token');
    // 判断
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token 缺失',
            data: null
        })
    }
    // token 校验
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            return res.json({
                code: '2003',
                msg: 'token 校验失败~~',
                data: null
            })
        }
        // 保存用户信息
        req.user = data;
        // 校验成功
        next();
    })
}