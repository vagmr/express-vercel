const express = require('express');
const router = express.Router();

let quizData = [
    {
        "question": "哪个是最受欢迎的JavaScript框架？",
        "options": ["Angular", "React", "Svelte", "Vue"],
        "correctOption": 1,
        "points": 10
    },
    {
        "question": "哪家公司发明了React？",
        "options": ["Google", "Apple", "Netflix", "Facebook"],
        "correctOption": 3,
        "points": 10
    },
    {
        "question": "React应用的基本构建块是什么？",
        "options": ["Components", "Blocks", "Elements", "Effects"],
        "correctOption": 0,
        "points": 10
    },
    {
        "question": "我们用来描述React组件中UI的语法叫什么名字？",
        "options": ["FBJ", "Babel", "JSX", "ES2015"],
        "correctOption": 2,
        "points": 10
    },
    {
        "question": "在 React 应用中，数据流向自然是怎样的？",
        "options": [
            "从父级到子级",
            "从子级到父级",
            "双向",
            "由开发者决定"
        ],
        "correctOption": 0,
        "points": 10
    },
    {
        "question": "如何将数据传递给子组件？",
        "options": ["State", "Props", "PropTypes", "Parameters"],
        "correctOption": 1,
        "points": 10
    },
    {
        "question": "什么时候使用派生状态？",
        "options": [
            "当状态不应触发重新渲染时",
            "当状态可以与效果同步时",
            "当状态应该对所有组件可访问时",
            "当状态可以从另一个状态变量计算出来时"
        ],
        "correctOption": 3,
        "points": 30
    },
    {
        "question": "在 React 中，什么触发 UI 重新渲染？",
        "options": [
            "运行一个效果",
            "传递 props",
            "更新状态",
            "向 DOM 元素添加事件监听器"
        ],
        "correctInfo": 2,
        "points": 20
    },
    {
        "question": "我们在 React 中直接接触到DOM是什么时候？",
        "options": [
            "当我们需要监听一个事件",
            "当我们需要改变 UI",
            "当我们需要添加样式",
            "几乎从不"
        ],
        "correctOption": 3,
        "points": 20
    },
    {
        "question": "在什么情况下我们使用回调来更新状态？",
        "options": [
            "当更新状态会很慢",
            "当更新的状态非常数据密集",
            "当状态更新应该更快发生",
            "当新状态依赖于以前的状态"
        ],
        "correctOption": 3,
        "points": 30
    },
    {
        "question": "如果我们向 useState 传递一个函数，那么这个函数什么时候会被调用？",
        "options": [
            "在每次重新渲染时",
            "每次我们更新状态时",
            "只在初始渲染时",
            "我们第一次更新状态时"
        ],
        "correctOption": 2,
        "points": 30
    },
    {
        "question": "在组件的初始渲染上，使用哪个钩子进行 API 请求？",
        "options": ["useState", "useEffect", "useRef", "useReducer"],
        "correctOption": 1,
        "points": 10
    },
    {
        "question": "哪些变量应该放进 useEffect 的依赖数组中？",
        "options": [
            "通常没有",
            "我们所有的状态变量",
            "在效果中引用的所有状态和 props",
            "所有清理需要的变量"
        ],
        "correctOption": 2,
        "points": 30
    },
    {
        "question": "一个效果总是在初始渲染时运行。",
        "options": [
            "正确",
            "取决于依赖数组",
            "错误",
            "取决于效果中的代码"
        ],
        "correctOption": 0,
        "points": 30
    },
    {
        "question": "如果一个效果没有依赖数组，它什么时候会运行？",
        "options": [
            "只在组件装载时",
            "只在组件卸载时",
            "组件第一次重新渲染时",
            "每次组件被重新渲染时"
        ],
        "correctOption": 3,
        "points": 20
    }
]


router.get("/quiz/:id", (req, res) => {
    console.log("get quiz");

    const quizId = parseInt(req.params.id);
    const quiz = quizData[quizId - 1];
    if (quiz) {
        res.json(
            {
                code: 200,
                data: quiz,
                message: "success"
            }
        );
    }
    else {
        res.json(
            {
                code: 404,
                message: "quiz not found"
            }
        );
    }
});

router.get("/quizzes", (req, res) => {
    res.json(
        {
            code: 200,
            data: quizData,
            message: "success"
        }
    )
})

module.exports = router;