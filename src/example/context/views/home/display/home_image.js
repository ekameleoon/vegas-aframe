"use strict" ;

import { Image } from 'molecule/render/aframe/display/Image.js' ;

export const home_image =
[
    {
        id         : "home_image_front" ,
        type       : Image ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_image"       } ,
            { name : "#init" , config : "home_image_front" }
        ]
    },
    {
        id         : "home_image_back" ,
        type       : Image ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "home_image"      } ,
            { name : "#init" , config : "home_image_back" }
        ]
    }
];
