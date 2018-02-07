"use strict" ;

import { expoOut } from 'core/easings/expoOut.js' ;

export var cursor =
{
    cursor :
    {
        duration   : 2 ,
        useSeconds : true ,
        z          : -1
    },
    cursor_circle :
    {
        color       : 'red',
        opacity     : 0.3 ,
        radius      : 0.01 ,
        shader      : 'flat' ,
        thetaLength : 0 ,
        thetaStart  : 90,
        z : 0.01
    },
    cursor_ring :
    {
        color   : 'white',
        opacity : 0.2 ,
        radius  : 0.015 ,
        shader  : 'flat' ,
    },
    cursor_over_tween :
    {
        easing     : expoOut,
        from       : { thetaLength : 0   } ,
        to         : { thetaLength : 360 }
    },
    cursor_out_tween :
    {
        duration   : 2 ,
        useSeconds : true ,
        easing     : expoOut,
        from       : { thetaLength : 360 } ,
        to         : { thetaLength : 0   }
    }
};
