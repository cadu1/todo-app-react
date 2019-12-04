import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import Button from '../template/button'
import { changeDescription, search, add, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(event) {
        const { add, search, description, clear } = this.props
        if (event.key === 'Enter') {
            event.shiftKey ? search() : add(description)
        } else if (event.key === 'Escape') {
            clear()
        }
    }

    render() {
        const { add, search, description } = this.props
        return (
            <div role='form' className='todoForm pb-60'>
                <Grid cols='12 9 10'>
                    <input type="text" id='description' className='form-control' placeholder='Adicione uma tarefa'
                        value={this.props.description}
                        onChange={this.props.changeDescription}
                        onKeyUp={this.keyHandler}
                        />
                </Grid>
                <Grid cols='12 3 2'>
                    <Button style='primary' icon='plus' onClick={() => add(description)} />
                    <Button style='info' icon='search' onClick={ search } />
                    <Button style='default' icon='remove' onClick={this.props.clear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispacth => bindActionCreators({ changeDescription, search, add, clear }, dispacth)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)