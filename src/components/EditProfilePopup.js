import React from 'react'
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value)
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  return ( 
    <PopupWithForm 
      target="editProfile" 
      title="Редактировать профиль" 
      button="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input 
        name="editProfile-name" 
        className="popup__input popup__input_target_profile-title" 
        placeholder="Имя" 
        required 
        minLength="2" 
        maxLength="40"
        onChange={handleNameChange}
        value={name || ''}
        />
        <span className="popup__input-error" id="editProfile-name-error">Error</span>
      <input 
        name="editProfile-about" 
        className="popup__input popup__input_target_editProfile-subtitle" 
        placeholder="О себе" 
        required 
        minLength="2" 
        maxLength="200"
        onChange={handleDescriptionChange}
        value={description || ''}
        />
        <span className="popup__input-error" id="editProfile-about-error">Error</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;