import {Router} from 'express';

import {Enums, Affinity, Penetration} from './mock/enums';
import {Hierarchy} from './mock/hierarchy';

const metadata = Router();

function convertEnum (enumeration) {
    var output = {};
    for(var key in Object.keys(enumeration)) {
        output[key]
    }
}

metadata.get('/enums', function(req, res, next) {
  res.send(Enums);
});

metadata.get('/', function(req, res, next) {
  res.send(Hierarchy);
});

export default metadata;

