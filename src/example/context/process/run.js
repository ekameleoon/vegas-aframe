"use strict" ;

import { Chain }     from 'system/process/Chain.js' ;
import { TaskGroup } from 'system/process/TaskGroup.js' ;

import { BuildApplication }   from '../../process/application/BuildApplication.js' ;
import { InitApplication }    from '../../process/application/InitApplication.js' ;
import { PreloadApplication } from '../../process/application/PreloadApplication.js' ;

export var run =
[
    {
        id         : "run" ,
        type       : Chain ,
        init       : "run" ,
        properties :
        [
            { name : "mode" , value : TaskGroup.TRANSIENT } ,
            { name : "add"  , args  : [ { ref : "body_states_init"    } ] } ,
            { name : "add"  , args  : [ { ref : "build_application"   } ] } ,
            //{ name : "add"  , args  : [ { ref : "preload_application" } ] } ,
            { name : "add"  , args  : [ { ref : "init_application"    } ] }
        ]
    },
    {
        id         : "build_application" ,
        type       : BuildApplication ,
        properties :
        [
            { name : "factory" , ref : "#this" }

        ]
    },
    {
        id         : "init_application" ,
        type       : InitApplication ,
        properties :
        [
            { name : "camera" , ref : "camera"  } ,
            { name : "cursor" , ref : "cursor"  } ,
            { name : "states" , ref : "body_states_model" }
        ]
    },
    {
        id         : "preload_application" ,
        type       : PreloadApplication ,
        properties :
        [
            { name : "assets" , ref : "assets" } ,
            { name : "scene"  , ref : "scene"  } ,
            { name : "stage"  , ref : "stage"  }
        ]
    }
];
