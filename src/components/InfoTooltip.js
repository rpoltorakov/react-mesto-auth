function InfoTooltip({isOpen, isRegisterSuccess, onClose, authMessage}) {
  const popupSuccessImage = isRegisterSuccess ? 'popup__image-result_type_success' : 'popup__image-result_type_error'
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className={`popup__close-button`} aria-label="Закрыть" />
        <div className={`popup__image-result ${popupSuccessImage}`} />
        <p className="popup__result-text">{authMessage}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;