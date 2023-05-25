import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState('')
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [authMessage, setAuthMessage] = useState()

  const [cards, setCards] = useState([])

  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then(res => {
          setCurrentUser(res)
        })
        .catch(err => {console.error(err)})
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(res => {
          setCards(res)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt')
      auth.checkToken(jwt)
        .then(data => {
          setLoggedIn(true)
          setCurrentUserEmail(data.data.email)
          navigate('/')
        })
        .catch(error => {console.error(error)})
      }
  }, [navigate, loggedIn]);

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
  
  function handleLoginSubmit(email, password) {
    if (!email || !password) {
      return
    }
    auth.login(email, password)
      .then(res => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          navigate('/', {replace: true})
        }
      })
      .catch(error => {
        setIsInfoTooltipOpen(true)
        setIsRegisterSuccess(true)
        setAuthMessage('Что-то пошло не так! Попробуйте еще раз.')
      })
    
  }
  function handleLogoutClick() {
    localStorage.removeItem('jwt')
    navigate('/sign-in', {replace: true})
    setLoggedIn(false)
  }
  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(res => {
        navigate('/sign-in', {replace: true});
        setIsInfoTooltipOpen(true)
        setIsRegisterSuccess(true)
        setAuthMessage('Вы успешно зарегистрировались!')
      })
      .catch(error => {
        setIsInfoTooltipOpen(true)
        setIsRegisterSuccess(false)
        setAuthMessage('Что-то пошло не так! Попробуйте еще раз.')
      })
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
              onSignOut={handleLogoutClick}
            />}
          />
          <Route path='/sign-up' element={<Register onRegister={handleRegisterSubmit} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLoginSubmit} />} />
        </Routes>
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegisterSuccess={isRegisterSuccess} authMessage={authMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
