import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	function handleSubmit (e) {
		e.preventDefault();

		onAddPlace({
			title,
			url
		});
		setTitle('');
		setUrl('');
	}

	return (
		<PopupWithForm
			name="add"
			title="Новое место"
			buttonText="Создать"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input className="popup__input popup__input_type_title"
			       id="input-title"
			       maxLength="30"
			       minLength="2"
			       name="title"
			       placeholder="Название"
			       required
			       type="text"
			       value={title}
			       onChange={(e) => setTitle(e.target.value)}
			/>
			<p className="popup__input-message" id="input-title-message"></p>
			<input className="popup__input popup__input_type_url"
			       id="input-url"
			       name="url"
			       placeholder="Ссылка на картинку"
			       required
			       type="url"
			       value={url}
			       onChange={(e) => setUrl(e.target.value)}
			/>
			<p className="popup__input-message" id="input-url-message"></p>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
