import { configureStore } from '@reduxjs/toolkit'

import authSlice from './authSlice'
import userSlice from './userSlice'
import eventSlice from './eventSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    event: eventSlice
  }
})

export default store
