import { combineReducers } from 'redux';
import { PUSH_VIEW, POP_VIEW, POP_ALL_VIEWS, POP_ALL_VIEWS_BUT_ONE } from './actions.js';
import expect from 'expect';

const categories = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const viewStack = (state = [], action) => {
  switch (action.type) {
    case PUSH_VIEW:
      return [...state, {component: action.component, title: action.title}];
    case POP_VIEW:
      let viewsToPop = action.count || 1;
      return state.splice(0, state.length - viewsToPop);
    case POP_ALL_VIEWS:
      return [];
    case POP_ALL_VIEWS_BUT_ONE:
      return (state.length)? [state[0]]:[];
    default:
      return state;
  }
};

export default combineReducers({
  categories,
  viewStack
});

// Tests

expect(viewStack([], {type: PUSH_VIEW, component: 'test', title: 'hi'}))
.toEqual([{component: 'test', title: 'hi'}]);

expect(viewStack([{component: 'test', title: 'hi'}], {type: PUSH_VIEW, component: 'test1', title: 'hello'}))
.toEqual([{component: 'test', title: 'hi'}, {component: 'test1', title: 'hello'}]);

expect(viewStack(['test'], {type: POP_VIEW}))
.toEqual([]);

expect(viewStack([], {type: POP_VIEW}))
.toEqual([]);

expect(viewStack(['test', 'test1', 'test2', 'test3'], {type: POP_VIEW, count: 3}))
.toEqual(['test']);

expect(viewStack(['test', 'test1'], {type: POP_ALL_VIEWS}))
.toEqual([]);

expect(viewStack(['test', 'test1', 'test2'], {type: POP_ALL_VIEWS_BUT_ONE}))
.toEqual(['test']);
