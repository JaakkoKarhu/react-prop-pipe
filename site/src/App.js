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

const passMeProps = (WrappedComponent) => {
   class LoggerWrap extends React.Component {
     render() {
       return (
         <WrappedComponent greeting={'Yo!'}/>
       )
     }
   }
   return LoggerWrap
}

const Stateless = ({props, children}) => (
  <div className='box'>
    <div className='box_2'>
      ___FINAL___
    </div>
  </div>
)

const NestedStateless = ({props, children}) => (
  <div className='box'>
    <div className='box'>
      <Stateless />
      ___FIRST___
    </div>
  </div>
)
const PipedNestedBoxes = PropPipe(NestedBoxes)
const PipedMultiple = PropPipe(MultipleNested)
const PipedComplex = PropPipe(Complex)
const PipedStateless = PropPipe(Stateless)
const PipedNestedStateless = PropPipe(NestedStateless)


const App = () => (
  <div>
    <section>
      <PipedNestedStateless />
    </section>
    <section>
      <PipedStateless />
    </section>
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
        div => String,
               Component (div => div) => div => String,
               Component (div => div) => Component (div => div) => String,
               div => String
      </p>
      <PipedComplex />
    </section>
    <section>
      <p>
      </p>
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