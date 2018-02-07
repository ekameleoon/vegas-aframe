"use strict" ;

import { Sky } from 'molecule/render/aframe/display/Sky.js' ;

export var sky =
[
    {
        id         : "sky" ,
        type       : Sky ,
        singleton  : true ,
        lazyInit   : true ,
        properties : [ { name : "#init" , config : "sky" } ]
    }
];