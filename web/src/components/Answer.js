import React from "react";

export const Answer = ({ answer, userId, onDelete }) => (
  <aside className="answer">
    <h4>
      <div dangerouslySetInnerHTML={{ __html: answer.answer }} />
    </h4>
    {answer.userId === userId && (
      <button className="button" onClick={() => onDelete(answer.id)}>
        DELETE
      </button>
    )}
  </aside>
);
