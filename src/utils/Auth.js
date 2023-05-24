class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _returnData() {
    return (res) => {
      if (res.ok) {return res.json()} 
      else {return Promise.reject(`Ошибка ${res.status}`)}
    }
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      // .then((res) => {
      //   console.log('res in auth', res)
      //   return res.json()
      // })
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((response => response.json()))
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          return data
        }
      })
      .catch(err => console.error(err))
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${jwt}`
      },
    })
      .then(this._returnData())
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    "Content-Type": "application/json"
  }
})

export default auth