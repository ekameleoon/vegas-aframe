"use strict"

import { Stage } from 'graphics/display/Stage' ;

import 'molecule/render/aframe/components.js' ;

import { config } from './config/config.js' ;
import { logger } from './logging/logger.js' ;

import { definitions } from './definitions.js' ;
import { factory } from './factory.js' ;

/**
 * Creates a new Application instance.
 * @name Application
 * @class
 * @memberof example
 */
export function Application()
{
    Stage.call( this ) ;
}

Application.prototype = Object.create( Stage.prototype ,
{
    constructor : { value : Application } ,

    /**
     * Initialize the application.
     */
    init : { value : function ()
    {
        if( config.debug ) { logger.debug( this + " init" ) ; }
        factory.finishIt.connect( this.ready.bind(this) , 0 , true ) ;
        factory.run( definitions );
    }},

    /**
     * Invoked when the application is ready.
     */
    ready : { value : function ()
    {
        if( config.debug ) { logger.debug( this + " ready" ) ; }
        factory.getObject( "run" ) ;
    }}
});