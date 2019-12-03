import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import Button from '../template/button'
import { changeDescription, search } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {
        this.props.search()
    }

    keyHandler(event) {
        if (event.key === 'Enter') {
            event.shiftKey ? this.props.handlerSearch() : this.props.handlerAdd()
        } else if (event.key === 'Escape') {
            this.props.handlerClear()
        }
    }

    render() {
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
                    <Button style='primary' icon='plus' onClick={this.props.handlerAdd} />
                    <Button style='info' icon='search' onClick={this.props.handlerSearch} />
                    <Button style='default' icon='remove' onClick={this.props.handlerClear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToProps = dispacth => bindActionCreators({ changeDescription, search }, dispacth)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)