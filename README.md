# ReLikeMiddleware

Redux middleware for interfacing with ReLike, the decentralized public liking service, powered by Ethereum.

### Documentation

This middleware uses `ReLikeUtils` under the hood to send transactions to the ReLike smart contract on Ethereum. Please see documentation for [`ReLikeUtils` on GitHub](https://github.com/noman-land/relike-utils).

#### Installation

To install the middleware, simply import it and add it to your list of middlewares.

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

#### Meta Actions

This library exports a set of "meta actions" that you will use to trigger the middleware to cause a transaction on the ReLike service and dispatch a series of start and success/error actions.

Here's an example meta action, which uses `Date.now()` to add a timestamp when it creates the action, so you can identify it later:

```js
const action = {
  type: '@@RELIKE/LIKE',
  payload: {
    entityId: 'ReLike',
    timestamp: 1501802668772,
  },
}
```

The middleware swallows the meta action and dispatches a "start" action, like so:

```js
const startAction = {
  type: '@@RELIKE/LIKE_START',
  payload: {
    entityId: 'ReLike',
    timestamp: 1501802668772,
  },
};
```

This is followed by a success or error action, depending on if the transaction is successful or not:

```js
const successAction = {
  type: '@@RELIKE/LIKE_SUCCESS',
  meta: {
    entityId: 'ReLike',
    timestamp: 1501802668772,
  },
  payload: {
    result: { /* transaction object */ },
  },
};

// or

const errorAction = {
  error: true,
  type: '@@RELIKE/LIKE_ERROR',
  meta: {
    entityId: 'ReLike',
    timestamp: 1501802668772,
  },
  payload: { /* Error object */ },
};
````

#### Passing actions to components

These meta actions can be passed to components via a connected container, in idiomatic Redux style:

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

#### Handling the actions dispatched by the middelware

To handle the individual actions in your reducers, This library exports a `ReLikeActionTypes` object. You can import this into your reducers and manipulate your state as you see fit.

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

#### Listening for events

When the middleware is instantiated, it will start listening and dispatch actions for two kinds of events:

1. The primary account of the user has been switched:
    ```js
    const accountChangedEvent = {
      type: '@@RELIKE/ACCOUNT_CHANGED_EVENT',
      payload: {
        newAccount: 0x0123456789abcdef0123456789abcdef01234567,
      },
    };
    ```

2. A new "like" has been placed on the service:
    ```js
    const newLikeEvent = {
      type: '@@RELIKE/NEW_LIKE_EVENT',
      payload: {
        dislikes: 2,
        entityId: 'ReLike',
        likes: 7,
        rating: 1,
        user: 0x0123456789abcdef0123456789abcdef01234567,
      },
    };

    ```
    The possible ratings are:
    ```
    0 = UNRATED
    1 = LIKE
    2 = DISLIKE
    ```
