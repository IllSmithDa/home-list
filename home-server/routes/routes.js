const controller  = require('../controller/controller');

module.exports = (server) => {
    server.route('/server/parseHome')
      .post(controller.parseHomeAddresses)
}