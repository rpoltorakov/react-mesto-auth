import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import auth from '../utils/Auth'

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleChangeEmail = (e) => {
    const {value} = e.target
    setEmail(value)
  }
  const handleChangePassword = (e) => {
    const {value} = e.target
    setPassword(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    auth.login(email, password)
      .then(res => {
        if (res) {
          setEmail('')
          setPassword('')
          onLogin()
          navigate('/', {replace: true})
        }
      })
      .catch(error => {console.error(error)})
  }

  return ( 
    <>
      <Header loggedIn={false} link={'Регистрация'}/>
      <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" name="login" onSubmit={handleSubmit}>
          <input 
            name="register-email" 
            className="auth__input" 
            placeholder="Email" 
            type="email" 
            required 
            minLength="2" 
            maxLength="200"
            value={email}
            onChange={handleChangeEmail}
            />
          <input 
            name="register-password" 
            className="auth__input" 
            placeholder="Пароль" 
            type="password" 
            required 
            minLength="2" 
            maxLength="200"
            value={password}
            onChange={handleChangePassword}
            />
          <button className="auth__button" type="submit">Вход</button>
        </form>
      </div>
    </>
  );
}

export default Login;