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

const Stateless = () => {
    return (
        <div>
            <span ref='reffedy_ref' />
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
/*
*/