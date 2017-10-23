import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './gifview.css';
import cn from '../../utils/classname';

class GifView extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={'SlideIn'}
        >
          <div>
            <p className={cn(styles.text)}>GifView</p>
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default GifView;
