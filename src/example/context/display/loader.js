"use strict" ;

import { Div } from 'molecule/render/dom/display/Div.js' ;

export const loader =
[
    {
        id         : "loader" ,
        type       : Div ,
        singleton  : true ,
        lazyInit   : true ,
        properties : [ { name : "#init" , config : "loader" } ]
    }
];
