// 通用axios接口
import axios from "axios";
import { message } from "antd";

const baseURL = "http://localhost:3001";
export const request = (url, method, options = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			url: url,
			baseURL,
			method,
			timeout: 10000,
			...options
		})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				message.destroy();
				message.error(err.message);
				reject(err);
			});
	});
};
