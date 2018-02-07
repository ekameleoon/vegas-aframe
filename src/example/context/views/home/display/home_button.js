"use strict" ;

import { Button } from 'molecule/render/aframe/display/Button.js' ;

import { SelectState } from '../../../../controllers/states/SelectState.js' ;

import { StateList } from '../../../../StateList.js' ;

export const home_button =
[
    {
        id         : "home_button_back" ,
        type       : Button ,
        singleton  : true ,
        lazyInit   : true ,
        dependsOn  : [ "home_button_click" ] ,
        properties :
        [
            { name : "#init" , config : "home_button"      } ,
            { name : "#init" , config : "home_button_back" }
        ]
    },
    {
        id         : "home_button_front" ,
        type       : Button ,
        singleton  : true ,
        lazyInit   : true ,
        dependsOn  : [ "home_button_click" ] ,
        properties :
        [
            { name : "#init" , config : "home_button"       } ,
            { name : "#init" , config : "home_button_front" }
        ]
    },
    {
        id         : "home_button_click" ,
        type       : SelectState ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "current" , value : StateList.DOLPHINS    } ,
            { name : "states"  , ref   : "body_states_model" }
        ],
        listeners :
        [
            { dispatcher : "home_button_back.element"  , type : "click" } ,
            { dispatcher : "home_button_front.element" , type : "click" }
        ]
    }
];
