import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App () {
	const [cards, setCards] = useState([]);
	const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
	const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
	const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
	const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({
		avatar: '',
		name: '',
		about: '',
	});

	useEffect(() => {
		api.getInitialCards()
		.then((cardData) => {
			setCards(cardData);
		})
		.catch((error) => {
			console.error(`Error fetching cards data: ${error}`);
		});
	}, []);

	useEffect(() => {
		api.getUserInfo()
		.then((userData) => setCurrentUser(userData))
		.catch((err) => console.log(err));
	}, []);

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

	function handleCardLike (card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		api.toggleLike(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		});
	}

	function handleDeleteClick (card) {
		api.deleteCard(card._id).then(() => {
			setCards((state) => state.filter((c) => c._id !== card._id));
		});
	}

	function handleUpdateUser ({ name, about }) {
		api.updateProfile(name, about).then((userData) => {
			setCurrentUser(userData);
			closeAllPopups();
		});
	}

	function handleUpdateAvatar (avatar) {
		api.updateAvatar(avatar).then((userData) => {
			setCurrentUser(userData);
			closeAllPopups();
		});
	}

	function handleAddPlaceSubmit ({ title, url }) {
		api.addNewCard(title, url).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		});
	}

	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Header/>
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleDeleteClick}
					cards={cards}
				/>
				<Footer/>

				<EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

				<AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

				<EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups}
				                 onUpdateAvatar={handleUpdateAvatar}/>

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
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
