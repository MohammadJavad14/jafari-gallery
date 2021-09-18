/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

export const footerTabReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      return {
        activeTab: action.payload,
      };
    default:
      return state;
  }
};
