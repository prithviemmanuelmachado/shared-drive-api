const Notification = require('../models/notification');

module.exports.create = function(body, successCallback, errorCallback){
    const newNotification = new Notification({
        createdBy: body.createdBy,
        createdFor: body.createdFor,
        createdOn: Date.now(),
        type: body.type,
        body: body.body,
        state: 'active'
    });                
    
    newNotification.save()
    .then(() => {
        successCallback();
    })
    .catch((err) => {
        console.log(err);
        errorCallback();
    });
}