# relike-redux-middleware

Redux middleware for interfacing with ReLike, the decentralized public liking service, powered by Ethereum.

### Documentation

```js
import { applyMiddleware, createStore } from 'redux';
import ReLikeMiddleware from 'relike-redux-middleware';

import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(ReLikeMiddleware),
);

```

The middleware will dispatch actions that are prefixed with `@@RELIKE/`.

You can import ReLike actions from `relike-redux-middleware` to dispatch from your app. You can pass them to components via a connected container, in idiomatic Redux style:

```js
// MyContainer.js
import { connect } from 'react-redux';
import { ReLikeMetaActions } from 'relike-redux-middleware;'

import MyComponent from '../components/MyComponent';

const mapDispatchToProps = {
  dislike: ReLikeMetaActions.dislike,
  getLikeData: ReLikeMetaActions.getLikeData,
  like: ReLikeMetaActions.like,
  unDislike: ReLikeMetaActions.unDislike,
  unLike: ReLikeMetaActions.unLike,
};

export default connect(null, mapDispatchToProps)(MyComponent);

```

For a full list of actions please see [`ReLikeMetaActions.js`](https://github.com/noman-land/relike-redux-middleware/blob/master/js/redux/actions/ReLikeActions.js).

To handle the actions in your reducers, `relike-redux-middleware` exports a `ReLikeActionTypes` object:

```js
import { Map } from 'immutable';
import { ReLikeActionTypes } from 'relike-redux-middleware';

export default function pendingLikes(state = Map(), action) {
  switch (action.type) {
    case ReLikeActionTypes.DISLIKE_START:
      return state.setIn([action.payload.entityId, 'dislike'], true);
    default:
      return state;
  }
}
```

For a full list of action types please see [`actionTypes.js`](https://github.com/noman-land/relike-redux-middleware/blob/master/js/redux/actions/ReLikeActionTypes.js).
