import React from 'react';

const getPipedTarget = (type, props) => {
  console.log('PRÅPS', props)
  let children
  props = props
  ? { ...props, className: props.className + ' red' }
  : null

  if (Array.isArray(props.children))  { // multiple
    children = [ ...props.children ]
    for (let i in children) {
      const child = children[i]
      children[i] = handleChild(child)
    }
  } else if (props.children) { // single
    children = handleChild(props.children)
  }
  if(typeof type=='function') {
    const Piped = PropPipe(type)
    return <Piped { ...props } />
  } else {
    const Elem = type
    return <Elem { ...props }>{children}</Elem>
  }
}

const handleChild = (child) => {
  if (!child) return
  if (isStateless(child.type)) { // Stateless component
    const Piped = PropPipe(child.type)
    return <Piped { ...child.props }/>
  } else if (typeof child.type == 'function') { // Stateful component
    const Child = MakeComp(child.type, child.props),
          PipedChild = PropPipe(Child)
    return <PipedChild />
  } else if (typeof child.type == 'string') { // Element
    return getPipedTarget(child.type, child.props)
  } else {
    return child
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
        const target = Target(props || {}),
              piped = getPipedTarget(target.type, target.props)
        this.render = () => {
          return(piped)
        }
      }
    }
  }
};

export default PropPipe;