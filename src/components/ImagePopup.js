export default function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_target_image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name}/>
        <p className="popup__subtitle">{card.name}</p>
        <button type="button" onClick={onClose} className="popup__close-button popup__close-button_target_image" aria-label="Закрыть"> </button>
      </div>
    </div>
  )
}