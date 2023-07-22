// 导入mongoose
// 安装 @6 版本
const mongoose = require('mongoose')

// 创建数据库数据的属性及类型
let userSchema = new mongoose.Schema({
    username:String,
    password:String
})
// 创建模型对象
let UserModel = mongoose.model('users',userSchema);

//暴露
module.exports = UserModel;