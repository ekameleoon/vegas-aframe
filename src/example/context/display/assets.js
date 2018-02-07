"use strict" ;

// import { Audio }  from 'molecule/render/dom/medias/Audio.js' ;
import { Img } from 'molecule/render/dom/display/Img.js' ;

import { Assets } from 'molecule/render/aframe/display/Assets.js' ;

export var assets =
[
    {
        id         : "assets" ,
        type       : Assets ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "addChild" , args : [ { ref : "home_image" } ] }
        ]
    },

    // // home
    // {
    //     id         : "home_audio" ,
    //     type       : Audio ,
    //     properties : [ { name : "#init" , config : "home_audio" } ]
    // },
    {
        id         : "home_image" ,
        type       : Img ,
        properties : [ { name : "#init" , config : "home_image" } ]
    }
];
