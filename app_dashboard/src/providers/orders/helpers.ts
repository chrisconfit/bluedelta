const _getDefaultButton = (user) => {
    let _defaultName = (user): string => (user.commonButton) ? user.commonButton.name : 'Brass Button';
    let _defaultThumb = (user): string => (user.commonButton) ? user.commonButton.thumb : 'brass_button.png';
    let _defaultLayer = (user): string => (user.commonButton) ? user.commonButton.layer : 'brass_button_layer';
    return {
        name: _defaultName(user),
        thumb: _defaultThumb(user),
        layer: _defaultLayer(user)
    }
}

const _getDefaultFabric = (user) => {
    let _defaultName = (user): string => (user.commonFabric) ? user.commonFabric.name : 'Denim';
    let _defaultWeight = (user): number => (user.commonFabric) ? user.commonFabric.weight : 10;
    let _defaultDescription = (user): string => (user.commonFabric) ? user.commonFabric.description : 'Good Old Classic Denim Fabric';
    let _defaultMaterials = (user): string => (user.commonFabric) ? user.commonFabric.materials : 'Cotton, Plutonium, etc...';    
    let _defaultSupplier = (user): string => (user.commonFabric) ? user.commonFabric.supplier : 'The Denim Trees of Mississippi';
    return {
        name: _defaultName(user),
        weight: _defaultWeight(user),
        description: _defaultDescription(user),
        materials: _defaultMaterials(user),
        supplier: _defaultSupplier(user)
    }
}

const _getDefaultThread = (user) => {
    let _defaultName = (user): string => (user.commonThread) ? user.commonThread.name : 'Brown Thread';
    let _defaultThumb = (user): string => (user.commonThread) ? user.commonThread.thumb : 'brown_thread.png';
    let _defaultLayer = (user): string => (user.commonThread) ? user.commonThread.layer : 'default_layer';
    return {
        name:  _defaultName(user),
        thumb: _defaultThumb(user),
        layer: _defaultLayer(user)
    }
}

const _getDefaultMeasurement = (user) => {
    let _defaultWaist = (user): number => (user.commonMeasurement) ? user.commonMeasurement.waist : 32;
    let _defaultLeg = (user): number => (user.commonMeasurement) ? user.commonMeasurement.leg : 32;
    return {
        userId: user.userId,
        waist: _defaultWaist(user),
        leg: _defaultLeg(user)
    }
}

export {
    _getDefaultButton,
    _getDefaultFabric,
    _getDefaultMeasurement,
    _getDefaultThread
}







