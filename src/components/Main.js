import api from '../utils/Api'
import React, { Fragment } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards, loggedIn, email, onSignOut}) {
  const userContext = React.useContext(CurrentUserContext)
  const navigate = useNavigate()

  function handleLogoutClick() {
    onSignOut()
  }

  return (
    <>
      <Header loggedIn={loggedIn} email={email} onLogout={handleLogoutClick} />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-profile">
            <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
              <img src={userContext.avatar} alt="Аватар" className="profile__avatar" />
            </div>
          </div>
          <div className="profile__profile-info">
            <div className="profile__title-container">
              <h1 className="profile__title">{userContext.name}</h1> 
              <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить место" onClick={onAddPlace}></button>
        </section>

        <section className="cards">
          {
            cards.map((card) => (
              <Card 
                key={card._id} 
                card = {card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </section>
      </main>
      <Footer />
    </>
  )
}