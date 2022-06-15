import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import token from './token'
import user from './user'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (e) {
    console.error(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state')
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    console.error(e)
    return undefined
  }
}

const rootReducer = combineReducers({
  token,
  user
})

const persistedStore = loadFromLocalStorage()

const store = createStore(rootReducer, persistedStore)

store.subscribe(() => {
  const { token } = store.getState()
  saveToLocalStorage({ token })
})

export default store
