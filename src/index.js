import React from 'react'

const handleCloning = (target) => {
	// console.log('TARGET', target)
	const children = handleChildren(target.props.children)
	const addedProps = { 'data-test-foo': 'bar' }
	console.log('HANDLE CLONING')
	if (typeof target.type=='string') {
		return React.cloneElement(
			target,
			{ ...target.props, ...addedProps },
			children
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
  		console.log('STRING CHILD')
  		return child
  	} else {
  		console.log('CHILD UNHANDLED')
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