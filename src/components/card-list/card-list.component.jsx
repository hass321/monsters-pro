import React from "react";
// styling
import "./card-list.styles.css";
// custom component
import { Card } from "../card/card.component";

export const CardList = ({ monsters, onMonsterClick }) => (
  <div className="card-list">
    {monsters.map(monster => (
      <Card 
        key={monster.id} 
        monster={monster}
        onClick={onMonsterClick}
      />
    ))}
  </div>
);
