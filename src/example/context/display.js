"use strict" ;

import { assets }    from './display/assets.js' ;
import { camera }    from './display/camera.js' ;
import { container } from './display/container.js' ;
import { cursor }    from './display/cursor.js' ;
import { loader }    from './display/loader.js' ;
import { scene }     from './display/scene.js' ;
import { stage }     from './display/stage.js' ;
import { sky }       from './display/sky.js' ;

export var display = [].concat
(
    assets,
    camera,
    container,
    cursor,
    loader,
    scene,
    sky,
    stage
);
