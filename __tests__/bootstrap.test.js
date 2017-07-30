import React from 'react'
import { mount, render } from 'enzyme'
import beautify from 'js-beautify'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import PropPipe from '../src/index';

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
			 	<FormControl onChange={ this.handleChange.bind(this) }
			 				 value={ this.state.value } />
			</FormGroup>
		);	
	}
}

const testProps = { 'data-test-prop': 'foo' }

test('Basic Bootstrap', () => {
	const Piped = PropPipe(FieldGroup, testProps)
	const wrapper = mount( <Piped /> )
	console.log('Basic Bootstrap', '\n\n', beautify.html(wrapper.html()))
})

test('Typing to Bootstrap input', () => {
	const Piped = PropPipe(FieldGroup, testProps)
	const wrapper = ( <Piped /> )
	expect(wrapper.find('.form-control').props().value).toBe('initial')
	wrapper.find('input').simulate('change', { target: {value: 'test value'}})
	console.log('Typing to Bootstrap input', '\n\n', beautify.html(wrapper.html()))
})