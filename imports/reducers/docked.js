export default function docked(state = 'SHOW', action) {
  switch (action.type) {
    case 'SHOW_DOCK':
      return 'SHOW';
      break;
    case 'HIDE_DOCK':
      return 'HIDDEN';
    default:
      return state;
  }
};
