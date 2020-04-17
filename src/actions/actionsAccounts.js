import {
  getAllAccounts,
  sendInfoAccounts,
  updateAccounts,
  getOneAccounts,
  getAccountsWithFilter
} from '../api/accounts/apiAccounts';
import {
  getAllUserAccounts,
  sendUserAccounts
} from '../api/accounts/apiUsersAccount';

const getAllAccount = async () => {
  try {
    return getAllAccounts();
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUserAccount = async () => {
  try {
    return getAllUserAccounts();
  } catch (error) {
    throw new Error(error);
  }
};

const getOneAccount = async id => {
  try {
    return getOneAccounts(id);
  } catch (error) {
    throw new Error(error);
  }
};

const getAccountWithFilter = async filter => {
  try {
    return getAccountsWithFilter(filter);
  } catch (error) {
    throw new Error(error);
  }
};

const sendInfoAccount = async bodyData => { 
  try {
    return sendInfoAccounts(bodyData);
  } catch (error) {
    throw new Error(error);
  }
};

const sendUserAccount = async bodyData => {
  try {
    return sendUserAccounts(bodyData);
  } catch (error) {
    throw new Error(error);
  }
};

const updateAccount = async (bodyData, id) => {
  try {
    return updateAccounts(bodyData, id);
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAllAccount,
  sendInfoAccount,
  updateAccount,
  getOneAccount,
  getAccountWithFilter,
  getAllUserAccount,
  sendUserAccount
};
