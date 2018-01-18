import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


//publish user data in mini mongo
Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userID}, {
    fields: {
      roles: 1
    }
  });
});
