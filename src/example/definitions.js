"use strict" ;

// --------- Dependencies

import { display } from './context/display.js' ;
import { tasks }   from './context/tasks.js' ;

import { controllers } from './context/controllers.js' ;
import { models }      from './context/models.js' ;
import { views }       from './context/views.js' ;

// ---------  IOC Definitions

export const definitions = [].concat
(
    display,
    tasks,
    controllers,
    models,
    views
);