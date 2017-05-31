import React from 'react';
let __COUNT = 0
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
            PipedChild = PropPipe(Child, 'CHILD')
      childrenArr[i] = <PipedChild />
    } else if (typeof child.type == 'string') { // Element
      console.log('STRING', child)
      childrenArr[i] = getPipedTarget(child.type, child.props)
    } else if (typeof child.type == undefined) {
      // is string
    }
  }
  if(typeof type=='function') { // IF THE WRAPPER IS A CLASS, WHAT THEN?
    console.log('WRAP', type)
    const _WAT = PropPipe(type, 'WRAP')
    return React.createElement(_WAT, props, childrenArr)
  } else {
    return React.createElement(type, props, childrenArr)
  }
}

const MakeComp = (Target, props) => {
  return class extends Target {
    constructor(props) {
      super(props)
      console.log('TESTTTT', Target)
    }
    render() {
      return (
        React.createElement(Target, props)
      )
    }
  }
}

const PropPipe = (Target, origin) => {
  __COUNT++
  return class PropPipe extends Target {
    constructor(props) {
      super(props)
      const renderedComp = this.render(),
            type = renderedComp.type,
            propsCp = { ...renderedComp.props }, // see if have to be cp
            pipedTarget = getPipedTarget(type, propsCp)
      if (propsCp['data-debug']) {
        console.log('debug', propsCp['data-debug'])
      }
      console.log('ORIGIN', origin, 'AFTR', renderedComp)
      this.render = () => {
        return(pipedTarget)
      }
    }
  }
};

export default PropPipe;