import React from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const linkRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: linkRef.current.value
    })
  }

  return ( 
    <PopupWithForm 
      target="editAvatar" 
      title="Обновить аватар" 
      button="Сохранить" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input 
        name="editAvatar" 
        className="popup__input popup__input_target_editAvatar" 
        placeholder="Ссылка на картинку" 
        type="url" 
        required 
        minLength="2" 
        maxLength="200"
        ref={linkRef}
        />
      <span className="popup__input-error" id="editAvatar-error">Error</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;