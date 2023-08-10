import _ from "lodash";

import ACTIONS from "../actions/actionTypes";

const initialState = {
  posts: {},
  post: {},
  loading: false,
  errorCode: null,
};

export default function dataReduceer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.FETCH_POSTS:
      return {
        ...state,
        posts: [...action.payload],
        loading: false,
      };

    case ACTIONS.FETCH_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
        errorCode: null,
      };

    case ACTIONS.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, { ...action.payload }],
      };

    case ACTIONS.EDIT_POST:
      return {
        ...state,
        posts: [...state.posts, { ...action.payload }],
      };

    case ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.payload.id)],
      };

    case ACTIONS.SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comment: [action.payload, ...state.post.comment],
        },
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        loading: false,
        errorCode: action.payload,
      };

    case ACTIONS.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
