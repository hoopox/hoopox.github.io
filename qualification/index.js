var layout = require('../common/layout');
var content = require('./index.ejs');

module.exports = layout(content, {subtitle: '企业资质'});
