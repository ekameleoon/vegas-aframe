"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { Receiver }   from 'system/signals/Receiver.js' ;

import { logger } from '@app/logging/logger.js' ;

/**
 * This receiver is invoked when signal is emitted.
 * @name HomeSoundEnded
 * @class
 * @memberof example.views.home.controllers
 * @constructor
 */
export function HomeSoundEnded()
{
    Receiver.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * @name sound
         * @memberof example.views.home.controllers.HomeSoundEnded
         * @instance
         */
        sound : { writable : true , value : null }
    });
}

HomeSoundEnded.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : HomeSoundEnded , writable : true } ,

    /**
     * Receive.
     * @name receive
     * @memberof example.views.home.controllers.HomeSoundEnded
     * @function
     */
    receive : { value : function ()
    {
        ///////////

        try
        {
            /* jshint -W116*/
            if( !this.sound ) throw new Error( 'sound' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
            return ;
        }

        ///////////

        this.sound.play() ;
    }}

});
