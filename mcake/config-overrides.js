const {override,addBabelPlugin,addBabelPlugins, addDecoratorsLegacy,disableEsLint,useBabelRc,fixBabelImports} = require('customize-cra')


module.exports = override(
    addDecoratorsLegacy(),
    // addBabelPlugin("@babel/plugin-proposal-decorators", { "legacy": true }),
    // addBabelPlugins(),
    disableEsLint(),
    //useBabelRc(),
    fixBabelImports('import',{ libraryName: "antd", style: "css" }),
    // fixBabelImports('import',{ libraryName: "antd", style: "css" },'antdm')
)