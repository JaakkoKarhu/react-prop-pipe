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

const PipedNestedBoxes = PropPipe(NestedBoxes)
const PipedMultiple = PropPipe(MultipleNested)

const App = () => (
  <div>
    <PipedMultiple />
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