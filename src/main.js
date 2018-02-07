"use strict" ;

//////////////////////////////// IMPORTS

import 'polyfill/index.js' ;

import { sayHello }  from 'core/hello.js' ;
import { ucFirst }   from 'core/strings/ucFirst.js' ;

import { Application } from './example/Application.js' ;

export { sayHello }  from 'core/hello.js' ;
export { skipHello } from 'core/hello.js' ;

//////////////////////////////// MAIN

/**
 * The metadatas object to describe the application.
 * @name metas
 * @property {string} name - The name of the library
 * @property {string} description - The description of the library
 * @property {string} version - The version of the library
 * @property {string} license - The license of the library
 * @property {string} url - The url of the library
 * @type Object
 * @global
 * @example
 * trace( core.dump( metas ) ) ;
 */
export const metas = Object.defineProperties( {} ,
{
    name        : { enumerable : true , value : ucFirst('<@NAME@>') },
    description : { enumerable : true , value : "<@DESCRIPTION@>"   },
    version     : { enumerable : true , value : '<@VERSION@>'       },
    license     : { enumerable : true , value : "<@LICENSE@>"       },
    url         : { enumerable : true , value : '<@HOMEPAGE@>'      }
});

try
{
    if ( window )
    {
        window.addEventListener( 'load' , function load()
        {
            window.removeEventListener( "load", load, false ) ;

            sayHello( metas.name,metas.version,metas.url ) ;

            let application = new Application();

            application.init()  ;

        }, false );
    }
}
catch( error )
{
    if( console )
    {
        console.warn( error ) ;
    }
}

