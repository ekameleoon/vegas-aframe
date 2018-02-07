"use strict"

// import { fastformat } from 'core/strings/fastformat.js' ;
import { Task } from 'system/process/Task.js' ;

import { logger } from '../../../logging/logger.js' ;

/**
 * This task is invoked after the home close method invokation.
 * @name HomeCloseAfter
 * @class
 * @memberof example.views.home.process
 * @constructor
 */
export function HomeCloseAfter()
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        // /**
        //  * @name sound
        //  * @memberof example.views.home.process.HomeCloseAfter
        //  * @instance
        //  */
        // sound : { writable : true , value : null }
    });
}

HomeCloseAfter.prototype = Object.create( Task.prototype ,
{
    constructor : { value : HomeCloseAfter , writable : true } ,

    /**
     * Run the process.
     * @name run
     * @memberof example.process.application.HomeCloseAfter
     * @instance
     * @function
     */
    run : { value : function ()
    {
        ///////////

        this.notifyStarted();

        ///////////

        // try
        // {
        //     /* jshint -W116*/
        //     if( !this.sound ) throw new Error( 'sound' ) ;
        //     /* jshint +W116*/
        // }
        // catch( er )
        // {
        //     logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
        //     this.notifyFinished() ;
        //     return ;
        // }

        ///////////

        logger.debug( this + " run" ) ;

        ///////////

        // this.sound.play() ;

        this.notifyFinished() ;
    }}

});
