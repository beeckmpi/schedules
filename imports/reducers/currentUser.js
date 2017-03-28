export default function currentUser(state = true, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
      break;
    default:
      return state;
  }
};
