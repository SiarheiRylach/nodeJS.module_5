const LeftBar = require('./menu/left_bar.menu');

//for all pages, except for guest page
class MasterPage {
    constructor() {
        this.url = "https://vk.com/";
        this.leftBar = new LeftBar();
    };

    openPage(){
       return browser.get(this.url);
    }

}

module.exports = MasterPage;