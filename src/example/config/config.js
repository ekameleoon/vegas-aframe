"use strict" ;

import { merge } from 'core/objects/merge.js' ;
import { State } from 'molecule/states/State.js' ;

import { StateList } from '../StateList.js' ;
import { ViewList }  from '../ViewList.js' ;

import { assets } from './display/assets.js' ;
import { camera } from './display/camera.js' ;
import { cursor } from './display/cursor.js' ;
import { loader } from './display/loader.js' ;
import { scene }  from './display/scene.js' ;
import { sky }    from './display/sky.js' ;

import { home } from './views/home.js' ;

export var config =
{
    // ------- application

    name : "application" ,

    debug   : "<@DEBUG@>" === "true" ,
    verbose : false ,

    // ------- states

    first  : StateList.HOME ,
    states :
    [
        new State( { id : StateList.HOME , view : ViewList.HOME } )
    ]
};

// display

merge(config,assets) ;
merge(config,camera) ;
merge(config,cursor) ;
merge(config,loader) ;
merge(config,scene) ;
merge(config,sky) ;

// views

merge(config,home) ;