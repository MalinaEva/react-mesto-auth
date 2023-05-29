import React from 'react';

function Card ({ card, onCardClick }) {
	function handleClick () {
		onCardClick(card);
	}

	return (
		<div onClick={handleClick} className="element" key={card._id}>
			<img alt="фото места" className="element__img" src={card.link}/>
			<button className="element__button-del" type="button"></button>
			<div className="element__block">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like">
					<button className="element__like-button" type="button"></button>
					<div className="element__like-counter">{card.likes.length}</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
