const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// 定义用于存储博客数据的文件路径
const dataFilePath = path.join(__dirname, '../db/blogs.json');

// 读取博客数据文件的内容
let blogModel = [];

try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    blogModel = JSON.parse(data);
} catch (error) {
    console.error('Error reading data file:', error);
}

// 查询全部博客
router.get('/blog', (req, res, next) => {
    res.json({
        code: '0000',
        msg: '查询成功',
        data: blogModel, // 反转数组以获取按照 id 降序排列的效果
    });
});

// 查询单个博客
router.get('/blog/:id', (req, res, next) => {
    const qid = parseInt(req.params.id);
    const blog = blogModel.find((item) => item.id === qid);

    if (blog) {
        res.json({
            code: '0000',
            msg: '查询成功',
            data: blog,
        });
    } else {
        res.json({
            code: '0001',
            msg: '查询失败',
            data: null,
        });
    }
});

// 添加博客
router.post('/blog', (req, res, next) => {
    const newBlog = { ...req.body, id: blogModel.length + 1 };
    blogModel.push(newBlog);

    // 将数据写回文件
    fs.writeFileSync(dataFilePath, JSON.stringify(blogModel, null, 2), 'utf-8');

    res.json({
        code: '0000',
        msg: '添加成功',
        data: newBlog,
    });
});

// 删除博客
router.delete('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    const index = blogModel.findIndex((item) => item.id === qid);

    if (index !== -1) {
        blogModel.splice(index, 1);

        // 将数据写回文件
        fs.writeFileSync(dataFilePath, JSON.stringify(blogModel, null, 2), 'utf-8');

        res.json({
            code: '0000',
            msg: '删除成功',
            data: null,
        });
    } else {
        res.json({
            code: '0001',
            msg: '删除失败，博客不存在',
            data: null,
        });
    }
});

// 修改博客
router.patch('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    const index = blogModel.findIndex((item) => item.id === qid);

    if (index !== -1) {
        blogModel[index] = { ...blogModel[index], ...req.body };

        // 将数据写回文件
        fs.writeFileSync(dataFilePath, JSON.stringify(blogModel, null, 2), 'utf-8');

        res.json({
            code: '0000',
            msg: '修改成功',
            data: blogModel[index],
        });
    } else {
        res.json({
            code: '0001',
            msg: '修改失败，博客不存在',
            data: null,
        });
    }
});

module.exports = router;
