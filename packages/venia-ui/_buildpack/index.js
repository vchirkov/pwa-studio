const path = require('path');
const loader = require.resolve('./rendererCollectionLoader');

const isRCR = mod =>
    mod.resource ===
    path.resolve(
        __dirname,
        '../lib/components/RichContent/richContentRenderers.js'
    );

module.exports = class RendererCollectorPlugin {
    apply(compiler) {
        const name = this.constructor.name;
        compiler.hooks.compilation.tap(name, compilation => compilation.hooks.normalModuleLoader.tap(name, (loaderContext, module) => {
            if (isRCR(module) && !module.loaders.some(({ ident }) => ident === __filename)) {
                module.loaders.push({
                    ident: __filename,
                    loader,
                    options: {
                        renderers: {
                            'PageBuilder': '@magento/pagebuilder'
                        }
                    }
                })
            }
        }))

        // compiler.hooks.compilation.tap(name, (compilation, { normalModuleFactory }) => {
            // const handler = parser => {
            //     parser.hooks.program.tap(name, ast => {
            //         if (isRCR(parser.state.module)) {
            //             parser.hooks.import.tap()
            //         }
            //     });
            // };

            // normalModuleFactory.hooks.parser
            //     .for('javascript/auto')
            //     .tap(name, handler);
            // normalModuleFactory.hooks.parser
            //     .for('javascript/dynamic')
            //     .tap(name, handler);
            // normalModuleFactory.hooks.parser
            //     .for('javascript/esm')
            //     .tap(name, handler);
        // });
    }
};
