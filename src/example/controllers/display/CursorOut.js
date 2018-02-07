"use strict" ;

import { fastformat } from 'core/strings/fastformat.js' ;
import { Receiver }   from 'system/signals/Receiver.js' ;

import { config } from '../../config/config.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This eventListener is invoke when the cursor no longer intersects entity.
 * @name CursorOut
 * @class
 * @memberof vr.controllers.display
 * @constructor
 */
export function CursorOut()
{
    Object.defineProperties( this ,
    {
        /**
         * @name tweenOver
         * @memberof vr.controllers.display.CursorOut
         * @instance
         */
        tweenOver : { writable : true , value : null } ,

        /**
         * @name tweenOut
         * @memberof vr.controllers.display.CursorOut
         * @instance
         */
        tweenOut : { writable : true , value : null }
    })

    Receiver.call( this ) ;
}

CursorOut.prototype = Object.create( Receiver.prototype ,
{
    constructor : { writable : true , value : CursorOut } ,

    /**
     * Handle the event.
     * @name handleEvent
     * @memberof vr.controllers.display.CursorOut
     * @function
     */
    receive : { writable : true , value : function( args )
    {
        try
        {
            /* jshint -W116*/
            if( !this.tweenOver ) throw new Error( 'tweenOver' ) ;
            /* jshint +W116*/

            /* jshint -W116*/
            if( !this.tweenOut ) throw new Error( 'tweenOut' ) ;
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
                logger.debug( this + " receive : " + args );
        }

        if( this.tweenOver.running )
        {
            this.tweenOver.stop();
        }

        this.tweenOut.run();
    }}

});
