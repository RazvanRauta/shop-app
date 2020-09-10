import { createStore, applyMiddleware, Store } from 'redux'
import { rootReducer } from './rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reduxThunk from 'redux-thunk'

let store: Store

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  )
} else {
  store = createStore(rootReducer, applyMiddleware(reduxThunk))
}

export default store
