import React, { useState } from "react";
import { Checkbox, Button, Flex, Modal } from "antd";
import style from "./index.module.css";

const ListItem = (props) => {
	const {
		itemData: { _id, todoLabel, completed },
		viewList,
		changeItem
	} = props;

	const openModal = ({ type, title }) => {
		viewList({ id: _id, type, title });
	};
	return (
		<div className={style.listItemContainer}>
			<div>
				<Checkbox
					checked={completed}
					onChange={(e) => {
						changeItem({
							id: _id,
							todoLabel,
							completed: e.target.checked
						});
					}}>
					<span style={{ textDecoration: completed ? "line-through" : "none" }}>
						{todoLabel}
					</span>
				</Checkbox>
			</div>
			<Flex
				gap='middle'
				horizontal='true'>
				<Button
					type='primary'
					onClick={() => {
						openModal({ type: "view", title: "查看事件" });
					}}>
					查看
				</Button>
				<Button
					type='primary'
					style={{ backgroundColor: "orange" }}
					onClick={() => {
						openModal({ type: "update", title: "修改事件" });
					}}>
					修改
				</Button>
				<Button
					type='primary'
					danger
					onClick={() => {
						changeItem({
							id: _id
						});
					}}>
					删除
				</Button>
			</Flex>
		</div>
	);
};

export default ListItem;
