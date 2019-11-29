var layout = require('../common/layout');
var content = require('./baas.ejs');

module.exports = layout(content, {subtitle: '区块链基础设施平台BaaS'});
