import React from 'react'
import { shallow } from 'enzyme'

const handleCloning = (target, pipedProps) => {
	console.log('HANDLE CLONING: TARGET TYPE:', target.type)
	const children = handleChildren(target.props.children, pipedProps)
	console.log('HANDLE CLONING:', 'CHILDREN:', !!children)
	if (typeof target.type=='string') {
		return React.cloneElement(
			target,
			{ ...target.props, ...pipedProps, children: children }
		)
	} else if (typeof target.type == 'function') {
		//console.log('TARGET TYPE IS FUNCTION', target)
		//const Target = React.createElement(PropPipe(target.type, { ...target.props, ...pipedProps }, children))
		const Target = target.type
		console.log(pipedProps)
		return <Target { ...pipedProps }>{ children }</Target>
	}
}

const handleChildren = (children, pP) => { // Do I even need those props here
	// Clone the children? Figure out the type?	
	if (Array.isArray(children)) {
		return children.map( (child) => handleChild(child, pP) )
	} else if (children) {
		return handleChild(children, pP)
	}
}

const handleChild = (child, pP) => {
	if (!child) {
		return child
	} else if (typeof child == 'string') {
 		console.log('HANDLE CHILD: IS STRING')
  		return child
  	} else if(typeof child.type == 'string') { // element
  		console.log('HANDLE CHILD: IS ELEMENT')
  		// Tsekkaa, onko tässä child.typen rendauksessa eroa
  		//console.log('PROTOTYPE', child.type.prototype.render.call(this))
  		return handleCloning(child, { ...pP })
  	} else if(typeof child.type == 'function') { // component
  		console.log('HANDLE CHILD: IS COMPONENT')
  		const Child = child.type
  		// Do I need to merge the props here
  		const wrapper = shallow(<Child { ...child.props }/>)
  		//return handleCloning(target, pP)
  		return handleCloning(wrapper.getNode(), pP)
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
			// THIS IS MAKING DIFF BETWEEN STATEFUL, STATELESS
			console.log('HAS RENDER', !!render, Target.type)
			//const whySerious = { ...props, ...pipedProps, 'data-vittu': 'lol' }
			const wrapper = shallow(<Target { ...props } />)
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