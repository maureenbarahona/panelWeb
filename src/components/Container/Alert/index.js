import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const notifySuccess = (messageS) => {
	toast.success(messageS, {
		position: toast.POSITION.TOP_CENTER
	});
};
const notifyWarn = (messageW) => {
	toast.warn(messageW, {
		position: toast.POSITION.BOTTOM_CENTER
	});
};
const notifyError = (messageE) => {
	toast.error(messageE, {
		position: toast.POSITION.TOP_CENTER
	});
};

const ToastContainerR = () => (
	<div>
		<ToastContainer autoClose={8000} />
	</div>
);

export { notifySuccess, notifyWarn, notifyError, ToastContainerR };
