export default function templates(state = true, action) {
  switch (action.type) {
    case 'SET':
      return action.data;
      break;
    default:
      return state;
  }
};
