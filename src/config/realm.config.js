import Realm from 'realm'
import models from './models.config'
import _ from 'lodash'

import React from 'react';
import {
    NativeModules
} from 'react-native';

class RealmConfig {
    constructor(models) {
        this._models = models
        this.instance = new Realm({schema: _.values(this._models)})
    }
}

export default new RealmConfig(models)