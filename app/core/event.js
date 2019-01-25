const constant = require(__basePath + 'app/config/constant');
const Emitter  = require('events');

class CommunicationEventEmitter extends Emitter {

}

class MigrationEventEmitter extends Emitter {

}

module.exports = {
    communicationEventEmitter: (new CommunicationEventEmitter),
    migrationEventEmitter    : (new MigrationEventEmitter)
};