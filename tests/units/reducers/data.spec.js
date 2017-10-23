import test from 'tape';
import data from '../../../src/reducers/data';
import actions from '../../../src/actions';

/* Very basic unit test, just testing the initial application state, run "npm test" to see the output */

test('reducers/data - initial state', t => {
  t.plan(1);
  const outcome = data(undefined, {});
  t.equal(typeof outcome, 'object');
});
