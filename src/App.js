import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import AddInput from "./components/AddInput";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";
import { Empty, message } from "antd";
import { request } from "./http/request";
import "./App.css";

function App() {
	const [inputVisible, setInputVisible] = useState(false);
	const [todoList, setTodoList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTypeAndData, setModalTypeAndData] = useState({
		type: "",
		title: "",
		data: {}
	});

	const addClickHandle = useCallback(() => {
		setInputVisible(!inputVisible);
	});

	const viewList = ({ id, type, title }) => {
		const listItemObj = todoList.find((item) => {
			return item._id === id;
		});
		setModalTypeAndData({
			type,
			title,
			data: listItemObj
		});
		setModalVisible(true);
	};

	const getTodoLists = useCallback(async () => {
		const result = await request("/getTodoLists", "get");
		if (result && result.code === 200) {
			setTodoList(result.data);
		}
	});
	// 获取数据
	useEffect(() => {
		getTodoLists();
	}, []);

	const changeListItemData = useCallback(
		async ({ id, todoLabel, completed }) => {
			let newTodoList;
			if (!todoLabel && !completed) {
				let result = await request("/deleteTodoList", "delete", {
					data: {
						id
					}
				});
				if (result && result.code === 200) {
					message.destroy();
					message.success("删除成功");
					getTodoLists();
				} else {
					message.destroy();
					message.error("删除失败");
				}
			} else {
				let result = await request("/updateTodoList", "put", {
					data: {
						id,
						todoLabel,
						completed
					}
				});
				if (result && result.code === 200) {
					message.destroy();
					message.success("修改成功");
					getTodoLists();
				} else {
					message.destroy();
					message.error("修改失败");
				}
			}
			setTodoList(newTodoList);
		},
		[todoList]
	);

	const addItemHandle = useCallback(
		async (todoLabel) => {
			let result = await request("/addTodoList", "post", {
				data: {
					todoLabel,
					completed: false
				}
			});
			if (result && result.code === 200) {
				message.destroy();
				message.success("添加成功");
				getTodoLists();
			}
			setInputVisible(false);
		},
		[inputVisible]
	);
	return (
		<div className='App'>
			<Header changeInputVisible={addClickHandle} />
			<AddInput
				visible={inputVisible}
				addItem={addItemHandle}
			/>
			{todoList?.length ? (
				todoList.map((item, index) => {
					return (
						<ListItem
							key={index}
							itemData={item}
							viewList={viewList}
							changeItem={changeListItemData}
						/>
					);
				})
			) : (
				<div style={{ marginTop: "100px" }}>
					<Empty description='暂无数据，右上角添加一个吧！' />
				</div>
			)}
			<Modal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				modalTypeAndData={modalTypeAndData}
				changeItem={changeListItemData}
				viewList={viewList}></Modal>
		</div>
	);
}

export default App;
