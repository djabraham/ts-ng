import {Router} from 'express';

import {Tasks} from './mock/tasks';

const search = Router();

function convertEnum (enumeration) {
    var output = {};
    for(var key in Object.keys(enumeration)) {
        output[key]
    }
}

// Example of shared types on server side
var noResults = Tasks.data.length;

search.get('/tasks', function(req, res, next) {
  res.send(Tasks);
});

export default search;

