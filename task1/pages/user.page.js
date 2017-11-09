const MasterPage = require('./common/master.page');

class UserPage extends MasterPage{
    constructor() {
        super();
        this.writeMessageBtn = element(by.css(".profile_btn_cut_left"));
        this.profilePhoto = element(by.css('.page_avatar_img'));

        //profile_photo
        this.likeProfilePhoto = element(by.css("#pv_like"));
        this.numberLikes = element(by.css(".pv_like_count"));

        //message menu
        this.inputMessage= element(by.css("#mail_box_editable"));
        this.sendButton = element(by.css("#mail_box_send"));

        //post button
        this.inputPost = element(by.css("#post_field"));
        this.postBtn = element(by.css("#send_post"));
        this.postHeaders = element.all(by.css('.post_header'));
    };

}

module.exports = UserPage;