import React from 'react'
import PropPipe from '../src/index'
import beautify from 'js-beautify'
import { shallow, mount} from 'enzyme'
import {
	DeepNested,
	WithMethods,
	HasRefs
} from '../test-components/complex.js'

const testProps = { 'data-test-prop': 'foo' }

test('Deep nested component', () => {
	const Piped = PropPipe(DeepNested, testProps)
    const wrapper = mount( <Piped passed="foo" /> )
    console.log('Deep nested component', '\n\n', beautify.html(wrapper.html()))
    expect(wrapper.find('[data-test-prop="foo"]').length).toBe(5)
	expect(wrapper.find('[data-test-attr="foo"]').length).toBe(5)
    expect(wrapper.find('[data-test-passed="foo"]').length).toBe(3)
    expect(wrapper.find('[data-test-passed="bar"]').length).toBe(1)
    expect(wrapper.find('[data-test-passed="baz"]').length).toBe(1)
})

test('With methods', () => {
	const Piped = PropPipe(WithMethods, testProps)
	const wrapper = mount( <Piped passed="bar" />)
	expect(wrapper.find('[data-test-prop="foo"]').length).toBe(2)
	expect(wrapper.find('[data-test-passed="foo"]').length).toBe(1)
    expect(wrapper.find('[data-test-passed="bar"]').length).toBe(1)
    expect(wrapper.find('[data-test-attr="foo"]').length).toBe(1)
	console.log('With methods', '\n\n', beautify.html(wrapper.html()))
})

test('Has refs', () => {
	const Piped = PropPipe(HasRefs, testProps)
	const wrapper = mount( <Piped /> )
	console.log('Has refs', '\n\n', beautify.html(wrapper.html()))
	expect(wrapper.find('.clickThis').length).toBe(1)
	expect(wrapper.find('.clickThis').simulate('click'))
	expect(wrapper.getNode().refs.inner).toBeTruthy()
	expect(wrapper.getNode().refs.outer).toBeTruthy()
})