import editButton from '../images/editButton.svg';
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';
import { defaultAvatar } from '../utils/constants';

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
	const [userName, setUserName] = useState('');
	const [userDescription, setUserDescription] = useState('');
	const [userAvatar, setUserAvatar] = useState(defaultAvatar);
	const [cards, setCards] = useState([]);

	useEffect(() => {
		api.getUserInfo()
		.then((userData) => {
			setUserName(userData.name);
			setUserDescription(userData.about);
			setUserAvatar(userData.avatar);
		})
		.catch((error) => {
			console.error(`Error fetching user data: ${error}`);
		});

		api.getInitialCards()
		.then((cardData) => {
			setCards(cardData);
		})
		.catch((error) => {
			console.error(`Error fetching cards data: ${error}`);
		});
	}, []);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__info">
					<div onClick={onEditAvatar} className="profile__avatar">
						<img alt="Фото профиля"
						     className="profile__avatar-image"
						     src={userAvatar}
						/>
						<div className="profile__avatar-overlay">
							<img src={editButton} alt="Редактировать" className="profile__avatar-edit-icon"/>
						</div>
					</div>
					<div className="profile__item">
						<div className="profile__header">
							<h1 className="profile__title">{userName}</h1>
							<p className="profile__text">{userDescription}</p>
						</div>
						<button onClick={onEditProfile} className="profile__edit-button"
						        type="button"></button>
					</div>
				</div>
				<button onClick={onAddPlace} className="profile__add-button" type="button"></button>
			</section>

			<section className="elements">
				{cards.map((card) => (
					<Card onCardClick={onCardClick} key={card._id} card={card}/>
				))}
			</section>
		</main>
	);
}

export default Main;
