import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './views/App';
import store from './store';

render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('app'));
