"use strict";

const world = require('../pages/world');

const login = "login";
const password = "pass";

describe('Test', ()=> {

  beforeEach(()=>{
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  describe("Log in:",()=>{
      it("should open home page for guest", (done)=>{
          world.guestPage.open()
              .then( ()=> browser.getTitle() )
              .then( title=>expect(title).toBe('Welcome! | VK') )
              .then( ()=>done() );
      });

      it("should login", (done)=>{
          browser.wait(EC.visibilityOf(world.guestPage.login, defTimeoutExplicit))
              .then( ()=>world.guestPage.login.clear().sendKeys(login) )
              .then( ()=>world.guestPage.password.clear().sendKeys(password) )
              .then( ()=>world.guestPage.signInBtn.click() )
              .then( ()=>done() );
      });
  });

  describe("Sending message:",()=> {

      it("go to list of friends", (done) => {
          browser.wait(EC.visibilityOf(world.feedPage.leftBar.friends, defTimeoutExplicit))
              .then(() => world.feedPage.leftBar.friends.click())
              .then(() => done());
      });

      it("go to profile recipient", (done) => {
          browser.wait(EC.visibilityOf(world.friendsPage.nameTestFriend, defTimeoutExplicit))
              .then(() => world.friendsPage.nameTestFriend.click())
              .then(() => done());
      });

      it("send message", (done)=>{
          browser.wait(EC.visibilityOf(world.userPage.writeMessageBtn, defTimeoutExplicit))
              .then( ()=> world.userPage.writeMessageBtn.click() )
              .then( ()=> browser.wait(EC.visibilityOf(world.userPage.txtAreaMsg, defTimeoutExplicit)) )
              .then( ()=> world.userPage.txtAreaMsg.sendKeys("Привет, как дела?") )
              .then( ()=> utils.highlightSuccess(world.userPage.sendButton) )
              .then( ()=> utils.createScreenshot() )
              .then( ()=> world.userPage.sendButton.click() )
              .then( ()=>done() );
      });

  });

  describe("Like for profile photo:",()=> {

        it("should open home page for user", (done)=>{
            world.userPage.open()
                .then( ()=> browser.getTitle() )
                .then( title=>expect(title).toBe('Новости') )
                .then( ()=>done() );
        });

        it("go to list of friends", (done)=>{
            browser.wait(EC.visibilityOf(world.feedPage.leftBar.friends, defTimeoutExplicit))
                .then(()=> world.feedPage.leftBar.friends.click())
                .then( ()=>done() );
        });

        it("go to profile recipient", (done)=>{
            browser.wait(EC.visibilityOf(world.friendsPage.nameTestFriend, defTimeoutExplicit))
                .then(()=> world.friendsPage.nameTestFriend.click())
                .then( ()=>done() );
        });

        it("click profile photo", (done)=>{
            browser.wait(EC.visibilityOf(world.userPage.profilePhoto, defTimeoutExplicit))
                .then( ()=> world.userPage.profilePhoto.click() )
                .then( ()=>done() );
        });

        it("number likes of profile photo after click", (done)=>{
            let isLiked = false;
            let numberLikesBefore;
            browser.wait(EC.visibilityOf(world.userPage.likeProfilePhoto, defTimeoutExplicit))
                .then( ()=> utils.highlightSuccess(world.userPage.numberLikes) )
                .then( ()=> utils.createScreenshot() )
                .then( ()=>world.userPage.numberLikes.getText() )
                .then( (numberLikes)=> numberLikesBefore = +numberLikes)
                .then( ()=> world.userPage.likeProfilePhoto.getAttribute("class"))
                .then( (classes)=> isLiked = (classes.indexOf("pv_liked") > -1) )
                .then( ()=> world.userPage.likeProfilePhoto.click() )
                .then( ()=> utils.highlightSuccess(world.userPage.numberLikes) )
                .then( ()=> utils.createScreenshot() )
                .then( ()=> world.userPage.numberLikes.getText() )
                .then( (numberLikes)=>{
                    if(isLiked){
                        expect(+numberLikes).toBe(numberLikesBefore - 1);
                    }else{
                        expect(+numberLikes).toBe(numberLikesBefore + 1)
                    }
                })
                .then( ()=>done() );
        });

  });

    describe("Post:",()=>{
        it("should open home page for user", (done)=>{
            world.userPage.open()
                .then( ()=> browser.getTitle() )
                .then( title=>expect(title).toBe('Новости') )
                .then( ()=>done() );
        });

        it("should be on my page", (done)=>{
            browser.wait(EC.visibilityOf(world.userPage.leftBar.myProfile, defTimeoutExplicit))
                .then(()=> world.userPage.leftBar.myProfile.click())
                .then( ()=>done() );
        });

        it("number of records after publication", (done)=>{
            let numberPostsBefore = 0;
            browser.wait(EC.visibilityOf(world.userPage.inputPost, defTimeoutExplicit))
                .then( ()=> world.userPage.postHeaders.count() )
                .then( (number)=> numberPostsBefore = number )
                .then( ()=> world.userPage.inputPost.clear().sendKeys('Test'))
                .then( ()=> world.userPage.postBtn.click())
                .then( ()=> world.userPage.postHeaders.count() )
                .then( (number)=> expect(number).toBe(numberPostsBefore + 1) )
                .then( ()=>done() );
        });
    });

});
