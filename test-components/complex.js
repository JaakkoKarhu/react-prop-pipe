import React from 'react'
import { Comp,
        // ElemInElem,
        // CompInElem,
        // CompInComp,
        CompStl,
        // CompInElemStl,
        CompInCompStl
} from '../test-components/basic.js'

class DeepNested extends React.Component {
	render() {
		return (
				<Comp passed={ this.props.passed}>
					<CompStl passed="bar">
						<Comp passed="baz">
							<CompInCompStl />
							Text
						</Comp>
					</CompStl>
				</Comp>
		)
	}
}

class WithMethods extends React.Component {
	testMethod() {
		console.log('Fired the test method. Lucky you.')
		return <Comp passed="foo">Text.</Comp>
	}
	render() {
		return(
			<div data-test-passed={ this.props.passed }>
				{ this.testMethod() }
			</div>
		)
	}
}

class HasRefs extends React.Component {
	clickHandler() {
		return(this.refs)
	}
	render() {
		return(
			<div ref="outer">
				<div className='clickThis' ref="inner" onClick={ this.clickHandler.bind(this) } />
			</div>
		)
	}
}

class Input extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 'initial'
		}
	}

	onChangeHandler(e) {
		console.log('ON CHANGE', e.target.value)
		this.setState({
			value: e.target.value
		})
	}

	render() {
		console.log('THIS STATE', this.state.value)
		return(
			<input value={ this.state.value }
				   onChange={ (e) => this.onChangeHandler(e) } />
		)
	}
}

class InnerInput extends React.Component {
	render() {
		return(
			<input value={ this.props.value }
				   onChange={ this.props.onChange } />
		)
	}
}

class WrappedInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 'initial'
		}
	}

	onChangeHandler(e) {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
			<InnerInput value={ this.state.value}
						onChange={ this.onChangeHandler } />
		)
	}
}

exports.DeepNested = DeepNested
exports.WithMethods = WithMethods
exports.HasRefs = HasRefs
exports.Input = Input
exports.WrappedInput = WrappedInput