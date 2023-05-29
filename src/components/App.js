import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App () {
	const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
	const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
	const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
	const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});

	const closeAllPopups = () => {
		setIsAvatarPopupOpen(false);
		setIsProfilePopupOpen(false);
		setIsPlacePopupOpen(false);
		setConfirmationPopupOpen(false);
		setSelectedCard({});
	};
	const handleEditAvatarClick = () => {
		setIsAvatarPopupOpen(true);
	};

	const handleEditProfileClick = () => {
		setIsProfilePopupOpen(true);
	};

	const handleAddPlaceClick = () => {
		setIsPlacePopupOpen(true);
	};

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	return (
		<div className="page">
			<Header/>
			<Main
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
				onEditAvatar={handleEditAvatarClick}
				onCardClick={handleCardClick}
			/>
			<Footer/>

			<PopupWithForm
				name="edit"
				title="Редактировать профиль"
				buttonText="Сохранить"
				isOpen={isProfilePopupOpen}
				onClose={closeAllPopups}
				onSubmit={() => console.log('Редактировать профиль')}
			>
				<input className="popup__input popup__input_type_name" id="input-name" maxLength="40"
				       minLength="2"
				       name="name" placeholder="Имя" required type="text"/>
				<p className="popup__input-message" id="input-name-message"></p>
				<input className="popup__input popup__input_type_description" id="input-description"
				       maxLength="200"
				       minLength="2"
				       name="about" placeholder="О себе" required type="text"/>
				<p className="popup__input-message" id="input-description-message"></p>
			</PopupWithForm>

			<PopupWithForm
				name="add"
				title="Новое место"
				buttonText="Создать"
				isOpen={isPlacePopupOpen}
				onClose={closeAllPopups}
				onSubmit={() => console.log('Создать место')}
			>
				<input className="popup__input popup__input_type_title" id="input-title" maxLength="30"
				       minLength="2"
				       name="title" placeholder="Название" required type="text"/>
				<p className="popup__input-message" id="input-title-message"></p>
				<input className="popup__input popup__input_type_url" id="input-url" name="url"
				       placeholder="Ссылка на картинку"
				       required type="url"/>
				<p className="popup__input-message" id="input-url-message"></p>
			</PopupWithForm>

			<PopupWithForm
				name="avatar-edit"
				title="Обновить аватар"
				buttonText="Сохранить"
				isOpen={isAvatarPopupOpen}
				onClose={closeAllPopups}
				onSubmit={() => console.log('Обновить аватар')}
			>
				<input className="popup__input popup__input_type_avatar" id="input-avatar" name="avatar"
				       placeholder="Ссылка на картинку"
				       required type="url"/>
				<p className="popup__input-message" id="input-avatar-message"></p>
			</PopupWithForm>

			<PopupWithForm
				name="submit"
				title="Вы уверены?"
				buttonText="Да"
				isOpen={isConfirmationPopupOpen}
				onClose={closeAllPopups}
				onSubmit={() => console.log('Submit ok')}
			/>

			<ImagePopup
				card={selectedCard}
				onClose={closeAllPopups}
			/>
		</div>
	);
}

export default App;
