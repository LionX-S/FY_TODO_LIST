const express = require("express");
const { List } = require("./mongo/connect");

const app = express();

// 该函数是Express.js中的中间件，用于解析并转换请求体中的JSON数据为JavaScript对象，存入req.body，便于后续路由处理。
// 中间件是按书写顺序调用的，所以中间件的顺序很重要。
app.use(express.json());
// 作用也是解析参数，用于解析url中key=value形式的参数
app.use(express.urlencoded({ extended: true }));

// 设置跨域
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // 允许任何源
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // 允许的HTTP方法
	res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许的HTTP请求头
	next();
});

const port = 3001;

app.get("/getTodoLists", async (req, res) => {
	try {
		const todoLists = await List.find();
		res.send({
			data: todoLists,
			msg: "获取数据成功",
			code: 200
		});
	} catch (err) {
		res.send({
			data: [],
			msg: "获取数据失败",
			code: 500
		});
	}
});

app.post("/addTodoList", async (req, res) => {
	try {
		const { todoLabel, completed } = req.body;
		const todoList = new List({
			todoLabel,
			completed
		});
		await todoList.save();
		res.send({
			data: todoList,
			msg: "添加数据成功",
			code: 200
		});
	} catch (err) {
		console.log("🚀 ~ app.post ~ err:", err);
		res.send({
			data: [],
			msg: "添加数据失败",
			code: 500
		});
	}
});

app.delete("/deleteTodoList", async (req, res) => {
	const { id } = req.body;
	try {
		await List.deleteOne({ _id: id });
		res.send({
			data: [],
			msg: "删除数据成功",
			code: 200
		});
	} catch (err) {
		res.send({
			data: [],
			msg: "删除数据失败",
			code: 500
		});
	}
});

app.put("/updateTodoList", async (req, res) => {
	const { id, todoLabel, completed } = req.body;
	try {
		await List.updateOne({ _id: id }, { todoLabel, completed });
		res.send({
			data: [],
			msg: "修改数据成功",
			code: 200
		});
	} catch {
		res.send({
			data: [],
			msg: "修改数据失败",
			code: 500
		});
	}
});

app.listen(port, () => {
	console.log("🚀 ~ 服务启动成功，端口号:", port);
});
