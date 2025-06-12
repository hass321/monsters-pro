import React from 'react';
import './modal.styles.css';

export const Modal = ({ monster, onClose }) => {
    if (!monster) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <img 
                        src={`https://robohash.org/${monster.id}?set=set2&size=200x200`} 
                        alt={monster.name}
                        className="modal-image"
                    />
                    <h2>{monster.name}</h2>
                </div>
                <div className="modal-body">
                    <p><strong>Email:</strong> {monster.email}</p>
                    <p><strong>Phone:</strong> {monster.phone}</p>
                    <p><strong>Website:</strong> {monster.website}</p>
                    <p><strong>Company:</strong> {monster.company.name}</p>
                    <p><strong>Address:</strong></p>
                    <p>{monster.address.street}, {monster.address.suite}</p>
                    <p>{monster.address.city}, {monster.address.zipcode}</p>
                </div>
            </div>
        </div>
    );
};
