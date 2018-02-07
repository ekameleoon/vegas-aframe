"use strict" ;

import { fastformat } from 'core/strings/fastformat.js' ;
import { Receiver }   from 'system/signals/Receiver.js' ;

import { config } from '../../config/config.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This eventListener is invoke when the cursor intersects entity.
 * @name CursorOver
 * @class
 * @memberof vr.controllers.display
 * @constructor
 */
export function CursorOver()
{
    Object.defineProperties( this ,
    {
        /**
         * @name cursor
         * @memberof vr.controllers.display.CursorOver
         * @instance
         */
        cursor : { writable : true , value : null } ,

        /**
         * @name sound
         * @memberof vr.controllers.display.CursorOver
         * @instance
         */
        sound : { writable : true , value : null } ,

        /**
         * @name tweenOver
         * @memberof vr.controllers.display.CursorOver
         * @instance
         */
        tweenOver : { writable : true , value : null } ,

        /**
         * @name tweenOut
         * @memberof vr.controllers.display.CursorOver
         * @instance
         */
        tweenOut : { writable : true , value : null } ,

        _onFinish : { writable : true , value : null }
    })

    Receiver.call( this ) ;
}

CursorOver.prototype = Object.create( Receiver.prototype ,
{
    constructor : { writable : true , value : CursorOver } ,

    /**
     * Handle the event.
     * @name handleEvent
     * @memberof vr.controllers.display.CursorOver
     * @function
     */
    receive : { value : function( args )
    {
        try
        {
            /* jshint -W116*/
            if( !this.sound ) throw new Error( 'sound' ) ;
            if( !this.tweenOver ) throw new Error( 'tweenOver' ) ;
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
            logger.debug( this + " receive : " + args ) ;
        }

        if( this.tweenOut.running )
        {
            this.tweenOut.stop() ;
        }

        this.sound.play() ;
        this.tweenOver.run() ;
    }}

});
