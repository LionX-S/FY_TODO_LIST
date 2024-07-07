import React, { useCallback, useEffect, useState } from "react";
import { Flex, Button, Modal, Input, message } from "antd";
import moment from "moment";
import style from "./index.module.css";
const TodoModal = (props) => {
	const {
		modalTypeAndData: { data, title, type },
		modalVisible,
		setModalVisible,
		changeItem,
		viewList
	} = props;

	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		setInputValue(data.todoLabel);
	}, [data]);

	const updateItem = useCallback(() => {
		if (inputValue.trim()) {
			changeItem({
				id: data._id,
				todoLabel: inputValue,
				completed: false
			});
		} else {
			message.destroy();
			message.error("事件不能为空");
		}
	}, [inputValue]);
	return (
		<Modal
			open={modalVisible}
			footer={() => {
				return (
					<Flex
						gap='middle'
						horizontal='true'
						justify='center'
						align='centre'>
						<Button
							type='primary'
							onClick={() => {
								setModalVisible(false);
								if (type === "update") {
									updateItem();
								}
							}}>
							{type === "update" && "修改"}
							{type === "view" && "关闭"}
						</Button>
						{type === "update" && (
							<Button
								onClick={() => {
									setModalVisible(false);
								}}>
								取消
							</Button>
						)}
						{type === "view" && (
							<Button
								style={{ backgroundColor: "green", color: "#fff" }}
								onClick={() => {
									viewList({
										id: data._id,
										type: "update",
										title: "修改事件"
									});
								}}>
								修改
							</Button>
						)}
					</Flex>
				);
			}}
			onCancel={() => {
				setModalVisible(false);
			}}
			centered
			title={title}>
			<div>
				{type === "view" && (
					<>
						<p>时间：{moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")}</p>
						<p>事件：{data.todoLabel}</p>
						<p>是否完成：{data.completed ? "是" : "否"}</p>
					</>
				)}
				{type === "update" && (
					<Input.TextArea
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}></Input.TextArea>
				)}
			</div>
		</Modal>
	);
};

export default TodoModal;
