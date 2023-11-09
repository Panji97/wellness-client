// userSlice.ts
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { data: [], dataAll: [], loading: 'idle' },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    },
    setAllUser: (state, action) => {
      state.dataAll = action.payload
    }
  }
})

export const { setUser, setAllUser } = userSlice.actions

export default userSlice.reducer
