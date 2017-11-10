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
          elementHelper.clickWithWait(world.feedPage.leftBar.friends, defTimeoutExplicit)
      });

      it("go to profile recipient", () => {
          elementHelper.clickWithWait(world.friendsPage.nameTestFriend, defTimeoutExplicit);
      });

      it("send message", ()=>{
          elementHelper.clickWithWait(world.userPage.writeMessageBtn, defTimeoutExplicit);
          elementHelper.setElementValueWithWait("Привет, как дела?", world.userPage.inputMessage, defTimeoutExplicit);
          utils.highlightPlusScreen(world.userPage.sendButton, true);
          world.userPage.sendButton.click();
      });

  });

  describe("Like for profile photo:",()=> {

        it("should open home page for user", ()=>{
            world.userPage.openPage();
            expect(browser.getTitle()).toBe('Новости');
        });

        it("go to list of friends", ()=>{
            elementHelper.clickWithWait(world.feedPage.leftBar.friends, defTimeoutExplicit);
        });

        it("go to profile recipient", ()=>{
            browser.wait(EC.visibilityOf(world.friendsPage.nameTestFriend, defTimeoutExplicit));
            world.friendsPage.nameTestFriend.click();
        });

        it("click profile photo", ()=>{
            elementHelper.clickWithWait(world.userPage.profilePhoto, defTimeoutExplicit);
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
                        expect(+numberLikes).toBe(numberLikesBefore + 1);
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
            elementHelper.clickWithWait(world.userPage.leftBar.myProfile, defTimeoutExplicit);
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
