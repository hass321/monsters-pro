import React from 'react';
// styling
import "./card.styles.css";

export const Card = ({ monster, onClick }) => (
    <div className="card-container" onClick={() => onClick(monster)}>
        <img 
            src={`https://robohash.org/${monster.id}?set=set2&size=180x180`} 
            alt={monster.name}
        />
        <h2>{monster.name}</h2>
        <p>{monster.email}</p>
    </div>
)