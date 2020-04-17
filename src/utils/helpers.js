import moment from 'moment';

const lpad = (n, width, z = '0') => {
	n = `${n}`;

	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const dateFormat = (dateString) => {
	if (!moment(dateString).isValid()) {
		throw new Error('fecha invalida');
	}
	return moment(dateString).unix();
};

const dateTextFormat = (dateString) => {
	if (!moment(dateString).isValid()) {
		throw new Error('fecha invalida');
	}
	return moment(dateString).format('DD MMMM YYYY hh:mm a');
};

const startDateOf = () => {
	return moment().startOf('month');
};

const endDateOf = () => {
	return moment().endOf('day');
};

const dateUnixFormat = (dateString) => {
	if (!moment(dateString).isValid()) {
		throw new Error('fecha invalida');
	}
	return moment(dateString, 'YYYY/MM/DD').unix();
};

const dateUnixFormat2 = (dateString) => {
	if (!moment(dateString).isValid()) {
		throw new Error('fecha invalida');
	}
	return moment.unix(dateString).format('DD MMMM YYYY hh:mm a');
};

const startDateFormat = (dateString) => {
	return moment(dateString, 'YYYY/MM/DD').startOf('day');
};

const endDateFormat = (dateString) => {
	return moment(dateString, 'YYYY/MM/DD').endOf('day');
};

export { lpad, endDateOf, dateFormat, startDateOf, dateTextFormat, endDateFormat, startDateFormat, dateUnixFormat, dateUnixFormat2 };
