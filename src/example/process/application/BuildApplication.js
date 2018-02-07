"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { logger }     from '../../logging/logger.js' ;
import { Task }       from 'system/process/Task.js' ;

/**
 * This task build the application.
 * @name BuildApplication
 * @class
 * @memberof example.process.application
 * @constructor
 */
export function BuildApplication()
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * @name factory
         * @memberof example.process.application.BuildApplication
         * @instance
         */
        factory : { writable : true , value : null }
    });
}

BuildApplication.prototype = Object.create( Task.prototype ,
{
    constructor : { value : BuildApplication , writable : true } ,

    /**
     * Run the process.
     * @name run
     * @memberof example.process.application.BuildApplication
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
            if( !this.factory ) throw new Error( 'factory' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( "[BuildApplication] run failed, the {0} reference not must be null." , er.message )  ) ;
            this.notifyFinished() ;
            return ;
        }

        ///////////

        logger.debug( this + " run" ) ;

        ///////////

        //let loader = this.factory.getObject( 'loader' ) ;
        let stage  = this.factory.getObject( 'stage' ) ;
        let scene  = this.factory.getObject( 'scene' ) ;

        //stage.addChild( loader ) ;
        stage.addChild( scene ) ;

        ///////////

        this.notifyFinished() ;

        ///////////
    }}
});
