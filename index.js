const EXPRESS = require('express')
const app = EXPRESS()

const listStoryR = require("./router/listStory")
const listAnnR = require("./router/announcementList")
const forumList = require("./router/forumList")
const novelView = require("./router/novelView")
const novelDetail = require("./router/novelDetail")
const userInfo = require("./router/userInfo")
const image = require("./router/image")
const Login = require("./router/login")
const blog = require("./router/blog");

//中间件配置
//适应Post请求
app.use(EXPRESS.json())
//适应get请求
app.use(EXPRESS.urlencoded({ extended: false }))

//静态文件托管
// app.use('/static',EXPRESS.static("static"))

//路由中间件
app.use("/", listStoryR)
app.use("/", listAnnR)
app.use("/", forumList)
app.use("/", novelView)
app.use("/", userInfo)
app.use("/", novelDetail)
app.use("/", image)
app.use("/", Login)
app.use("/", blog);

app.get("/", (req, res) => {
    res.send(`<div style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);">
                    <h1>welcome this project</h1>
                    <div>post-llist</div>
                    <ul style="list-style: none;padding-left: 0;">
                        <li><a href="https://express-vercel-eight-delta.vercel.app/forumList">/forumList</a></li>
                        <li><a href="https://express-vercel-eight-delta.vercel.app/listStory">/listStory</a></li>
                        <li><a href="https://express-vercel-eight-delta.vercel.app/blog">/novelView</a></li>
                    </ul>
                    </div>
    `)
})

app.listen(3001, async () => {
    console.log('Example app listening on port 3000!');
    try {
        await mongo.connect(`mongodb+srv://vagmr:vagmr@atlascluster.hbgdlkf.mongodb.net/`);
        console.log("连接成功");
    } catch (error) {
        console.error("连接失败:", error);
        // 在连接失败时执行其他操作，例如关闭应用程序或发送通知
    }
})