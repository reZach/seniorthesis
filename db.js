
// Stores database information
module.exports = {
    'url': 'mongodb://localhost/balance',
    'onStartConnect': function(err){
        if(err) {
            console.log('Error connecting to [mongodb://localhost/balance]: ', err);
        } else {
            console.log('Connected to [mongodb://localhost/balance]');
        }
    }
}