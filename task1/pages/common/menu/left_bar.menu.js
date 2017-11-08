
class LeftMenu {
    constructor() {
        this.myProfile = element(by.css("#l_pr a"));
        this.friends = element(by.css("#l_fr>a"));
    };

}

module.exports = LeftMenu;