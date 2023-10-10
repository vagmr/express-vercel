const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// 定义用于存储博客数据的文件路径
let dataFilePath;
if (process.env.online) {
    dataFilePath = path.join("/tmp", "./blogs.json");
}
else {
    dataFilePath = path.join(__dirname, '../db/blogs.json');
}

// 读取博客数据文件的内容
let blogModel = [
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
    },
    {
        "title": "Scarlett O'Hara's Journey",
        "body": "Scarlett O'Hara was not beautiful, but men seldom realized it when caught by her charm as the Tarleton twins were. In her face were too sharply blended the delicate features of her mother, a Coast aristocrat of French descent, and the heavy ones of her florid Irish father. But it was an arresting face, pointed of chin, square of jaw. Her eyes were pale green without a touch of hazel, starred with bristly black lashes and slightly tilted at the ends. Above them, her thick black brows slanted upward, cutting a startling oblique line in her magnolia-white skin—that skin so prized by Southern women and so carefully guarded with bonnets, veils, and mittens against hot Georgia suns.\n\nSeated with Stuart and Brent Tarleton in the cool shade of the porch of Tara, her father's plantation, that bright April afternoon of 1861, she made a pretty picture. Her new green flowered-muslin dress spread its twelve yards of billowing material over her hoops and exactly matched the flat-heeled green morocco slippers her father had recently brought her from Atlanta. The dress set off to perfection the seventeen-inch waist, the smallest in three counties, and the tightly fitting basque showed breasts well matured for her sixteen years. But for all the modesty of her spreading skirts, the demureness of hair netted smoothly into a chignon and the quietness of small white hands folded in her lap, her true self was poorly concealed. The green eyes in the carefully sweet face were turbulent, willful, lusty with life, distinctly at variance with her decorous demeanor. Her manners had been imposed upon her by her mother's gentle admonitions and the sterner discipline of her mammy; her eyes were her own.",
        "author": "vagmr",
        "id": 3
    },
    {
        "title": "Journey Through Time",
        "body": "The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burned brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere when thought runs gracefully free of the trammels of precision. And he put it to us in this way—marking the points with a lean forefinger—as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity.\n\n“You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. The geometry, for instance, they taught you at school is founded on a misconception.”",
        "author": "vagmr",
        "id": 4
    },
    {
        "title": "A Glimpse into Moby-Dick",
        "body": "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to the sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
        "author": "vagmr",
        "id": 5
    },
    {
        "title": "The Great Gatsby",
        "body": "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.\n\n'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.' He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.\n\nThe abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought - frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.",
        "author": "vagmr",
        "id": 6
    }
];

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
