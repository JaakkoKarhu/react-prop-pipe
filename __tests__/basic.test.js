import React from 'react'
import { shallow, mount} from 'enzyme'
import PropPipe from '../src/index'
import beautify from 'js-beautify'
import { Comp,
         ElemInElem,
         CompInElem,
         CompInComp,
         CompStl,
         CompInElemStl,
         CompInCompStl,
         ArrInElemStl } from '../test-components/basic.js'

const testProps = { 'data-test-prop': 'foo' }

test('Basic component (stateful)', () => {
    const Piped = PropPipe(Comp, testProps)
    const wrapper = mount( <Piped passed="foo" /> )
    console.log('Basic component (stateful)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(1)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(1)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(1)
})

test('Elemen inside element (stateful)', ()=>{
    const Piped = PropPipe(ElemInElem, testProps)
    const wrapper = mount (<Piped />)
    console.log('Element inside of element (stateful)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
})

test('Component inside of element (stateful)', () => {
    const Piped = PropPipe(CompInElem, testProps)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of element (stateful)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(1)
})
test('Component inside of component (stateful)', () => {
    const Piped = PropPipe(CompInComp, testProps)
    const wrapper = mount ( <Piped passed="foo" />)
    console.log('Component inside of component (stateful)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(2)
})

test('Basic component (stateless)', () => {
    const Piped = PropPipe(CompStl, testProps)
    const wrapper = mount( <Piped passed="foo" /> )
    console.log('Basic component (stateless)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(1)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(1)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(1)
})

test('Component inside of element (stateless)', () => {
    const Piped = PropPipe(CompInElemStl, testProps)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of element (stateless)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(1) 
})

test('Component inside of component (stateless)', () => {
    const Piped = PropPipe(CompInCompStl, testProps)
    const wrapper = mount ( <Piped />)
    console.log('Component inside of component (stateless)', '\n\n', wrapper.html())
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(2)
})

test('Array of children inside of element (stateless)', () => {
    const Piped = PropPipe(ArrInElemStl, testProps)
    const wrapper = mount( <Piped passed="bar" /> )
    console.log('Array of children inside of element (stateless)', '\n\n', beautify.html(wrapper.html()))
    // Doesn't merge parent props to children
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(4)
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(3)
    expect(wrapper.find('[data-test-attr="bar"]').length).toBe(1)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(2)
    expect(wrapper.find('[data-test-passed="bar"]').length).toBe(1)
})
