# ReLikeMiddleware

Redux middleware for interfacing with ReLike, the decentralized public liking service, powered by Ethereum.

### Documentation

This middleware uses `ReLikeUtils` under the hood to send transactions to the ReLike smart contract on Ethereum. Please see documentation for [`ReLikeUtils` on GitHub](https://github.com/noman-land/relike-utils).

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

This library exports a set of "meta actions" that will trigger the middleware to dispatch a series of start and success/error actions. These meta actions can be passed to components via a connected container, in idiomatic Redux style:

```js
// MyContainer.js
import { connect } from 'react-redux';
import { ReLikeMetaActions } from 'relike-redux-middleware;'

import MyComponent from '../components/MyComponent';

const mapDispatchToProps = {
  dislike: ReLikeMetaActions.dislike,
  getLikeCount: ReLikeMetaActions.getLikeCount,
  getMyRating: ReLikeMetaActions.getMyRating,
  like: ReLikeMetaActions.like,
  unDislike: ReLikeMetaActions.unDislike,
  unLike: ReLikeMetaActions.unLike,
};

export default connect(null, mapDispatchToProps)(MyComponent);

```

For a full list of meta actions please see [`ReLikeMetaActions.js`](https://github.com/noman-land/relike-redux-middleware/blob/master/js/redux/actions/ReLikeMetaActions.js).

To handle the individual actions in your reducers, This library exports a `ReLikeActionTypes` object:

```js
import { Map } from 'immutable';
import { ReLikeActionTypes } from 'relike-redux-middleware';

export default function pendingLikes(state = Map(), action) {
  switch (action.type) {
    case ReLikeActionTypes.LIKE_START:
      return state.set(action.payload.entityId, true);
    case ReLikeActionTypes.LIKE_ERROR:
    case ReLikeActionTypes.LIKE_SUCCESS:
      return state.set(action.payload.entityId, false);
    default:
      return state;
  }
}
```

For a full list of action types please see [`actionTypes.js`](https://github.com/noman-land/relike-redux-middleware/blob/master/js/redux/actions/actionTypes.js).
