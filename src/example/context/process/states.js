"use strict" ;

import { Chain }     from 'system/process/Chain.js' ;
import { TaskGroup } from 'system/process/TaskGroup.js' ;

export var states =
[
    {
        id         : 'states_chain' ,
        type       : Chain ,
        singleton  : true ,
        lazyInit   : true ,
        properties : [ { name : 'mode' , value : TaskGroup.TRANSIEN } ]
    }
];