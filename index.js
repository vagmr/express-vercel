const EXPRESS = require('express')
const app = EXPRESS()
const cors = require('cors');

const listStoryR = require("./router/listStory")
const forumList = require("./router/forumList")
const novelView = require("./router/novelView")
const novelDetail = require("./router/novelDetail")
const userInfo = require("./router/userInfo")
const image = require("./router/image")
const Login = require("./router/login")
const blog = require("./router/blog");
const Saying = require("./router/Saying")
const wordList = require("./router/loveWords")


//中间件配置
//适应Post请求
app.use(EXPRESS.json())
//适应get请求
app.use(EXPRESS.urlencoded({ extended: false }))
app.use(cors())
//静态文件托管
app.use('/static', EXPRESS.static("static"))

//路由中间件
app.use("/", listStoryR)
app.use("/", forumList)
app.use("/", novelView)
app.use("/", userInfo)
app.use("/", novelDetail)
app.use("/", image)
app.use("/", Login)
app.use("/", blog)
app.use("/", Saying)
app.use("/", wordList)

app.get("/", (req, res) => {

    res.sendFile(__dirname + '/index.html')
})

app.listen(3001, () => {
    // mongo.connect(`mongodb+srv://vagmr:vagmr@atlascluster.hbgdlkf.mongodb.net/`);

})