"use strict" ;

import { Scene } from 'molecule/render/aframe/display/Scene.js' ;

export const scene =
[
    {
        id         : "scene" ,
        type       : Scene ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init"    , config : "scene" } ,
            { name : "addChild" , args   : [ { ref : "camera" } ] } ,
            { name : "addChild" , args   : [ { ref : "sky"    } ] }
        ]
    }
];
