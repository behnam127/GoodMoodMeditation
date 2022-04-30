import {COINS_INCREMENT, COINS_DECREMENT, UPDATE_COIN_STORAGE} from './actions';

const initialState = {
  coins: 0,
};
const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COINS_INCREMENT:
      return {
        ...state,
        coins: parseInt(state.coins) + 1,
      };
    case COINS_DECREMENT:
      if (parseInt(state.coins) > 0) {
        return {
          ...state,
          coins: parseInt(state.coins) - 1,
        };
      }
    case UPDATE_COIN_STORAGE:
      return {...state, coins: action.payload};
  }
  return state;
};

export default coinsReducer;
