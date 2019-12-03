import axios from 'axios'

const url = 'http://localhost:3003/api/todo'

export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    const request = axios.get(`${url}?sort=-createdAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
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