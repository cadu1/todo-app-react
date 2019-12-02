const INITIATE_STATE = {
    description: 'Task',
    list: [{
        _id: 1,
        description: 'Task 1',
        done: true
    }, {
        _id: 2,
        description: 'Task 2',
        done: false
    }, {
        _id: 3,
        description: 'Task 3',
        done: false
    }]
}

export default (state = INITIATE_STATE, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        default:
            return state
    }
}