import React from 'react';
import { shallow, mount } from 'enzyme';
import PropPipe from '../src/index';

class Comp extends React.Component {
    render() {
        return <div data-hold-this="ok">{this.props.children}</div>
    }
}

class NestedComp extends React.Component {
    render() {
        return (
            <Comp>
                <div className='nested' />
            </Comp>
        )
    }
}

const StatelessComp = (props) => {
    return(
        <div>{props.children}</div>
    )
}

const NestedStatelessComp = (props) => {
    return(
        <StatelessComp>
            <div />
        </StatelessComp>
    )
}

const Complex = () => {
    return(
        <span>
            <Comp>
                <div />
            </Comp>
            <Comp />
            <div />
            Just text.
        </span>
    )
}

const FilterComp = () => {
    return(
        <div className='data-needs-foo'>
            <Comp>
                <div className='data-needs-foo' />
            </Comp>
            <div />
        </div>
    )
}

test('Pipe stateful', () => {
    const Piped = PropPipe(Comp, { 'data-foo': 'bar' })
    const wrapper = shallow(
        <Piped />
    );
    expect(wrapper.prop('data-foo')).toBe('bar')
});

test('Pipe nested stateful', () => {
    const Piped = PropPipe(NestedComp, {'data-foo': 'bar'})
    const wrapper = mount(
        <Piped />
    );
    expect(wrapper.find('div').length).toBe(2)
    expect(wrapper.find('[data-foo="bar"]').length).toBe(2)
})

test('Pipe stateless', () => {
    const Piped = PropPipe(StatelessComp, {'data-foo': 'bar'})
    const wrapper = mount(
        <Piped />
    )
    expect(wrapper.find('div').length).toBe(1)
    expect(wrapper.find('[data-foo="bar"]').length).toBe(1)
})

test('Pipe nested stateless', () => {
    const Piped = PropPipe(NestedStatelessComp, {'data-foo': 'bar'})
    const wrapper = mount(
        <Piped />
    )
    expect(wrapper.find('div').length).toBe(2)
    expect(wrapper.find('[data-foo="bar"]').length).toBe(2)
})

test('Pipe complex component (stateless)', () => {
    const Piped = PropPipe(Complex, { 'data-foo': 'bar'})
    const wrapper = mount(
        <Piped />
    )
    expect(wrapper.find('div').length).toBe(4)
    expect(wrapper.find('[data-foo="bar"]').length).toBe(5)
})

test('Pipe to filtered components (stateless)', () => {
    const filter = (type, props={}) => {
        if (props.className=='data-needs-foo') {
            return true
        } else {
            return false
        }
    }
    const Piped = PropPipe(FilterComp, {'data-foo': 'bar'}, filter)
    const wrapper = mount(
        <Piped />
    )

    expect(wrapper.find('div').length).toBe(4)
    expect(wrapper.find('[data-foo="bar"]').length).toBe(2)

})