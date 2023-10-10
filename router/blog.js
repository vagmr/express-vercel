const express = require('express');
// 引入express和redis模块
import { createClient } from '@vercel/kv';


const client = createClient({
    url: process.env.USERS_REST_API_URL,
    token: process.env.USERS_REST_API_TOKEN,
})

// 创建一个express路由
const router = express.Router();



// 定义用于存储博客数据的键名
const blogKey = 'blogs';

// 查询全部博客
router.get('/blog', (req, res, next) => {
    // 从KV中获取博客数据
    client.hgetall(blogKey, (err, blogs) => {
        if (err) {
            // 如果出错，返回错误信息
            res.json({
                code: '0001',
                msg: '查询失败',
                data: null,
            });
        } else {
            // 如果成功，返回博客数据
            res.json({
                code: '0000',
                msg: '查询成功',
                data: Object.values(blogs), // 将对象转换为数组
            });
        }
    });
});

// 查询单个博客
router.get('/blog/:id', (req, res, next) => {
    const qid = req.params.id;
    // 从KV中获取指定id的博客数据
    client.hget(blogKey, qid, (err, blog) => {
        if (err || !blog) {
            // 如果出错或者没有找到，返回错误信息
            res.json({
                code: '0001',
                msg: '查询失败',
                data: null,
            });
        } else {
            // 如果成功，返回博客数据
            res.json({
                code: '0000',
                msg: '查询成功',
                data: JSON.parse(blog), // 将字符串转换为对象
            });
        }
    });
});

// 添加博客
router.post('/blog', (req, res, next) => {
    const newBlog = req.body;
    // 使用KV的事务机制来保证原子性操作
    client.multi()
        .incr('blogId') // 自增生成一个新的id
        .hset(blogKey, 'blogId', JSON.stringify(newBlog)) // 将新的博客数据存入KV，并使用新生成的id作为字段名
        .exec((err, replies) => {
            if (err) {
                // 如果出错，返回错误信息
                res.json({
                    code: '0001',
                    msg: '添加失败',
                    data: null,
                });
            } else {
                // 如果成功，返回新的博客数据，并添加id属性
                newBlog.id = replies[0];
                res.json({
                    code: '0000',
                    msg: '添加成功',
                    data: newBlog,
                });
            }
        });
});

// 删除博客
router.delete('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    // 从KV中删除指定id的博客数据
    client.hdel(blogKey, qid, (err, reply) => {
        if (err || reply === 0) {
            // 如果出错或者没有找到，返回错误信息
            res.json({
                code: '0001',
                msg: '删除失败',
                data: null,
            });
        } else {
            // 如果成功，返回空数据
            res.json({
                code: '0000',
                msg: '删除成功',
                data: null,
            });
        }
    });
});

// 修改博客
router.patch('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    const updatedBlog = req.body;
    // 从KV中获取指定id的博客数据
    client.hget(blogKey, qid, (err, blog) => {
        if (err || !blog) {
            // 如果出错或者没有找到，返回错误信息
            res.json({
                code: '0001',
                msg: '修改失败',
                data: null,
            });
        } else {
            // 如果成功，将原来的博客数据与更新的博客数据合并
            const mergedBlog = { ...JSON.parse(blog), ...updatedBlog };
            // 将合并后的博客数据存回KV中
            client.hset(blogKey, qid, JSON.stringify(mergedBlog), (err, reply) => {
                if (err) {
                    // 如果出错，返回错误信息
                    res.json({
                        code: '0001',
                        msg: '修改失败',
                        data: null,
                    });
                } else {
                    // 如果成功，返回合并后的博客数据
                    res.json({
                        code: '0000',
                        msg: '修改成功',
                        data: mergedBlog,
                    });
                }
            });
        }
    });
});

module.exports = router;
