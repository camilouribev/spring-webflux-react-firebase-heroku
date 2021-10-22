import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchQuestions } from "../actions/questionActions";
import { Question } from "../components/Question";

const QuestionsPage = ({ dispatch, loading, questions, hasErrors }) => {
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const questionFilteredCategory = questions.filter((question) =>
    question.category.toUpperCase().includes(categorySearch.toUpperCase())
  );

  const questionsFilteredSearch = questionFilteredCategory.filter((question) =>
    question.question.toUpperCase().includes(search.toUpperCase())
  );

  console.log(questionsFilteredSearch);
  const goToVariable = questionsFilteredSearch[0]?.id;
  const questionDirected = questionsFilteredSearch[0]?.question;
  console.log(`go to variable ${goToVariable} question ${questionDirected}`);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderQuestions = () => {
    if (loading) return <p>Loading questions...</p>;
    if (hasErrors) return <p>Unable to display questions.</p>;

    console.log(`category search: ${categorySearch}`);

    return questionsFilteredSearch.map((question) => (
      <Question
        setCategorySearch={setCategorySearch}
        key={question.id}
        question={question}
        excerpt
      />
    ));
  };

  return (
    <section>
      <h1>Questions</h1>
      <form>
        <input type="text" onChange={handleSearch} />
        <Link to={`/question/${goToVariable}`}>
          <input style={{ display: "none" }} type="submit" value="search" />
        </Link>
      </form>
      {renderQuestions()}
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.question.loading,
  questions: state.question.questions,
  hasErrors: state.question.hasErrors,
});

export default connect(mapStateToProps)(QuestionsPage);
