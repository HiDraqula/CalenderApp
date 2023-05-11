import { configureStore } from '@reduxjs/toolkit'
import appReducer from './services/appReducer'
const store = configureStore({
  reducer: {
    app: appReducer
  },
})


export default store
export const dispatch = store.dispatch 