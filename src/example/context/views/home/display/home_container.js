'use strict' ;

import { AEntity } from 'molecule/render/aframe/display/AEntity.js' ;

export const home_container =
[
    {
        id         : 'home_container' ,
        type       : AEntity ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : 'addChild' , args : [ { ref : 'home_sound'          } ] } ,
            { name : 'addChild' , args : [ { ref : 'home_title_back'     } ] } ,
            { name : 'addChild' , args : [ { ref : 'home_title_front'    } ] } ,
            { name : 'addChild' , args : [ { ref : 'home_subtitle_back'  } ] } ,
            { name : 'addChild' , args : [ { ref : 'home_subtitle_front' } ] }
        ]
    }
];
