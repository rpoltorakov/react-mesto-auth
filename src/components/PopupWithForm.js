export default function PopupWithForm({isOpen, onClose, target, title, children, button, onSubmit}) {
  
  return (
    <div className={`popup  popup_target_${target} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className={`popup__close-button popup__close-button_target_${target}`} aria-label="Закрыть"></button>
        <h2 className="popup__header">{title}</h2>
        <form
          className={`popup__form popup__form_target_${target}`} 
          name={target}
          onSubmit={onSubmit}
          >
          {children}
          <button type="submit" className={`popup__save-button popup__save-button_${target}`} aria-label="Сохранить">
            {button}
          </button>
        </form>
        </div>
    </div>
  )
}