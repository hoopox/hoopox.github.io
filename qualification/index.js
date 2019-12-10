var layout = require('../common/layout');
var content = require('./index.ejs');

module.exports = layout(content, {
    title: '企业资质-北京好扑科技信息有限公司官网',
    keywords: '好扑,好扑科技,hoopox,北京好扑,北京好扑科技公司',
    description: '北京好扑科技信息有限公司是中国区块链技术和产业发展论坛成员单位、工信部中国电子技术标准化研究院《信息技术区块链和分布式账本技术参考架构》国家标准编写成员单位，同时也是AWS和华为云的重要技术合作伙伴。'
});
