var express = require('express');
const router = express.Router();
//使用token保护接口


//定义中间件

//查询全部博客
router.get('/blog', function (req, res, next) {
    blogModel.find().sort({ id: -1 }).then(list => {
        console.log(req.info);
        res.json({
            code: "0000",
            msg: "查询成功",
            data: list
        })
    }).catch(err => {
        res.json({
            code: '0001',
            msg: '查询失败',
            data: err
        })
    })

})
router.get('/blog/:id', function (req, res, next) {
    qid = req.params.id
    blogModel.findById(qid).then(list => {
        res.json({
            code: "0000",
            msg: "查询成功",
            data: list
        })
    }).catch(err => {
        res.json({
            code: '0001',
            msg: '查询失败',
            data: err
        })
    })
})
router.post('/blog', function (req, res, next) {
    blogModel.create({ ...req.body }).then((result) => {
        res.json({
            code: '0000',
            msg: '添加成功',
            data: result
        })
    }).catch(err => {
        res.json({ code: '0001', msg: '添加失败', data: err })
    })

})

router.delete('/blog/:id', (req, res) => {
    let qid = req.params.id;
    blogModel.deleteOne({ _id: qid }).then((result) => {
        res.json({
            code: '0001',
            msg: '删除成功',
            data: result
        })
    }).catch(() => {
        res.json({
            code: '0000',
            msg: '删除失败',
            data: null
        })
    }
    );

})
router.patch('/blog/:id', (req, res) => {
    let qid = req.params.id;
    blogModel.updateOne({ _id: qid }, req.body).then((result) => {
        res.json({
            code: '0001',
            msg: '修改成功',
            data: result
        })
    }).catch(() => {
        res.json({
            code: '0000',
            msg: '修改失败',
            data: null
        })
    })
})

module.exports = router;