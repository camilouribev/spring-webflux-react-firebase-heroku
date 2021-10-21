import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchQuestion, deleteAnswer } from "../actions/questionActions";

import { Question } from "../components/Question";
import { Answer } from "../components/Answer";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId,
  redirect,
}) => {
  const { id } = match.params;
  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, redirect, id]);

  const onDelete = (id) => {
    swal({
      title: "Are you sure that you want to delete the question?",
      text: "If you press confirm the question will be gone",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(deleteAnswer(id));
        swal({
          text: "Succesfully deleted the question and answers",
          icon: "success",
        });
      }
    });
  };
  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>;
    if (hasErrors.question) return <p>Unable to display question.</p>;

    return <Question question={question} />;
  };

  const renderAnswers = () => {
    return question.answers && question.answers.length ? (
      question.answers.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          userId={userId}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p>Empty answer!</p>
    );
  };

  return (
    <section>
      {renderQuestion()}
      {userId && (
        <Link to={"/answer/" + id} className="button right">
          Reply
        </Link>
      )}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid,
  redirect: state.question.redirect,
});

export default connect(mapStateToProps)(SingleQuestionPage);
