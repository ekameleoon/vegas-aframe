"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { Receiver }   from 'system/signals/Receiver.js' ;

import { config } from '../../config/config.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This receiver is invoke when the mouse or touch is moved.
 * @name Move
 * @class
 * @memberof example.controllers.ui
 * @constructor
 */
export function Move()
{
    Object.defineProperties( this ,
    {
        /**
         * @name factory
         * @memberof example.controllers.ui.Move
         * @instance
         */
        factory : { writable : true , value : null }
    })
}

Move.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : Move } ,

    /**
     * Invoke the rendering of the application when the mouse is moved.
     * @name reveive
     * @memberof example.controllers.ui.Move
     * @instance
     * @function
     */
    receive : { value : function ()
    {
        try
        {
            /* jshint -W116*/
            if( !this.factory ) throw new Error( 'factory' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null."  , er.message )  ) ;
            return ;
        }

        ///////////

        if( config.debug && config.verbose )
        {
            logger.debug( this + " receive" ) ;
        }

        ///////////
    }}

});