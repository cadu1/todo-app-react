const INITIATE_STATE = {
    description: '',
    list: []
}

export default (state = INITIATE_STATE, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload }
        case 'TODO_ADDED':
        case 'TODO_CLEAR':
            return { ...state, description: '' }
        default:
            return state
    }
}