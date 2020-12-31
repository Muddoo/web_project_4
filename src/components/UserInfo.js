export default class UserInfo {
    constructor([name,about,avatar]) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar)
    }

    setUserInfo({name,about,avatar,_id}) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
        this._avatar.closest('.profile').classList.remove('hidden');
    }

    getUserInfo() {
        return [this._name.textContent,this._about.textContent];
    }

    getUserId() {
        return this._id;
    }
}