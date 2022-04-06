const Notification = require('./notification');

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
};

module.exports.setInactive = function(id, successCallback, errorCallback){ 
    Notification.findOneAndUpdate({_id: id}, { $set: {
        state: 'inactive'
    }}, (err, doc, re) => {
        if(err){
            console.log(err);
            errorCallback();
        }
        else{
            successCallback();
        }
    });
}