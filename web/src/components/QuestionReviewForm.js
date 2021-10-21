import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postReview } from "../actions/questionActions";

import { useForm } from "react-hook-form";

function QuestionReviewForm({ question, user, dispatch, loading, hasErrors }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(postReview(data.review, question.id, user));
  };

  const renderQuestions = () => {
    if (loading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Unable to display questions.</p>;
    console.log(question.userReviews.includes(user));
    return question.userReviews.indexOf(user);
  };

  return (
    <section>
      <h1>Questions</h1>
      {!renderQuestions() ? (
        <div>Inhabilitado</div>
      ) : (
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
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  question: state.question.question,
  user: state.auth.uid,
});

export default connect(mapStateToProps)(QuestionReviewForm);
