const user = (state = {}, action) => {
  switch (action.type) {
    case 'user/setData':
      return {
        ...action.data
      }
    default:
      return state
  }
}

export default user
