var layout = require('./common/layout');
var content = require('./index.ejs');

module.exports = layout(content, {
    title: '北京好扑科技【官网】',
    keywords: '好扑,好扑科技,hoopox,北京好扑,北京好扑科技公司',
    description: '北京好扑信息科技有限公司(Hoopox)致力于推出去中心化云计算区块链网络，降低用户使用和管理成本，提高区块链开发、创建、部署的工作效率，提升数据存储方面的安全性。',
    googleVerification: '<meta name="google-site-verification" content="4Af7ealqlaWiEVGGrucjyLTAnts7PXlhnuqNgcTj7j0" />',
    baiduVerification: '<meta name="baidu-site-verification" content="uceaRdovvK" />',
    bingVerification: '<meta name="msvalidate.01" content="1E41448A23B147A2772183A7549469A1" />'
});
