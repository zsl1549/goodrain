
export default {
  namespace: 'activities',

  state: {
    list: [],
  },

  effects: {
    
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
