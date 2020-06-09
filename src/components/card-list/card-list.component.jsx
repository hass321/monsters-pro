import React from "react";
// styling
import "./card-list.styles.css";
// custom component
import { Card } from "../card/card.component";

export const CardList = (props) => (
  <div className="card-list">
    {props.monsters.map(monster => (
        <Card key={monster.id} monster={monster}/>
    ))}
  </div>
);
