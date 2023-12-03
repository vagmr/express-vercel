const express = require("express")
const router = express.Router()
let wordsList = [
    {
        "code": 1,
        "content": "“孔子 孟子 老子，你知道你最适合当什么子吗?”“不知道。”“我的妻子。”"
    },
    {
        "code": 2,
        "content": "我发现昨天很喜欢你，今天也很喜欢你，而且有预感明天也会喜欢你。"
    },
    {
        "code": 3,
        "content": "对你最初的印象，久久难以忘怀。"
    },
    {
        "code": 4,
        "content": "青烟幂处，碧海飞金镜。永夜闲阶卧桂影。露凉时、零乱多少寒螀，神京远，惟有蓝桥路近。"
    },
    {
        code: 5,
        content: "明月净松林，千峰同一色。"
    }
    , {
        code: 6,
        content: "千里之行，始于足下。"
    },
    {
        code: 7,
        content: "贼臣持国柄，杀主灭宇京。"
    },
    {
        code: 8,
        content: "老阮不狂谁会得？出门一笑大江横。"
    },
    {
        code: 9,
        content: "桃花潭水深千尺，不及汪伦送我情。"
    },
    {
        code: 10,
        content: "独在异乡为异客，每逢佳节倍思亲。"
    },
    {
        code: 11,
        content: "山重水复疑无路，柳暗花明又一村。"
    },
    {
        code: 12,
        content: "床前明月光，疑是地上霜。"
    },
    {
        code: 13,
        content: "举头望明月，低头思故乡。"
    },
    {
        code: 14,
        content: "君不见黄河之水天上来，奔流到海不复回。"
    },
    {
        code: 15,
        content: "日出江花红胜火，春来江水绿如蓝。"
    },
    {
        code: 16,
        content: "问渠那得清如许，为有源头活水来。"
    },
    {
        code: 17,
        content: "一寸光阴一寸金，寸金难买寸光阴。"
    },
    {
        code: 18,
        content: "知之为知之，不知为不知，是知也。"
    }
]

router.get("/wordlist", (req, res) => {
    res.json({
        code: 200,
        msg: '获取成功',
        data: wordsList
    })
})
module.exports = router