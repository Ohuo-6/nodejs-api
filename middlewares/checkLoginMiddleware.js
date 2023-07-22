// 声明中间件检测登录
module.exports = (req, res, next) => {
    // 判断
    if (!req.session.username) {
        return res.redirect('/login');
    }
    next();
}