export default function template(state = true, action) {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return action.data;
      break;
    default:
      return state;
  }
};
