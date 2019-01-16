const shows = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SHOWS':
      return action.shows;
      case 'REFRESH_LIST':
      return state;
    default:
      return state;
  }
}

export default shows