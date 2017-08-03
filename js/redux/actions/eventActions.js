import { createAction } from 'redux-actions';

import actionTypes from './actionTypes';

export const accountChangedEvent = createAction(
  actionTypes.ACCOUNT_CHANGED_EVENT,
  newAccount => ({ newAccount }),
);

export const newLikeEvent = createAction(
  actionTypes.NEW_LIKE_EVENT,
  ({ dislikes, entityId, likes, rating, user }) => ({ dislikes, entityId, likes, rating, user }),
);

export default {
  accountChangedEvent,
  newLikeEvent,
};
