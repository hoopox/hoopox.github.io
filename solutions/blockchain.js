var layout = require('../common/layout');
var content = require('./blockchain.ejs');

module.exports = layout(content, {
    title: '企业级整体商业化解决方案aelf Enterprise-北京好扑科技官网',
    keywords: 'aelf Enterprise,区块链解决方案',
    description: 'aelf Enterprise是由好扑承研的、面向企业级用户的整体区块链商业化解决方案。该解决方案不基于任何已有的区块链开源项目，完全由好扑独立自主研发，属高自主可控区块链系统。'
});
