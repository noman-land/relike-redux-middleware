import { createAction } from 'redux-actions';

import actionTypes from './actionTypes';

export const dislike = createAction(
  actionTypes.DISLIKE,
  entityId => ({ entityId, timestamp: Date.now() }),
);

export const getLikeCount = createAction(
  actionTypes.GET_LIKE_COUNT,
  entityId => ({ entityId }),
);

export const getLikeData = createAction(
  actionTypes.GET_LIKE_DATA,
  entityId => ({ entityId }),
);

export const getMyRating = createAction(
  actionTypes.GET_MY_RATING,
  entityId => ({ entityId }),
);

export const like = createAction(
  actionTypes.LIKE,
  entityId => ({ entityId, timestamp: Date.now() }),
);

export const unDislike = createAction(
  actionTypes.UNDISLIKE,
  entityId => ({ entityId, timestamp: Date.now() }),
);

export const unLike = createAction(
  actionTypes.UNLIKE,
  entityId => ({ entityId, timestamp: Date.now() }),
);

export default {
  dislike,
  getLikeCount,
  getLikeData,
  getMyRating,
  like,
  unDislike,
  unLike,
};
