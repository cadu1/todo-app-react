import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/header'
import Form from './todoForm'
import List from './todoList'

const url = 'http://localhost:3003/api/todo'

export default class Todo extends Component {
    constructor(props) {
        super(props)

        this.state = {description: '', list: []}
        this.handlerAdd = this.handlerAdd.bind(this)
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerRemove = this.handlerRemove.bind(this)
        this.handlerMarkAsDone = this.handlerMarkAsDone.bind(this)
        this.handlerMarkAsPending = this.handlerMarkAsPending.bind(this)
        this.handlerSearch = this.handlerSearch.bind(this)
        this.handlerClear = this.handlerClear.bind(this)
        this.refreshList = this.refreshList.bind(this)

        this.refreshList()
    }

    handlerAdd() {
        const description = this.state.description
        axios.post(url, {description})
            .then(resp => this.refreshList())
    }

    handlerChange(event) {
        this.setState({...this.setState, description: event.target.value})
    }

    handlerRemove(todo) {
        axios.delete(`${url}/${todo._id}`)
            .then(resp => this.refreshList(this.state.description))
    }

    handlerMarkAsDone(todo) {
        axios.put(`${url}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refreshList(this.state.description))
    }

    handlerMarkAsPending(todo) {
        axios.put(`${url}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refreshList(this.state.description))
    }

    handlerSearch() {
        this.refreshList(this.state.description)
    }

    handlerClear() {
        this.setState({description: ''});
        this.refreshList()
    }

    refreshList(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${url}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <Form
                    handlerAdd={this.handlerAdd}
                    description={this.state.description}
                    handlerChange={this.handlerChange}
                    handlerSearch={this.handlerSearch}
                    handlerClear={this.handlerClear}
                    />
                <List
                    list={this.state.list}
                    handlerRemove={this.handlerRemove}
                    handlerMarkAsDone={this.handlerMarkAsDone}
                    handlerMarkAsPending={this.handlerMarkAsPending}
                    />
            </div>
        )
    }
}