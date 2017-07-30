import PropPipe from '../../src';
import React from 'react';
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'

import './style.css'

class FieldGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'initial'
        }
    }
    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }
    render() {
        console.log('Value on render', this.state.value)
        return (
            <FormGroup>
                <ControlLabel>{ this.state.value }</ControlLabel>
                <FormControl onChange={ this.handleChange.bind(this) }
                             value={ this.state.value } />
            </FormGroup>
        );  
    }
}

const Piped = PropPipe(FieldGroup, { 'data-test-prop': 'foo' })
class App extends React.Component {
    render() {
        return(
          <div>
            <h1>App</h1>
            <Piped />
          </div>
        )
    }
}   

export default App;