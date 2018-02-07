"use strict" ;

import { Text } from 'molecule/render/aframe/display/Text.js' ;

export const home_subtitle =
[
    {
        id         : "home_subtitle_front" ,
        type       : Text ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_subtitle"       } ,
            { name : "#init" , locale : "home_subtitle"       } ,
            { name : "#init" , config : "home_subtitle_front" }
        ]
    },
    {
        id         : "home_subtitle_back" ,
        type       : Text ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_subtitle"      } ,
            { name : "#init" , config : "home_subtitle_back" }
        ]
    }
];
