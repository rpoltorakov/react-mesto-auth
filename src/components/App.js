import './App.css';
import Main from './Main';
import React from 'react';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState();

  const [cards, setCards] = React.useState([])

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('')

  const navigate = useNavigate()

  React.useEffect(() => {
    api.getUserData()
    .then(res => {
      setCurrentUser(res)
    })
    .catch(err => {console.error(err)})
  }, []);
  React.useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    auth.checkToken(jwt)
      .then(data => {
        setLoggedIn(true)
        setCurrentUserEmail(data.data.email)
        navigate('/')
      })
  }, [navigate]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(props) {
    setSelectedCard({
      link: props.link,
      name: props.name
    })
  } 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(error => {console.error(error)})
  }
  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(error => {console.error(error)})
  }
  function handleAddPlace(data) {
    api.addNewCard(data)
    .then(res => {
      setCards([res, ...cards])
      closeAllPopups()
    })
    .catch(error => {console.error(error)})
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards(state => (state.map((c) => c._id === card._id ? newCard : c)));
    })
    .catch(error => {console.error(error)})
  }
  function handleCardDelete(card) {
    api.deleteLikeCard(card._id)
    .then((() => {
      setCards((state) => state.filter((newCard) => newCard._id !== card._id))
    }))
    .catch(error => {console.error(error)})
  }
  
  function handleLoginSubmit() {
    setLoggedIn(true)
  }
  function handleLogoutClick() {
    setLoggedIn(false)
  }
  function handleRegisterSubmit(email, password) {
    console.log('reg', email, password)
    auth.register(email, password)
      .then(res => {
        if (res.status === 201) {
          navigate('/sign-in', {replace: true});
          setIsInfoTooltipOpen(true)
          setIsRegisterSuccess(true)
        } else {
          setIsInfoTooltipOpen(true)
          setIsRegisterSuccess(false)
        }
      })
      .catch(error => {console.error(error)})
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={
            <ProtectedRouteElement 
              loggedIn={loggedIn} 
              element={Main}
              onEditProfile={handleEditProfileClick} 
              onEditAvatar={handleEditAvatarClick} 
              onAddPlace={handleAddPlaceClick} 
              onCardClick={handleCardClick} 
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              email={currentUserEmail}
              onLogoutClick={handleLogoutClick}
            />}
          />
          <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />} />
        </Routes>
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegisterSuccess={isRegisterSuccess} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
