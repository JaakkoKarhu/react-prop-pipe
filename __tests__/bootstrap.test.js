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
		console.log('****************', e.target.value, this)
		this.setState({
			value: e.target.value
		}, () => {
			console.log('JUMALAUTA', this.state)
		})
	}
	render() {
		console.log('RE RENDER', this.state.value)
		return (
			<FormGroup>
				<ControlLabel>This is a test input</ControlLabel>
			 	<FormControl onChange={ this.handleChange.bind(this) }
			 				 value={ this.state.value } />
			 	<div className="valueDisplay">	
			 		{ this.state.value}
			 	</div>
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
	const wrapper = mount( <Piped /> )
	expect(wrapper.find('.form-control').props().value).toBe('initial')
	wrapper.find('input').simulate('change', { target: {value: 'test value'}})
	console.log('Typing to Bootstrap input', '\n\n', beautify.html(wrapper.html()))
	//expect(wrapper.find('.form-control').getNode().state.value).toBe('test value')
})