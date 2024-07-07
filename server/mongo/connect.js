const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/todoList";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("MongoDB连接成功！");
	})
	.catch((err) => {
		console.error("MongoDB连接失败！", err);
	});

const listSchema = new mongoose.Schema({
	todoLabel: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	createTime: {
		type: Date,
		default: Date.now
	}
});

const List = mongoose.model("List", listSchema);

module.exports = {
	List
};
