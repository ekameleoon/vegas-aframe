"use strict" ;

import { Text } from 'molecule/render/aframe/display/Text.js' ;

export const home_title =
[
    {
        id         : "home_title_front" ,
        type       : Text ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_title"       } ,
            { name : "#init" , locale : "home_title"       } ,
            { name : "#init" , config : "home_title_front" }
        ]
    },
    {
        id         : "home_title_back" ,
        type       : Text ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_title"      } ,
            { name : "#init" , config : "home_title_back" }
        ]
    }
];
