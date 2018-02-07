"use strict" ;

import { run } from './process/run.js' ;
import { states } from './process/states.js' ;

export var tasks = [].concat
(
    run,
    states
);