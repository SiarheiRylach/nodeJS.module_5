const GuestPage = require('./guest.page');
const UserPage = require('./user.page');
const FeedPage = require('./feed.page');
const FriendsPage = require('./friends.page');

class World{
    constructor(){
        this.guestPage = new GuestPage();
        this.feedPage = new FeedPage();
        this.friendsPage = new FriendsPage();
        this.userPage = new UserPage();
    }
}

module.exports =  new World();