import React, { useState } from 'react';

import useCustomForm from  '../hooks/FormHooks';
import defaultOptionsAuth from '../shared/defaultOptionsAuth';
import { COMMENTS_URL, NO_AVATAR_PATH } from '../../constants/urls';
import './comment.scss';

export default function AddEvent(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAnswerMode, setIsAnswerMode] = useState(false);
  const [tmpCommentText, setTmpCommentText] = useState('');
  const {isUserLogged, comment, userId, getComments} = props.commentData;
  const {inputs, handleInputChange} = useCustomForm();
  const authorNick = comment.author.nick || 'Noname';
  const authorAvatar = comment.author.avatar || NO_AVATAR_PATH;
  let commentTextArea;
  
  function commentEdit() {
    setIsEditMode(true);
    commentTextArea.focus();
    setTmpCommentText(commentTextArea.value);
  }

  function commentAnswer() {
    setIsAnswerMode(true);
  }

  function commentCancel() {
    setIsEditMode(false);
    commentTextArea.value = tmpCommentText;
  }

  function commentSave() {
    fetch(`${COMMENTS_URL}/update`, {
      ...defaultOptionsAuth(),
      method: 'PUT',
      body: JSON.stringify({
        _id: comment._id,
        user_id: userId,
        author_id: comment.author.id,
        text: commentTextArea.value,
      }),
    })
    .then(() => {
      setIsEditMode(false);
      getComments();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function answerCancel() {
    setIsAnswerMode(false);
  }

  function answerSave() {
    fetch(`${COMMENTS_URL}/add/answer`, {
      ...defaultOptionsAuth(),
      method: 'POST',
      body: JSON.stringify({
        _id: comment._id,
        user_id: userId,
        text: inputs.answerText,
      }),
    })
      .then(() => {
        setIsAnswerMode(false);
        getComments();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div className="comment-card shadow-sm p-3 mb-3 rounded">
        <div className="row">
          <div className="col-2 author-data">
            <div className="column">
              <div align="center" className="w-100">{authorNick}</div>
              <div className="d-flex justify-content-center">
                <img height="50" width="50" src={authorAvatar} alt={authorNick}/>
              </div>
            </div>
          </div>
          <div className="col-10 ml-1 d-flex row">
            <textarea
              ref={(input) => {commentTextArea = input}}
              className="comment"
              readOnly={!isEditMode}
              defaultValue={comment.text}
            />
            <div className="d-flex w-100">
              <div className="w-50 text-left">
                {
                  isEditMode
                    ? <span className="action-button pointer" onClick={commentCancel}>Cancel</span>
                    : ''
                }
              </div>
          
              <div className="w-50 text-right">
                {
                  isUserLogged && !(userId === comment.author.id)
                    ? !comment.child_comments.length ? <span className="action-button pointer" onClick={commentAnswer}>Answer</span> : ''
                    : isEditMode
                      ? <span className="action-button pointer" onClick={commentSave}>Save</span>
                      : <span className="action-button pointer" onClick={commentEdit}>Edit</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {
      // TODO: set answer author data, after BE implementing
      comment.child_comments.length || isAnswerMode
        ? <div className="comment-card answer-card shadow-sm p-3 mb-3 rounded">
            <div className="row">
              <div className="col-2 author-data">
                <div className="column">
                  <div align="center" className="w-100">Noname</div>
                  <div className="d-flex justify-content-center">
                    <img height="50" width="50" src={NO_AVATAR_PATH} alt="Noname"/>
                  </div>
                </div>
              </div>
              <div className="col-10 ml-1 d-flex row">
                <textarea
                  name="answerText"
                  onChange={handleInputChange}
                  className="comment"
                  readOnly={!isAnswerMode}
                  defaultValue={(comment.child_comments[0] || {}).text || ''}
                />
                <div className="d-flex w-100">
                  <div className="w-50 text-left">
                    {
                      isAnswerMode
                        ? <span className="action-button pointer" onClick={answerCancel}>Cancel</span>
                        : ''
                    }
                  </div>
                  <div className="w-100 text-right">
                    {
                      isAnswerMode
                        ? <span className="action-button pointer" onClick={answerSave}>Save</span>
                        : ''
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        : ''
        }
    </div>
  );
}

