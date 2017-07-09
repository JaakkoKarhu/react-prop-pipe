import React from 'react'
import { shallow, mount} from 'enzyme'
import PropPipe from '../src/index'

class Comp extends React.Component {
    render () {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

class CompInsideElem extends React.Component {
    render() {
        return (
            <div>
                <Comp/>
            </div>
        )
    }
}

class CompInsideComp extends React.Component {
    render() {
        return (
            <Comp>
                <Comp />
            </Comp>
        )
    }
}

const CompStl = (props) => {
    return (
        <div>
            { props.children }
        </div>
    )
}

const CompInsideElemStl = (props) => {
    return (
        <div>
            <CompStl />
        </div>
    )
}

const CompInsideCompStl = (props) => {
    return (
        <CompStl>
            <CompStl />
        </CompStl>
    )
}

const ArrInsideElemStl = (props) => {
    return (
        <div>
            <p>Test paragraph</p>
            <Comp />
            <CompInsideElemStl />
            Plain text
        </div>
    )
}


test('Basic component (stateful)', () => {
    const Piped = PropPipe(Comp)
    const wrapper = mount( <Piped /> )
    console.log('Basic component (stateful)', '\n\n', wrapper.html())
})

test('Component inside of element (stateful)', () => {
    const Piped = PropPipe(CompInsideElem)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of element (stateful)', '\n\n', wrapper.html())
})

test('Component inside of component (stateful)', () => {
    const Piped = PropPipe(CompInsideComp)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of component (stateful)', '\n\n', wrapper.html())
})

test('Basic component (stateless)', () => {
    const Piped = PropPipe(CompStl)
    const wrapper = mount( <Piped /> )
    console.log('Basic component (stateless)', '\n\n', wrapper.html())
})

test('Component inside of element (stateless)', () => {
    const Piped = PropPipe(CompInsideElemStl)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of element (stateless)', '\n\n', wrapper.html())
})

test('Component inside of component (stateless)', () => {
    const Piped = PropPipe(CompInsideCompStl)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of component (stateless)', '\n\n', wrapper.html())
})

test('Array of children inside of element (stateless)', () => {
    const Piped = PropPipe(ArrInsideElemStl)
    const wrapper = mount( <Piped /> )
    console.log('Array of children inside of element (stateless)', '\n\n', wrapper.html())
})

/*

*/