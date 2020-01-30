const name = '@magento/venia-ui';
module.exports = bus => {
    bus.state[name] = {
        richContentRenderers: []
    };
    bus.targets[name] = {
        richContentRenderers: new bus.Tapable.SyncHook(['renderers'])
    };
}