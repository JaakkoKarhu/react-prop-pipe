import React from 'react'
import { shallow } from 'enzyme'

const handleCloning = (target) => {
	console.log('TARGET', target.props)
	const children = handleChildren(target.props.children)
	const addedProps = { 'data-test-foo': 'bar' }
	if (typeof target.type=='string') {
		return React.cloneElement(
			target,
			{ ...target.props, ...addedProps, children: children }
		)
	} else if (typeof target.type == 'function') {
		const Target = React.createElement(PropPipe(target.type), { ...target.props, ...addedProps })
		return Target
	}
}

const handleChildren = (children) => { // Do I even need those props here
	// Clone the children? Figure out the type?	
	if (Array.isArray(children)) {
		return children.map( (child) => handleChild(child) )
	} else if (children) {
		return handleChild(children)
	}
}

const handleChild = (child) => {
 	if (typeof child == 'string') {
  		return child
  	} else {
  		return handleCloning(child)
  	}
}

const PropPipe = (Target, pipedProps={}, filter=() => true) => {

	class Piped extends React.Component {
		constructor(props, context) {
			super(props)
			const { render } = Target.prototype
			// does 'this' here cause maybe losing some attributes later on?
			let target = !!render ? render.call(this) : Target(props || {})
			console.log('PASSED TARGET', target)
			console.log('ORIGINAL TARGET', Target)
			const wrapper = shallow(<Target />)
			console.log('ENZYMED TARGET', wrapper.getNode())
			this.ForRender = handleCloning(target)
		}

		render() {
			const { ForRender } = this
			return ForRender
		}
	}
	return Piped
}

export default PropPipe