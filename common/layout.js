var moduleExports = function(content, args) {
    var layout = require('./layout.ejs');
    var header = require('./header.ejs');
    var footer = require('./footer.ejs');
    args = args ? args : {};

    return function(params) {
        if(typeof args.subtitle === 'undefined')
            args.subtitle = '引领区块链底层技术新浪潮';

        params.htmlWebpackPlugin.args = args;
        params.htmlWebpackPlugin.layout = {
            header: header(params),
            content: content(params),
            footer: footer(params),
        };
        // console.log(params.compilation);
        return layout(params);
    };
};

module.exports = moduleExports;
