"use strict";

const world = require('../pages/world');

const login = "login";
const password = "pass";

describe('Test', ()=> {

  describe("Log in:",()=>{
      it("should open home page for guest", ()=>{
          world.guestPage.openPage();
          expect(browser.getTitle()).toBe('Welcome! | VK');
      });

      it("should login", ()=>{
          browser.wait(EC.visibilityOf(world.guestPage.login, defTimeoutExplicit));
          world.guestPage.login.clear().sendKeys(login);
          world.guestPage.password.clear().sendKeys(password);
          world.guestPage.signInBtn.click();
      });
  });

  /*describe("Sending message:",()=> {

      it("go to list of friends", () => {
          browser.wait(EC.visibilityOf(world.feedPage.leftBar.friends, defTimeoutExplicit));
          world.feedPage.leftBar.friends.click();
      });

      it("go to profile recipient", () => {
          browser.wait(EC.visibilityOf(world.friendsPage.nameTestFriend, defTimeoutExplicit));
          world.friendsPage.nameTestFriend.click();
      });

      it("send message", ()=>{
          browser.wait(EC.visibilityOf(world.userPage.writeMessageBtn, defTimeoutExplicit));
          world.userPage.writeMessageBtn.click();
          browser.wait(EC.visibilityOf(world.userPage.txtAreaMsg, defTimeoutExplicit));
          world.userPage.txtAreaMsg.sendKeys("Привет, как дела?");
          utils.highlightSuccess(world.userPage.sendButton);
          utils.createScreenshot();
          world.userPage.sendButton.click();
      });

  });*/

  describe("Like for profile photo:",()=> {

        it("should open home page for user", ()=>{
            world.userPage.openPage();
            expect(browser.getTitle()).toBe('Новости');
        });

        it("go to list of friends", ()=>{
            browser.wait(EC.visibilityOf(world.feedPage.leftBar.friends, defTimeoutExplicit));
            world.feedPage.leftBar.friends.click();
        });

        it("go to profile recipient", ()=>{
            browser.wait(EC.visibilityOf(world.friendsPage.nameTestFriend, defTimeoutExplicit));
            world.friendsPage.nameTestFriend.click();
        });

        it("click profile photo", ()=>{
            browser.wait(EC.visibilityOf(world.userPage.profilePhoto, defTimeoutExplicit));
            world.userPage.profilePhoto.click();
        });

        it("number likes of profile photo after click", ()=>{
            browser.wait(EC.visibilityOf(world.userPage.likeProfilePhoto, defTimeoutExplicit));

            //screenshot before click
            utils.highlightSuccess(world.userPage.numberLikes);
            utils.createScreenshot();

            let numberLikesBefore;
            world.userPage.numberLikes.getText()
                .then( (numberLikes)=> numberLikesBefore = +numberLikes);

            //check liked or not before click
            let isLiked = false;
            world.userPage.likeProfilePhoto.getAttribute("class")
                .then( (classes)=> isLiked = (classes.indexOf("pv_liked") > -1) );

            //screenshot after click
            world.userPage.likeProfilePhoto.click();
            utils.highlightSuccess(world.userPage.numberLikes);
            utils.createScreenshot();

            if(isLiked){
                expect(+world.userPage.numberLikes.getText()).toBe(numberLikesBefore - 1);
            }else{
                expect(+world.userPage.numberLikes.getText()).toBe(numberLikesBefore + 1)
            }

        });

  });

    /*describe("Post:",()=>{
        it("should open home page for user", ()=>{
            world.userPage.openPage();
            expect(browser.getTitle()).toBe('Новости');
        });

        it("should be on page of my profile", ()=>{
            browser.wait(EC.visibilityOf(world.userPage.leftBar.myProfile, defTimeoutExplicit));
            world.userPage.leftBar.myProfile.click();
        });

        it("number of records after publication", ()=>{
            browser.wait(EC.visibilityOf(world.userPage.inputPost, defTimeoutExplicit));
            let numberPostsBefore = world.userPage.postHeaders.length;
            world.userPage.inputPost.clear().sendKeys('Test');
            world.userPage.postBtn.click();
            browser.sleep(500);
            expect(world.userPage.postHeaders.count()).toBe(numberPostsBefore + 1);
        });
    });*/

});
