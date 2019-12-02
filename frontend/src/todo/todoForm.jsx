import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import Button from '../template/button'
import { changeDescription } from './todoActions'

const TodoForm = props => {
    const keyHandler = (event) => {
        if (event.key === 'Enter') {
            event.shiftKey ? props.handlerSearch() : props.handlerAdd()
        } else if (event.key === 'Escape') {
            props.handlerClear()
        }
    }

    return (
        <div role='form' className='todoForm pb-60'>
            <Grid cols='12 9 10'>
                <input type="text" id='description' className='form-control' placeholder='Adicione uma tarefa'
                    value={props.description}
                    onChange={props.changeDescription}
                    onKeyUp={keyHandler}
                    />
            </Grid>
            <Grid cols='12 3 2'>
                <Button style='primary' icon='plus' onClick={props.handlerAdd} />
                <Button style='info' icon='search' onClick={props.handlerSearch} />
                <Button style='default' icon='remove' onClick={props.handlerClear} />
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispacth => bindActionCreators({ changeDescription }, dispacth)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)