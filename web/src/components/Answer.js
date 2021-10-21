import React from "react";

export const Answer = ({ answer, userId, onDelete }) => (
  <aside className="answer">
    <p>{answer.answer}</p>
    {answer.userId === userId && (
      <button
        className="boton-delete-answe"
        onClick={() => onDelete(answer.id)}
      >
        DELETE
      </button>
    )}
  </aside>
);
