import { createSlice } from '@reduxjs/toolkit'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
  },
  reducers: {
    setUser (state, { payload }) {
      state.id = payload
    },
    resetUser(state) {
      state.id = ''
    }
  },
})

export default userSlice.reducer

export const { setUser, resetUser } = userSlice.actions