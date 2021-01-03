export default class Api {
    constructor({baseUrl,options}) {
        this._baseUrl = baseUrl;
        this._options = options;
    }

    async queryCards({query = '',method='GET',body = null}) {
         try {
            this._options = {...this._options,method,body: body && JSON.stringify(body)};
            const res = await fetch(`${this._baseUrl}/cards/${query}`,this._options);
            return res.ok ? await res.json() : await Promise.reject(`Error: ${res.status} - ${res.statusText}`);
         } catch (error) {
             console.log(error)
         }
    }

    async getUser() {
        try {
            const res = await fetch(`${this._baseUrl}/users/me`,this._options);
            return res.ok ? await res.json() : await Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
        } catch (error) {
            console.log(error)
        }
    }

    async updateProfile({avatar = '',method = 'PATCH',body}) {
        try {
            this._options = {...this._options,method,body: JSON.stringify(body)};
            const res = await fetch(`${this._baseUrl}/users/me/${avatar}`,this._options);
            return res.ok ? await res.json() : await Promise.reject(`Error: ${res.status} - ${res.statusText} - ${res.url}`);
        } catch (error) {
            console.log(error)
        }
    }
}