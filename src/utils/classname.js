import { compose, cond, filter, identity, is, join, keys, map, T } from 'ramda';

const processArray = compose(join(' '), filter(identity), map(x => classname(x)));

const processObj = compose(x => classname(x), keys, filter(identity));

const classname = cond([
  [ is(Array), processArray ],
  [ is(Object), processObj ],
  [ T, identity ]
]);

const cn = (...args) => classname(args);

export default cn;
