/**
 * @Author: Raquel Jackson
 * @Date:   2018-10-18T09:19:47-06:00
 * @Email:  r.jackson@msn.com
 * @Last modified by:   Raquel Jackson
 * @Last modified time: 2018-10-18T11:59:11-06:00
 */
const initialState = {
  data: null,
  form: {
    nombre: '',
    apellido: '',
  },
  isLoading: false,
};

const FETCH_TRANSACTIONS = 'paygate/form/FETCH_TRANSACTIONS';
const INPUT_CHANGE = 'paygate/form/INPUT_CHANGE';
const FETCH_TRANSACTIONS_FAIL = 'paygate/form/FETCH_TRANSACTIONS_FAIL';
const FETCH_TRANSACTIONS_SUCCESS = 'paygate/form/FETCH_TRANSACTIONS_SUCCESS';

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case INPUT_CHANGE: {
      const { form: prevData } = state;
      const { form: nextData } = payload;
      const form = {
        ...prevData,
        ...nextData
      }

      return { ...state, form };
    }
    case FETCH_TRANSACTIONS:
    case FETCH_TRANSACTIONS_FAIL: {
      const { isLoading: prevData } = state;
      const isLoading = !prevData;

      return { ...state, isLoading }
    }
    case FETCH_TRANSACTIONS_SUCCESS: {
      const { data } = payload;
      const isLoading = false;

      return { ...state, data, isLoading }
    }
    default: return state;
  }
}

//action creator
const inputChange = form => ({
  payload: { form },
  type: INPUT_CHANGE,
});

const fetchTransactions = () => ({
  type: FETCH_TRANSACTIONS
});

const fetchTransactionsFail = error => ({
  payload: { error },
  type: FETCH_TRANSACTIONS_FAIL,
});

const fetchTransactionsSuccess = data => ({
  payload: { data },
  type: FETCH_TRANSACTIONS_SUCCESS,
});

export default reducer;
export {
  INPUT_CHANGE,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAIL,
  FETCH_TRANSACTIONS_SUCCESS,
  inputChange,
  fetchTransactions,
  fetchTransactionsFail,
  fetchTransactionsSuccess,
};
