const token = (state = null, action) => {
  switch (action.type) {
    case 'token/setToken':
      return action.data
    default:
      return state
  }
}

export default token
