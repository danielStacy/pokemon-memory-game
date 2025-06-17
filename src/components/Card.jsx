import React from "react";
import "../stylesheets/Card.css";

export default function Card({ id, name, img, selectHandler }) {
  return (
    <div className="card" data-id={id} onClick={selectHandler}>
      <div className="card-title-container">
        <p className="card-title">{name}</p>
      </div>
      <div className="card-image-container">
        <img className="card-image" src={img} />
      </div>
    </div>
  );
}
