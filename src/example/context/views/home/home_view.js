"use strict" ;

import { SceneView } from '../../../views/SceneView.js' ;

import { home_button }    from './display/home_button.js' ;
import { home_container } from './display/home_container.js' ;
import { home_image }     from './display/home_image.js' ;
import { home_sounds }    from './display/home_sounds.js' ;
import { home_subtitle }  from './display/home_subtitle.js' ;
import { home_title }     from './display/home_title.js' ;

import { home_close } from './process/home_close.js' ;
import { home_open }  from './process/home_open.js' ;

export const home_view =
[
    {
        id         : "home_view" ,
        type       : SceneView ,
        singleton  : true ,
        lazyInit   : true ,
        properties :
        [
            { name : "openAfter" , ref : "home_open_after" } ,
            { name : "container" , ref : "home_container"  } ,
            { name : "scene"     , ref : "scene"           }
        ]
    }
].concat
(
    // display

    home_button,
    home_container,
    home_image,
    home_sounds,
    home_subtitle,
    home_title,

    // process

    home_close,
    home_open
);
