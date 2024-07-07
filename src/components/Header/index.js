import React from "react";
import style from "./index.module.css";
const Header = (props) => {
	const { inputVisible, changeInputVisible } = props;
	return (
		<div className={style.header}>
			<h1>事件待办</h1>
			<span onClick={changeInputVisible}>+</span>
		</div>
	);
};

export default Header;
