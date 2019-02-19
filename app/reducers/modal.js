import genId from 'lib/utils/genId'

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = {
  modals: []
}

// ------------------------------------
// Constants
// ------------------------------------
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// ------------------------------------
// Actions
// ------------------------------------
export function openModal(type) {
  const modal = {
    id: genId(),
    type
  }
  return {
    type: OPEN_MODAL,
    modal
  }
}

export function closeModal(id) {
  return {
    type: CLOSE_MODAL,
    id
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [OPEN_MODAL]: (state, { modal }) => ({
    ...state,
    modals: [...state.modals, modal]
  }),
  [CLOSE_MODAL]: (state, { id }) => {
    if (id) {
      return {
        ...state,
        modals: state.modals.filter(item => item.id !== id)
      }
    }
    return {
      ...state,
      modals: [...state.modals.slice(0, -1)]
    }
  }
}

// ------------------------------------
// Selectors
// ------------------------------------

const modalSelectors = {}
modalSelectors.getModalState = state => state.modal.modals

export { modalSelectors }

// ------------------------------------
// Reducer
// ------------------------------------
export default function modalReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
