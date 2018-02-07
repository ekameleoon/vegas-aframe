"use strict" ;

import { AddState }          from 'molecule/states/controllers/AddState.js' ;
import { BeforeChangeState } from 'molecule/states/controllers/BeforeChangeState.js' ;
import { ChangeState }       from 'molecule/states/controllers/ChangeState.js' ;

import { InitStates } from 'molecule/states/process/InitStates.js' ;
import { StateModel } from 'molecule/states/StateModel.js' ;

export var states =
[
    {
        id        : "body_states_model" ,
        type      : StateModel ,
        dependsOn :
        [
            "body_states_add" ,
            "body_states_before_change" ,
            "body_states_change"
        ] ,
        singleton  : true ,
        lazyInit   : true ,
        properties : [ { name : "security" , value : false } ]
    },
    {
        id         : "body_states_init" ,
        type       : InitStates ,
        properties :
        [
            { name : "autoDequeue" , value : true                 } ,
            { name : "datas"       , config : "states"            } ,
            { name : "model"       , ref    : "body_states_model" }
        ]
    },
    {
        id        : "body_states_add" ,
        type      : AddState ,
        receivers : [ { signal : "body_states_model.added" } ]
    },
    {
        id        : "body_states_before_change" ,
        type      : BeforeChangeState ,
        receivers : [ { signal : "body_states_model.beforeChanged" } ] ,
        args      : [ { ref : "states_chain" } , { ref : "#this" } ]
    },
    {
        id        : "body_states_change" ,
        type      : ChangeState ,
        receivers : [ { signal : "body_states_model.changed" } ] ,
        args      : [ { ref : "states_chain" } , { ref : "#this" } ]
    }
];