import axios from 'axios'

const url = 'http://localhost:3003/api/todo'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''

        axios.get(`${url}?sort=-createdAt${search}`)
            .then(
                resp => dispatch({
                    type: 'TODO_SEARCHED',
                    payload: resp.data
                })
            )
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(`${url}`, { description })
            .then((resp) => dispatch({
                type: 'TODO_ADDED',
                payload: resp.data
            }))
            .then((resp) => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${url}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${url}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${url}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{
        type: 'TODO_CLEAR'
    }, search()]
}