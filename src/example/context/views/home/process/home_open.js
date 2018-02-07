"use strict" ;

import { HomeOpenAfter } from '@app/views/home/process/HomeOpenAfter.js' ;

export var home_open =
[
    {
        id         : "home_open_after" ,
        type       : HomeOpenAfter ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "sky" , ref : "sky" }
        ]
    }
];
