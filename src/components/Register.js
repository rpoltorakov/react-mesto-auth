import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

function Register({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    const {value} = e.target
    setEmail(value)
  }
  const handleChangePassword = (e) => {
    const {value} = e.target
    setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password)
  }

  return ( 
    <>
      <Header loggedIn={false} link={'Вход'}/>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" name="register" onSubmit={handleSubmit}>
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
          <button className="auth__button">Зарегистрироваться</button>
        </form>
        <Link className="auth__link" to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </div>
    </>
  );
}

export default Register;