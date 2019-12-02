import { combineReducers } from 'redux'

const rootReducers = combineReducers({
    todo: () => ({
        description: 'Tasks',
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
    })
})

export default rootReducers