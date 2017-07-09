import React from 'react'
import { shallow, mount} from 'enzyme'
import PropPipe from '../src/index'

class Comp extends React.Component {
    render () {
        return (
            <div ref='trol'>
                <p ref='lol'>lol</p>
            </div>
        )
    }
}

class Nested extends React.Component {
    render() {
        return (
            <Comp>

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
    const wrapper = mount(
        <Piped />
    )
    console.log('Nested component (stateful)', '\n\n', wrapper.html())
})

test('Nested component (stateful)', ()=> {
    const Piped = PropPipe(Nested)
    const wrapper = mount(
        <Piped />
    )
    console.log('Nested component (stateful)', '\n\n', wrapper.html())
})

test ('Stateless component', () => {
    const Piped = PropPipe(Stateless)
    const wrapper = mount(
        <Piped />
    )
    console.log('Stateless component', '\n\n', wrapper.html())
})