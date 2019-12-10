var layout = require('../common/layout');
var content = require('./baas.ejs');

module.exports = layout(content, {
    title: '区块链基础设施平台BaaS-北京好扑科技官网',
    keywords: '区块链基础设施平台BaaS,商业级区块链,区块链云服务',
    description: '区块链基础设施平台BaaS，将区块链框架嵌入云计算平台，利用云服务基础设施的部署和管理优势，真正匹配商业需求，具备行业定制、快速构建、可视化操作、云监控平台、私有云实施等特点。'
});
