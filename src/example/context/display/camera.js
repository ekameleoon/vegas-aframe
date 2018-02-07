"use strict" ;

import { AEntity } from 'molecule/render/aframe/display/AEntity.js' ;
import { Sound } from 'molecule/render/aframe/display/Sound.js' ;

export const camera =
[
    {
        id         : "camera" ,
        type       : AEntity ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init"        , config : "camera" } ,
            { name : "setAttribute" , args  : [ { value : "camera" }        , { value : "" } ] } ,
            { name : "setAttribute" , args  : [ { value : "look-controls" } , { value : "" } ] }

            //{ name : "addChild" , args : [ { ref : "over_sound" } ] }
         ]
    },
    {
        id         : "over_sound" ,
        type       : Sound ,
        singleton  : true ,
        lazyInit   : true ,
        properties : [ { name : "#init" , config : "over_sound" } ]
    }
];
