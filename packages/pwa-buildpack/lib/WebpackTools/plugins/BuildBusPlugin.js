const makeDebug = require('debug');
const Tapable = require('tapable');
const pertain = require('pertain');

const debug = makeDebug('pwa-buildpack:BuildBus');
const busMap = new WeakMap();

let id = 0;
class BuildBus {
    constructor(compiler) {
        id += .001;
        this.id = `BuildBus-${id.toFixed(3).slice(2)}`;
        this.compiler = compiler;
        debug('%s created', this.id);
        this.targets = {};
        this.state = {};
    }
    runPhase(phase) {
        pertain(this.compiler.options.context, `pwa-studio.targets.${phase}`).forEach(dep => {
            makeDebug(`pwa-buildpack:BuildBus:${dep.name}:${phase}`)('running on %s', this.id);
            require(dep.path)(this);
        })
    }
}

BuildBus.prototype.Tapable = Tapable;
BuildBus.for = compiler => {
    let bus = busMap.get(compiler);
    if (!bus) {
        bus = new BuildBus(compiler);
        busMap.set(compiler, bus);
    }
    return bus;
}

class BuildBusPlugin {
    apply(compiler) {
        const bus = BuildBus.for(compiler);
        bus.runPhase('declare');
        bus.runPhase('intercept');
    }
}

module.exports = BuildBusPlugin;
