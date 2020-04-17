import {
	sendSubscriptions,
	getAllSubscriptions,
	deleteSubscriptions,
	getOnesubscriptions,
	updateSubscriptions
} from '../api/subscriptions/apiSubscriptions';

const sendSubscription = async (bodyData) => {
	try {
		return sendSubscriptions(bodyData);
	} catch (error) {
		throw new Error(error);
	}
};

const getAllSubscription = async () => {
	try {
		return getAllSubscriptions();
	} catch (error) {
		throw new Error(error);
	}
};

const deleteSubscription = async (id) => {
	try {
		return deleteSubscriptions(id);
	} catch (error) {
		throw new Error(error);
	}
};

const getOnesubscription = async (id) => {
	try {
		return getOnesubscriptions(id);
	} catch (error) {
		throw new Error(error);
	}
};

const updateSubscription = async (bodyData, id) => {
	try {
		return updateSubscriptions(bodyData, id);
	} catch (error) {
		throw new Error(error);
	}
};

export { sendSubscription, getAllSubscription, deleteSubscription, getOnesubscription, updateSubscription };
