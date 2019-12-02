import React from 'react'
import Button from '../template/button'
import { connect } from 'react-redux'

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
                        onClick={() => props.handlerMarkAsDone(todo)}
                        hide={todo.done}
                        />
                    <Button
                        style='warning'
                        icon='undo'
                        onClick={() => props.handlerMarkAsPending(todo)}
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

export default connect(mapStateToProps)(TodoList)