module.exports = bus => {
    bus.targets['@magento/venia-ui'].richContentRenderers.tap('@magento/pagebuilder', richContentRenderers => {
        richContentRenderers.add('PageBuilder', '@magento/pagebuilder');
    });
}