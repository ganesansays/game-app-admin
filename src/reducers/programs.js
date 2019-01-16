const programs = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROGRAMS_SUCCESS':
      return action.programs;
    default:
      return state;
  }
}

export default programs