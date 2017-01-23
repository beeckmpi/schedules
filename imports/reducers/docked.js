export default function docked(state = true, action) {
  switch (action.type) {
    case 'SHOW_DOCK':
      return true;
      break;
    case 'HIDE_DOCK':
      return false;
    default:
      return state;
  }
};
