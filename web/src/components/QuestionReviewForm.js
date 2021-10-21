import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postReview } from "../actions/questionActions";

import { useForm } from "react-hook-form";

function QuestionReviewForm({ question, user, dispatch }) {
  const [show, setShow] = useState(true);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit } = useForm();

  useEffect(() => {}, [show, rating]);

  const onSubmit = (data) => {
    console.log(user);
    setRating(data.review);
    dispatch(postReview(data.review, question.id, user));
    setShow(false);
  };

  return user && show ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="review">Question rating</label>
      <select {...register("review")} id="">
        <option value=""> Select...</option>
        <option value="1">{`\u{1f641}`}</option>
        <option value="2"> {`\u{1f610}`}</option>
        <option value="3"> {`\u{1f600}`}</option>
      </select>
      <button type="submit" className=" button right">
        Send review
      </button>
    </form>
  ) : (
    <div>
      Review Average = {question.sumOfReviewScores / question.numberOfReviews}
    </div>
  );
}

const mapStateToProps = (state) => ({
  question: state.question.question,
  user: state.auth.uid,
});

export default connect(mapStateToProps)(QuestionReviewForm);
