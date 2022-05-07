import {CHANGE_NAME} from './actions';

const initialState = {
  name: '',
};

const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name:state.name
      };
  }
  return state;
};

export default nameReducer;
