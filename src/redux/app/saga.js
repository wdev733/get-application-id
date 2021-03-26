import { all, takeLatest, fork, call } from "redux-saga/effects";

import actions from "./actions";

import { CONTRACT_ABI, CONTRACT_ADDRESS, getGasFee } from "../../helper/contract";
import { getWeb3, getGasPrice } from "../../helper/web3";

export function* getApplicationId() {
  yield takeLatest(actions.GET_APPLICATION_ID, function* ({ payload }) {
    const { email, callback } = payload;

    const web3 = yield call(getWeb3);

    const instance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const getApplicationIDAsync = async (instance, email) => {
      return await instance.methods
        .getApplicationID(email)
        .call()
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    };

    const applicationId = yield call(getApplicationIDAsync, instance, email);

    callback(applicationId);
  });
}

export function* apply() {
  yield takeLatest(actions.APPLY, function* ({ payload }) {
    const { hash, callback } = payload;

    const web3 = yield call(getWeb3);

    const instance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    // Get Wallet Account
    const accounts = yield call(web3.eth.getAccounts);
    const applyAsync = async (instance, web3, hash, address) => {
      const prices = await getGasPrice();

      // Get gas limit
      const gasLimit = await instance.methods
        .apply(hash)
        .estimateGas({ from: address });

      return await instance.methods
        .apply(hash)
        .send({
          from: address,
          gasPrice: web3.utils.toWei(prices.high.toString(), "gwei"),
          gas: getGasFee(gasLimit),
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        });
    };

    const result = yield call(applyAsync, instance, web3, `0x${hash}`, accounts[0]);
    callback(result.status);

  });
}

export default function* rootSaga() {
  yield all([
    fork(getApplicationId),
    fork(apply)
  ]);
}
