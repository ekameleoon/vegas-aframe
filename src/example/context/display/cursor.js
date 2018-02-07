"use strict" ;

import { Cursor } from 'molecule/render/aframe/display/Cursor.js' ;
import { Circle } from 'molecule/render/aframe/display/Circle.js' ;

import { CursorOver } from '../../controllers/display/CursorOver.js' ;
import { CursorOut }  from '../../controllers/display/CursorOut.js' ;

import { Tween } from 'system/transitions/Tween.js' ;

export const cursor =
[
    {
        id         : "cursor" ,
        type       : Cursor ,
        singleton  : true ,
        lazyInit   : true ,
        generates  : [ "cursor_over_receiver" , "cursor_out_receiver" ] ,
        properties :
        [
            { name : "#init" , config : "cursor" } ,

            // children
            { name : "addChild" , args : [ { ref : "cursor_circle" } ] } ,
            { name : "addChild" , args : [ { ref : "cursor_ring"   } ] }
        ]
    },
    {
        id         : "cursor_circle" ,
        type       : Circle ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "cursor_circle" }
        ]
    },
    {
        id         : "cursor_ring" ,
        type       : Circle ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init" , config : "cursor_ring" }
        ]
    },
    // controllers
    {
        id         : "cursor_over_receiver" ,
        type       : CursorOver ,
        properties :
        [
            { name : "cursor"    , ref : "cursor"            } ,
            { name : "sound"     , ref : "over_sound"        } ,
            { name : "tweenOver" , ref : "cursor_over_tween" } ,
            { name : "tweenOut"  , ref : "cursor_out_tween"  }
        ],
        receivers  : [ { signal : "cursor.over" } ]
    },
    {
        id         : "cursor_out_receiver" ,
        type       : CursorOut ,
        properties :
        [
            { name : "tweenOver" , ref : "cursor_over_tween" } ,
            { name : "tweenOut"  , ref : "cursor_out_tween"  }
        ],
        receivers  : [ { signal : "cursor.out" } ]
    },
    // tweens
    {
        id         : "cursor_over_tween" ,
        type       : Tween ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init"      , config : "cursor_over_tween" } ,
            { name : "target"     , ref    : "cursor_circle"     } ,
            { name : "duration"   , ref    : "cursor.duration"   } ,
            { name : "useSeconds" , ref    : "cursor.useSeconds" }
        ]
    },
    {
        id         : "cursor_out_tween" ,
        type       : Tween ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "#init"  , config : "cursor_out_tween" } ,
            { name : "target" , ref    : "cursor_circle"    }
        ]
    }
];
