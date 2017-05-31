import React from 'react';

const getPipedTarget = (type, props) => {

  let childrenArr = []
  props = props
  ? { ...props, className: props.className + ' red' }
  : null

  if (Array.isArray(props.children))  {
    childrenArr = [ ...props.children ] // multiple children
  } else if (props.children) {
    childrenArr.push(props.children) // one children
  }
  for (let i in childrenArr) {
    const child = childrenArr[i]
    if (isStateless(child.type)) { // Stateless component
      childrenArr[i] = PropPipe(child.type)
    } else if (typeof child.type == 'function') { // Stateful component
      const Child = MakeComp(child.type, child.props),
            PipedChild = PropPipe(Child)
      childrenArr[i] = <PipedChild />
    } else if (typeof child.type == 'string') { // Element
      childrenArr[i] = getPipedTarget(child.type, child.props)
    }
  }
  if(typeof type=='function') { // IF THE WRAPPER IS A CLASS, WHAT THEN?
    const Piped = PropPipe(type)
    return <Piped { ...props } />
  } else {
    const Elem = type
    return <Elem { ...props }>{childrenArr}</Elem>
  }
}

const isStateless = (C) =>  C&&C.prototype&&!C.prototype.render || false

const MakeComp = (Target, props) => class extends Target {
  render = () => <Target { ...props } />
}

const PropPipe = (Target, origin) => {
  if (!!Target.prototype.render) {
    return class PropPipe extends Target {
      constructor(props) {
        super(props)
        const rComp = this.render(),
          { type } = rComp, // Prefix: r = rendered
          rProps = rComp.props,
          pipedTarget = getPipedTarget(type, rProps)
        this.render = () => {
          return(pipedTarget)
        }
      }
    }
  } else {
    return class extends React.Component {
      constructor(props) {
        super(props)
        const target = Target({}),
              piped = getPipedTarget(target.type, target.props)
        this.render = () => {
          return(piped)
        }
      }
    }
  }
};

export default PropPipe;