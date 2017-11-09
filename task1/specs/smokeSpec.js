"use strict";

const world = require('../pages/world');

const login = "+375293507246";
const password = "7281hitman";

describe('Test', ()=> {

  describe("Log in:",()=>{
      it("should open home page for guest", ()=>{
          world.guestPage.openPage();
          expect(browser.getTitle()).toBe('Welcome! | VK');
      });

      it("should login", ()=>{
          browser.wait(EC.visibilityOf(world.guestPage.login, defTimeoutExplicit));
          elementHelper.login(login, password, world.guestPage.login,
                              world.guestPage.password, world.guestPage.signInBtn);
      });
  });

  describe("Sending message:",()=> {

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
          browser.wait(EC.visibilityOf(world.userPage.inputMessage, defTimeoutExplicit));
          elementHelper.setElementValue("Привет, как дела?", world.userPage.inputMessage);
          utils.highlightSuccess(world.userPage.sendButton);
          utils.createScreenshot();
          world.userPage.sendButton.click();
      });

  });

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
            utils.highlightPlusScreen(world.userPage.numberLikes, true);

            let numberLikesBefore = 0;
            let isLiked = false;

            //numbers of likes before
            world.userPage.numberLikes.getText()
                .then( numberLikes => numberLikesBefore = +numberLikes )

                //check liked or not before click
                .then( ()=>  world.userPage.likeProfilePhoto.getAttribute("class") )
                .then( classes => isLiked = (classes.indexOf("pv_liked") > -1) )

                //screenshot after click
                .then( ()=>{
                    world.userPage.likeProfilePhoto.click();
                    utils.highlightPlusScreen(world.userPage.numberLikes, true);
                })
                .then( ()=> world.userPage.numberLikes.getText() )
                .then( (numberLikes)=>{
                    if(isLiked){
                        expect(+numberLikes).toBe(numberLikesBefore - 1);
                    }else{
                        expect(+numberLikes).toBe(numberLikesBefore + 1)
                    }
                })

        });

  });

    describe("Post:",()=>{
        it("should open home page for user", ()=>{
            world.userPage.openPage();
            expect(browser.getTitle()).toBe('Новости');
        });

        it("should be on page of my profile", ()=>{
            browser.wait(EC.visibilityOf(world.userPage.leftBar.myProfile, defTimeoutExplicit));
            world.userPage.leftBar.myProfile.click();
        });

        it("number of records after publication", ()=>{
            browser.wait(EC.titleIs('Афанасий Игнатов'), defTimeoutExplicit);

            let numberPostsBefore = 0;
            world.userPage.postHeaders.count()
                .then( (number)=>{
                    numberPostsBefore = number;
                    elementHelper.setElementValue("Test", world.userPage.inputPost);
                    world.userPage.postBtn.click();
                    browser.sleep(500);
                    return world.userPage.postHeaders.count()
                })
                .then( (number)=> expect(number).toBe(numberPostsBefore + 1) )
        });
    });

});
