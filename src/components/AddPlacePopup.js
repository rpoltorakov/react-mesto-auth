import React from 'react'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const nameRef = React.useRef()
  const linkRef = React.useRef()
  
  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    })
  }

  return ( 
    <PopupWithForm 
      target="addPlace" 
      title="Новое место" 
      button="Создать" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        name="addPlace-name" 
        className="popup__input popup__input_target_addPlace-title" 
        placeholder="Название" 
        required 
        minLength="2" 
        maxLength="30"
        ref={nameRef}
        />
      <span className="popup__input-error" id="addPlace-name-error">Error</span>
      <input 
        name="addPlace-link" 
        type="url" 
        className="popup__input popup__input_target_addPlace-image" 
        placeholder="Ссылка на картинку" 
        required
        minLength="2" 
        maxLength="200"
        ref={linkRef}
        />
      <span className="popup__input-error" id="addPlace-link-error">Error</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;