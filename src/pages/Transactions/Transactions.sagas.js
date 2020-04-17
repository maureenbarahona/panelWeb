/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T09:53:26-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-18T11:52:07-06:00
 */
import {
  all,
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchTransactionsSuccess,
  fetchTransactionsFail,
  FETCH_TRANSACTIONS,
} from './Transactions.ducks'

 const dataURL = 'https://f3k38g94bc.execute-api.us-east-1.amazonaws.com/staging/payments';


function* getUser(action) {
  try {
    const { data } = yield call(axios, dataURL);
    const { results } = data;
    const [user] = results;

    yield put(fetchUserSuccess(user));
  } catch(error) {
    yield put(fetchUserFail(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(FETCH_USER, getUser)
  ]);
}

export default rootSaga;
