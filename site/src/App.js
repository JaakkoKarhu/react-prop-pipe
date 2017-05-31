/* TODOS:
 *
 * -Scenarios:
 *
 * - Class holds a class
 * - Class holds an element
 * - Class holds array
 *
 * Tests:
 *
 * - Class with class passes down the props
 * - Class with class renders other children
 * - Class with element passes down the props
 * - Class with element renders other children
 */

import NestedBoxes from './NestedBoxes'
import PropPipe from '../../src';
import React from 'react';

import './style.css'

class MultipleNested extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <NestedBoxes>
        <NestedBoxes>
          ____FINAL____
        </NestedBoxes>
      </NestedBoxes>
    )
  }
}

class Complex extends React.Component {
  render() {
    return (
      <div className='box'>
        ___TEXT___
        <NestedBoxes>
          <div className='yellow'>
            ___MORE___
          </div>
          <NestedBoxes>
            <NestedBoxes>
              ___FINAL___
            </NestedBoxes>
          </NestedBoxes>
        </NestedBoxes>
        <div className='box'>
          Just a div
        </div>
      </div>
    )
  }
}

const PipedNestedBoxes = PropPipe(NestedBoxes)
const PipedMultiple = PropPipe(MultipleNested)
const PipedComplex = PropPipe(Complex)

const App = () => (
  <div>
    <section>
      <p>
        Component (div => div) ) => String
      </p>
    <PipedNestedBoxes>
      ____FINAL____
    </PipedNestedBoxes>
    </section>
    <section>
      <p>
        Component (div => div ) => Component ( div => div) => String
      </p>
      <PipedMultiple />
    </section>
    <section>
      <p>
        Component (div => div ) => Component ( div => div) => String
      </p>
      <PipedComplex />
    </section>
  </div>
);

export default App;

    //<MultipleNested />

/*

    <NestedBoxes>
      First (and only) component
    </NestedBoxes>
    <PipedNestedBoxes />

*/