import {newSection,newCard,userInfo} from './constants.js'

function profileFormSubmit([name,info]) {
    userInfo.setUserInfo(name,info);
}
  
function cardFormSubmit([name,link]) {
    newSection({
        items: [{name, link}],
        renderer(item) {
        return newCard(item);
        }
    });
}

export {profileFormSubmit,cardFormSubmit}