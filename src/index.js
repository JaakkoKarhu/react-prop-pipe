import React from 'react'
import { shallow } from 'enzyme'

const handleCloning = (target, pipedProps) => {
	const children = handleChildren(target.props.children, pipedProps)
	if (typeof target.type=='string') {
		return React.cloneElement(
			target,
			{ ...target.props, ...pipedProps, children: children }
		)
	}
}

const handleChildren = (children, pP) => {
	if (Array.isArray(children)) {
		return children.map( (child) => handleChild(child, pP) )
	} else if (children) {
		return handleChild(children, pP)
	}
}

/* This function is not actually anymore only for handling the children,
 * but like... unwrapping the components for so long that they
 * become only elements or strings. So don't let the term child
 * confuse here
 */
const handleChild = (child, pP) => {
	if (!child) {
		return child
	} else if (typeof child == 'string') {
  		return child
  	} else if(typeof child.type == 'string') { // Is element
  		return handleCloning(child, { ...pP })
  	} else if(typeof child.type == 'function') { // Is component
  		const Child = child.type
  		const wrapper = shallow(<Child { ...child.props }/>)
  		return handleChild(wrapper.getNode(), pP)
  	} else {
  		console.warn('HANDLE CHILD: Did not find type of the children. Returning default.')
  		return child
  	}
}

const PropPipe = (Target, pipedProps={}, filter=() => true) => {

	class Piped extends React.Component {
		constructor(props, context) {
			super(props)
			const { render } = Target.prototype
			const wrapper = shallow(<Target { ...props } />)
			// If stateless or not
			const target= !!render ? wrapper.getNode() : Target({ ...props })
			this.ForRender = handleChild(target, pipedProps)
		}

		render() {
			const { ForRender } = this
			return ForRender
		}
	}
	return Piped
}

export default PropPipe