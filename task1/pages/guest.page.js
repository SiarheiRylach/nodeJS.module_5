class GuestPage {
    constructor() {
        this.url = "https://vk.com/";
        this.login = element(by.css("#index_email"));
        this.password = element(by.css('#index_pass'));
        this.signInBtn = element(by.css('#index_login_button'));
    };

    open(){
        return browser.get(this.url);
    }

}

module.exports = GuestPage;