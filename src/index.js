import React from 'react';

const getPipedTarget = (type, props={}, pipedProps, filter) => {
  let children
  // Error handling here to chedk if pipedProps exist
  props = filter(type, props)
  ? { ...props, ...pipedProps }
  : { ...props }

  if (Array.isArray(props.children))  { // multiple
    children = [ ...props.children ]
    for (let i in children) {
      const child = children[i]
      children[i] = handleChild(child, pipedProps, filter)
    }
  } else if (props.children) { // single
    children = handleChild(props.children, pipedProps, filter)
  }
  if(typeof type=='function') {
    const Piped = PropPipe(type, pipedProps, filter)
    return <Piped { ...props } />
  } else {
    const Elem = type
    return <Elem { ...props } children={ children } />
  }
}

const handleChild = (child, pipedProps, filter) => {
  if (!child) return
  if (isStateless(child.type)) { // Stateless component
    const Piped = PropPipe(child.type, pipedProps, filter)
    return <Piped { ...child.props }/>
  } else if (typeof child.type == 'function') { // Stateful component
    const Child = MakeComp(child.type, child.props),
          PipedChild = PropPipe(Child, pipedProps, filter)
    return <PipedChild />
  } else if (typeof child.type == 'string') { // Element
    return getPipedTarget(child.type, child.props, pipedProps, filter)
  } else {
    return child
  }
}

const isStateless = (C) =>  C&&C.prototype&&!C.prototype.render || false

const MakeComp = (Target, props) => class extends Target {
  render = () => <Target { ...props } />
}

const PropPipe = (Target, pipedProps={}, filter=() => true) => {
  if (!!Target.prototype.render) {
    return class PropPipe extends Target {
      constructor(props) {
        super(props)
        const rComp = this.render(),
              { type } = rComp, // Prefix: r = rendered
              rProps = rComp.props,
              pipedTarget = getPipedTarget(type, rProps, pipedProps, filter)
        this.render = () => {
          return(pipedTarget)
        }
      }
    }
  } else {
    return class extends React.Component {
      constructor(props) {
        super(props)
        const target = Target(props || {}),
              piped = getPipedTarget(target.type, target.props, pipedProps, filter)
        this.render = () => {
          return(piped)
        }
      }
    }
  }
};

export default PropPipe;