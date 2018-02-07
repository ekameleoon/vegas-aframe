"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { Task } from 'system/process/Task.js' ;

import { logger } from '@app/logging/logger.js' ;

/**
 * This task is invoked after the home open method invokation.
 * @name HomeOpenAfter
 * @class
 * @memberof example.views.home.process
 * @constructor
 */
export function HomeOpenAfter()
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * @name sky
         * @memberof example.views.home.process.HomeOpenAfter
         * @instance
         */
        sky : { writable : true , value : null }

        // /**
        //  * @name sound
        //  * @memberof example.views.home.process.HomeOpenAfter
        //  * @instance
        //  */
        // sound : { writable : true , value : null }
    });
}

HomeOpenAfter.prototype = Object.create( Task.prototype ,
{
    constructor : { value : HomeOpenAfter , writable : true } ,

    /**
     * Run the process.
     * @name run
     * @memberof example.process.application.HomeOpenAfter
     * @instance
     * @function
     */
    run : { value : function ()
    {
        ///////////

        this.notifyStarted();

        ///////////

        try
        {
            /* jshint -W116*/
            if( !this.sky ) throw new Error( 'sky' ) ;
            // if( !this.sound ) throw new Error( 'sound' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
            this.notifyFinished() ;
            return ;
        }

        ///////////

        logger.debug( this + " run" ) ;

        ///////////

        this.sky.color = '' ;
        this.sky.src   = "./images/image.min.jpg" ;

        // this.sound.play() ;

        this.notifyFinished() ;
    }}

});
