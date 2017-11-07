const LeftBar = require('./menu/left_bar.menu');

//for all pages, except for guest page
class MasterPage {
    constructor() {
        this.url = "https://vk.com/";
        this.leftBar = new LeftBar();
    };

    open(){
       return browser.get(this.url);
    }

}

module.exports = MasterPage;