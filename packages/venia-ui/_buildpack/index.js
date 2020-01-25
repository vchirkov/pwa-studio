const path = require('path');
const ConstDependency = require('webpack/lib/dependencies/ConstDependency')

const isRCR = mod =>
    mod.resource ===
    path.resolve(
        __dirname,
        '../lib/components/RichContent/richContentRenderers.js'
    );

module.exports = class RendererCollectorPlugin {
    apply(compiler) {
        const name = this.constructor.name;
        compiler.hooks.compilation.tap(name, (compilation, { normalModuleFactory }) => {
            const handler = parser => {
                parser.hooks.program.tap(name, ast => {
                    if (isRCR(parser.state.module)) {
                        parser.hooks.import.tap()
                    }
                });
            };

            normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap(name, handler);
            normalModuleFactory.hooks.parser
                .for('javascript/dynamic')
                .tap(name, handler);
            normalModuleFactory.hooks.parser
                .for('javascript/esm')
                .tap(name, handler);
        });
    }
};
