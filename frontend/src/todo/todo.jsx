import React from 'react'

import PageHeader from '../template/header'
import Form from './todoForm'
import List from './todoList'

export default prop => (
    <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <Form />
        <List />
    </div>
)