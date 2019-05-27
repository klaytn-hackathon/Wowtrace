

import { fromJS } from 'immutable'
import { SHOW_LOADING, HIDE_LOADING } from './constants'

export const initialState = fromJS({
  isShow: false
})

function ownerReducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return state.set('isShow', true)
    case HIDE_LOADING:
      return state
        .set('isShow', false)
    default:
      return state
  }
}

export default ownerReducer
