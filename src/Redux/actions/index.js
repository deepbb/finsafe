import ACTIONS from "./actionTypes";
import { addData } from "../../API/createDoc";
import { editDataById } from "../../API/editDoc";
import { deleteDataById } from "../../API/deleteDoc";
import { getAllDocs, getDocById } from "../../API/readDoc";
import { POST_COLL_NAME } from "../../constants";
import { arrayUnion } from "firebase/firestore";

/* Data actions */
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: ACTIONS.LOADING_DATA });
    const posts = await getAllDocs(POST_COLL_NAME);
    dispatch({ type: ACTIONS.FETCH_POSTS, payload: posts });
  };
};

export const fetchPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: ACTIONS.LOADING_DATA });
    const post = await getDocById(POST_COLL_NAME, id);
    dispatch({ type: ACTIONS.FETCH_POST, payload: post });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };
};

export const createPost = (data) => {
  return async (dispatch) => {
    await addData(POST_COLL_NAME, data);
    dispatch({ type: ACTIONS.CREATE_POST, payload: data });
    dispatch({
      type: ACTIONS.CLEAR_ERROR,
    });
  };
};

export const editPost = (id, data) => {
  return async (dispatch) => {
    await editDataById(POST_COLL_NAME, id, data);
    dispatch({ type: ACTIONS.EDIT_POST, payload: data });
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    await deleteDataById(POST_COLL_NAME, id);
    dispatch({ type: ACTIONS.DELETE_POST, payload: id });
  };
};

export const submitComment = (comment, postId) => {
  return async (dispatch) => {
    await editDataById(POST_COLL_NAME, postId, {
      comment: arrayUnion(comment),
    });
    dispatch({ type: ACTIONS.SUBMIT_COMMENT, payload: comment });
  };
};
