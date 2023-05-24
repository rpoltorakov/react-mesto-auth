function InfoTooltip({isOpen, isRegisterSuccess, onClose}) {
  const popupSuccessImage = isRegisterSuccess ? 'popup__image-result_type_success' : 'popup__image-result_type_error'
  const text = isRegisterSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className={`popup__close-button`} aria-label="Закрыть" />
        <div className={`popup__image-result ${popupSuccessImage}`} />
        <p className="popup__result-text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;