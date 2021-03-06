import ReLikeUtils from 'relike-utils';

import actionTypes from '../actions/actionTypes';

import { newLikeEvent, accountChangedEvent } from '../actions/eventActions';

import reLikeAsyncActionCreator from '../actions/asyncActions/reLikeAsyncActionCreator';

const ReLikeMiddleware = store => {
  const { dispatch } = store;

  const reLikeUtils = new ReLikeUtils({
    onAccountChangeEvent: newAccount => dispatch(accountChangedEvent(newAccount)),
    onLikeEvent: likeData => dispatch(newLikeEvent(likeData)),
  });

  const {
    dislike,
    like,
    getLikeCount,
    getLikeData,
    getMyRating,
    unDislike,
    unLike,
  } = reLikeAsyncActionCreator(reLikeUtils);

  return next => action => {
    switch (action.type) {
      case actionTypes.DISLIKE: {
        const { entityId, timestamp } = action.payload;
        return dispatch(
          dislike({ entityId, timestamp }),
        );
      }

      case actionTypes.GET_LIKE_COUNT: {
        const { entityId } = action.payload;
        return dispatch(
          getLikeCount(entityId),
        );
      }

      case actionTypes.GET_LIKE_DATA: {
        const { entityId } = action.payload;
        return dispatch(
          getLikeData(entityId),
        );
      }

      case actionTypes.GET_MY_RATING: {
        const { entityId } = action.payload;
        return dispatch(
          getMyRating(entityId),
        );
      }

      case actionTypes.LIKE: {
        const { entityId, timestamp } = action.payload;
        return dispatch(
          like({ entityId, timestamp }),
        );
      }

      case actionTypes.UNDISLIKE: {
        const { entityId, timestamp } = action.payload;
        return dispatch(
          unDislike({ entityId, timestamp }),
        );
      }

      case actionTypes.UNLIKE: {
        const { entityId, timestamp } = action.payload;
        return dispatch(
          unLike({ entityId, timestamp }),
        );
      }

      default:
        return next(action);
    }
  };
};

export default ReLikeMiddleware;
