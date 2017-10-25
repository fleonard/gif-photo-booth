import React from 'react';

import styles from './gifview.css';
import cn from '../../utils/classname';

class GifView extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className={cn(styles.text)}>GifView</p>
      </div>
    );
  }
}

export default GifView;
