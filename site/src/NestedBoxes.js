import React from 'react';

class NestedBoxes extends React.Component {

  render() {
    return (
      <div className='box _1'>
        <div className='box _2'>
            { this.props.children }
        </div>
      </div>
    )
  }
};
  
export default NestedBoxes