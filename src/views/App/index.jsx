import { Route } from 'react-router-dom';

import styles from './app.css';
import cn from '../../utils/classname';

import Header from '../Header';
import GifView from '../GifView';
import PhotoBooth from '../PhotoBooth';

const App = () =>
  <div className={cn(styles.container)}>
    <Header/>
    <div className={cn(styles.main)}>
      <Route path="/" exact component={PhotoBooth}></Route>
      <Route path="/gifview" exact component={GifView}></Route>
    </div>
  </div>;

export default App;
