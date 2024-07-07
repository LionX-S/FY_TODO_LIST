import React, { useState, useRef } from "react";
import { Input, Button, message } from "antd";
import style from "./index.module.css";
const AddInput = (props) => {
	const { visible, addItem } = props;
	const inputRef = useRef();
	const [inputValue, setInputValue] = useState("");

	const submitValue = () => {
		if (inputValue.trim()) {
			addItem(inputValue);
			setInputValue("");
		} else {
			message.destroy();
			message.error("请输入内容");
			return;
		}
	};

	const inputValueChange = () => {
		setInputValue(inputRef.current.input.value);
	};
	return (
		<div style={{ display: visible ? "block" : "none" }}>
			<div className={style.addInputContainer}>
				<Input
					value={inputValue}
					onChange={inputValueChange}
					ref={inputRef}
				/>
				<Button
					type='primary'
					onClick={submitValue}>
					新增
				</Button>
			</div>
		</div>
	);
};

export default AddInput;
