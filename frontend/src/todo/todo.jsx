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
            .then(resp => this.refreshList())
    }

    refreshList() {
        axios.get(`${url}?sort=-createdAt`)
            .then(resp => this.setState({...this.state, description: '', list: resp.data}))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <Form handlerAdd={this.handlerAdd} description={this.state.description} handlerChange={this.handlerChange} />
                <List list={this.state.list} handlerRemove={this.handlerRemove} />
            </div>
        )
    }
}