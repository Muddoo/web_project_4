export default class Api {
    constructor({baseUrl,options}) {
        this._baseUrl = baseUrl;
        this._options = options;
    }

    async queryCards({query = '',method='GET',body = null}) {
        this._options = {...this._options,method,body: body && JSON.stringify(body)};
        const res = await fetch(`${this._baseUrl}/cards/${query}`,this._options);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }

    async getUser() {
        const res = await fetch(`${this._baseUrl}/users/me`,this._options);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }

    async updateProfile({avatar = '',method = 'PATCH',body}) {
        this._options = {...this._options,method,body: JSON.stringify(body)};
        const res = await fetch(`${this._baseUrl}/users/me/${avatar}`,this._options);
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
    }
}