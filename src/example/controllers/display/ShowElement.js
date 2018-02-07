"use strict" ;

import { fastformat } from 'core/strings/fastformat.js' ;
import { Receiver }   from 'system/signals/Receiver.js' ;

import { logger } from '../../logging/logger.js' ;

/**
 * This receiver is invoke when the element is added to stage.
 * @name ShowElement
 * @class
 * @memberof vr.controllers.display
 * @constructor
 */
export function ShowElement()
{
    Object.defineProperties( this ,
    {
        /**
         * @name tween
         * @memberof vr.controllers.display.ShowElement
         * @instance
         */
        tween : { writable : true , value : null }
    })
}

ShowElement.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ShowElement } ,

    /**
     * Invoke when the element is added to the stage.
     * @name reveive
     * @memberof vr.controllers.display.ShowElement
     * @instance
     * @function
     */
    receive : { value : function ()
    {
        try
        {
            /* jshint -W116*/
            if( !this.tween ) throw new Error( 'tween' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null."  , er.message )  ) ;
            return ;
        }

        ///////////

        this.tween.run() ;

        ///////////
    }}

});
