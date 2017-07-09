import React from 'react'

const isStateless = (C) =>  C&&C.prototype&&!C.prototype.render || false

const handleCloning = (target) => {
	const children = handleChildren(target.props.children)
	return React.cloneElement(
		target,
		{ ...target.props, 'data-test-foo': 'bar' },
		children
	)
}

const handleChildren = (children) => { // Do I even need those props here
	// Clone the children? Figure out the type?	
	if (Array.isArray(children)) {
		return children.map((child) => {
			handleChild(child)
		})
	} else if (children) {
		return handleChild(children)
	}
}

const handleChild = (child) => {
	if (typeof child.type == 'string') { // Element
		//console.log('CHILD BEFORE CLONING', child)
		const wut = handleCloning(child)
		//console.log('AFTER CLONING', wut)
		return handleCloning(child)
  	} else {
  		console.log('CHILD', child)
  	}
}

const PropPipe = (Target, pipedProps={}, filter=() => true) => {

	class Piped extends React.Component {
		constructor(props, context) {
			super(props)
			const { render } = Target.prototype
			let target = !!render ? render() : Target(props || {})
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