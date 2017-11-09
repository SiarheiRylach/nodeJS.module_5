const MasterPage = require('./common/master.page');

class FriendsPage extends MasterPage{
    constructor() {
        super();
        this.nameTestFriend = element(by.linkText("Сергей Рылач")); // name of user on vk.com in list of friends
    };

}

module.exports = FriendsPage;