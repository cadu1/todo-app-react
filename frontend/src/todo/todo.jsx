import React, { Component } from 'react'

import PageHeader from '../template/header'
import Form from './todoForm'
import List from './todoList'

export default class Todo extends Component {
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                <Form />
                <List />
            </div>
        )
    }
}