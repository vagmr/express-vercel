var express = require('express');
const router = express.Router();
//使用token保护接口


const blogModel = [

    {
        "title": "My First Blog",
        "body": "Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\nWhere can I get some?\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        "author": "mario",
        "id": 1
    },
    {
        "title": "Opening Party!",
        "body": "Why do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\nWhere can I get some?\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        "author": "yoshi",
        "id": 2
    }

]
//定义中间件

/// 查询全部博客
router.get('/blog', (req, res, next) => {
    res.json({
        code: "0000",
        msg: "查询成功",
        data: blogModel.reverse() // 反转数组以获取按照 id 降序排列的效果
    });
});

// 查询单个博客
router.get('/blog/:id', (req, res, next) => {
    const qid = parseInt(req.params.id);
    const blog = blogModel.find(item => item.id === qid);

    if (blog) {
        res.json({
            code: "0000",
            msg: "查询成功",
            data: blog
        });
    } else {
        res.json({
            code: '0001',
            msg: '查询失败',
            data: null
        });
    }
});

// 添加博客
router.post('/blog', (req, res, next) => {
    const newBlog = { ...req.body, id: blogModel.length + 1 };
    blogModel.push(newBlog);

    res.json({
        code: '0000',
        msg: '添加成功',
        data: newBlog
    });
});

// 删除博客
router.delete('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    const index = blogModel.findIndex(item => item.id === qid);

    if (index !== -1) {
        blogModel.splice(index, 1);
        res.json({
            code: '0000',
            msg: '删除成功',
            data: null
        });
    } else {
        res.json({
            code: '0001',
            msg: '删除失败，博客不存在',
            data: null
        });
    }
});

// 修改博客
router.patch('/blog/:id', (req, res) => {
    const qid = parseInt(req.params.id);
    const index = blogModel.findIndex(item => item.id === qid);

    if (index !== -1) {
        blogModel[index] = { ...blogModel[index], ...req.body };
        res.json({
            code: '0000',
            msg: '修改成功',
            data: blogModel[index]
        });
    } else {
        res.json({
            code: '0001',
            msg: '修改失败，博客不存在',
            data: null
        });
    }
});

module.exports = router;