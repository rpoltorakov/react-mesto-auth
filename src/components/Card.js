import deleteLogoPath from '../images/trash.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const userContext = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === userContext._id
  const isLiked = card.likes.some(i => i._id === userContext._id);

  function handleClick() {
    onCardClick({
      link: card.link,
      name: card.name
    })
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__title">
        <h3 className="card__title-text">{card.name}</h3>
        <div className="card__like-container">
          <button 
            className={`card__like-button ${isLiked && 'card__like-button_pressed'}`} 
            type="button" 
            aria-label="Лайк" 
            onClick={handleLikeClick}
            />
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <img src={deleteLogoPath} alt="Удалить" className="card__delete-button" onClick={handleDeleteClick} />}
    </div>
  )
}