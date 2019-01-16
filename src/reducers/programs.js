const programs = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PROGRAMS':
      return action.programs;
      case 'REFRESH_LIST':
      return state;
    default:
      return state;
  }
}

export default programs