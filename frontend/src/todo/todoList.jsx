import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Button from '../template/button'
import { markAsDone, markAsPending } from './todoActions'

const TodoList = props => {
    const renderRow = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id} className={todo.done ? 'task-done' : ''}>
                <td>{todo.description}</td>
                <td>
                    <Button
                        style='success'
                        icon='check'
                        onClick={() => props.markAsDone(todo)}
                        hide={todo.done}
                        />
                    <Button
                        style='warning'
                        icon='undo'
                        onClick={() => props.markAsPending(todo)}
                        hide={!todo.done}
                        />
                    <Button style='danger' icon='trash-o' onClick={() => props.handlerRemove(todo)} />
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th className="table-action">Action</th>
                </tr>
            </thead>
            <tbody>
                {renderRow()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)