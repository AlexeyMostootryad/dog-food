const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({baseUrl, headers}){
        this._headers = headers;
        this._baseUrl= baseUrl;
    }

    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(onResponce)
    }

    search(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers
        }).then(onResponce)
    }

    setUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(user)
        }).then(onResponce)
    }

    changeLikeProductStatus(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers
        }).then(onResponce)
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
         "Content-Type": "application/json",
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBlMTkxMWFhMzk3MTIxODM4ZTIzN2QiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc4NjQ2MDgwLCJleHAiOjE3MTAxODIwODB9.g6bcQ5QaofOGzfj2XHrRK5_bd-1kSO12ureUhxN1mi8'
    }
}

const api = new Api(config);

export default api;