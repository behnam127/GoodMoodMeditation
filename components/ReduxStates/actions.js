export const COINS_INCREMENT = 'COINS_INCREMENT';
export const COINS_DECREMENT = 'COINS_DECREMENT';
export const UPDATE_COIN_STORAGE = 'UPDATE_COIN_STORAGE';

export const onIncrement = (coins) => (dispatch) => {
  dispatch({
    type: COINS_INCREMENT,
    //payload: coins,
  });
};

export const onDecrement = (coins) => (dispatch) => {
  dispatch({
    type: COINS_DECREMENT,
    //payload: coins,
  });
};

export const onCoinsUpdate = (coins) => (dispatch) => {
  dispatch({
    type: UPDATE_COIN_STORAGE,
    coins,
  });
};
