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
    if (typeof child.type == 'function') { // Component class
      const Child = MakeComp(child.type, child.props),
            PipedChild = PropPipe(Child)
      childrenArr[i] = <PipedChild />
    } else if (typeof child.type == 'string') { // Element
      childrenArr[i] = getPipedTarget(child.type, child.props)
    } else if (typeof child.type == undefined) {
      // is string
    }
  }
  if(typeof type=='function') { // IF THE WRAPPER IS A CLASS, WHAT THEN?
    const Piped = PropPipe(type)
    return React.createElement(Piped, props)
  } else {
    return React.createElement(type, props, childrenArr)
  }
}

const MakeComp = (Target, props) => {
  return class extends Target {
    constructor(props) {
      super(props)
    }
    render() {
      return (
        React.createElement(Target, props)
      )
    }
  }
}

const PropPipe = (Target, origin) => {
  //console.log('TARGET', !!Target.prototype.render, Target.name)
  if (!!Target.prototype.render) {
    return class PropPipe extends Target {
      constructor(props) {
        super(props)
        let pipedTarget
        const rComp = this.render(),
          { type } = rComp, // Prefix: r = rendered
          rProps = rComp.props
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
        console.log('TARGGET', Target({}))
        const target = Target({})
        let piped = getPipedTarget(target.type, target.props)
        this.render = () => {
          return(piped)
        }
      }
    }
  }
};

export default PropPipe;