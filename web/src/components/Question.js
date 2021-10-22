import React from "react";
import { Link } from "react-router-dom";

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? "question-excerpt" : "question"}>
    <h1>
      <div dangerouslySetInnerHTML={{ __html: question.question }} />
    </h1>
    <h3>
      {" "}
      <p>
        {question.category} - <small>{question.type}</small>
      </p>
    </h3>

    {onDelete && (
      <button className="button right" onClick={() => onDelete(question.id)}>
        DELETE
      </button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        View Question
      </Link>
    )}
  </article>
);
