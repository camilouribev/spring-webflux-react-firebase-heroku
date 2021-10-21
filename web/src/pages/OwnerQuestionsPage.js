import React, { useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import {
  fetchOwnerQuestions,
  deleteQuestion,
} from "../actions/questionActions";
import { Question } from "../components/Question";

const OwnerQuestionsPage = ({
  dispatch,
  loading,
  questions,
  hasErrors,
  redirect,
  userId,
}) => {
  useEffect(() => {
    dispatch(fetchOwnerQuestions(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (redirect) {
      dispatch(fetchOwnerQuestions(userId));
    }
  }, [redirect, dispatch, userId]);

  const onDelete = (id) => {
    swal({
      title: "Are you sure that you want to delete the question?",
      text: "If you press confirm the question will be gone",
      icon: "warning",
      buttons: ["Cancel", "Confirm"],
    }).then((isConfirmed) => {
      if (isConfirmed) {
        dispatch(deleteQuestion(id));
        swal({
          text: "Succesfully deleted the answers",
          icon: "success",
        });
      }
    });
  };

  const renderQuestions = () => {
    if (loading) return <p>Loading questions...</p>;
    if (hasErrors) return <p>Unable to display questions.</p>;

    return questions.map((question) => (
      <Question
        key={question.id}
        question={question}
        excerpt
        onDelete={onDelete}
      />
    ));
  };

  return (
    <section>
      <h1>Questions</h1>
      {renderQuestions()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  questions: state.question.questions,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect,
  userId: state.auth.uid,
});

export default connect(mapStateToProps)(OwnerQuestionsPage);
