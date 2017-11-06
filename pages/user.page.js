const MasterPage = require('./common/master.page');

class UserPage extends MasterPage{
    constructor() {
        super();
        this.writeMessageBtn = element(by.linkText("Написать сообщение"));
        this.profilePhoto = element(by.css('.page_avatar_img'));

        //profile_photo
        this.likeProfilePhoto = element(by.css("#pv_like"));
        this.numberLikes = element(by.css(".pv_like_count"));

        //message menu
        this.txtAreaMsg = element(by.css("#mail_box_editable"));
        this.sendButton = element(by.css("#mail_box_send"));
    };

}

module.exports = UserPage;