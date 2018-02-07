"use strict"

// system
import { fastformat } from 'core/strings/fastformat.js' ;
import { Task }       from 'system/process/Task.js' ;

import { config } from '../../config/config.js' ;
import { logger } from '../../logging/logger.js' ;

/**
 * This task initialize the application.
 * @name InitApplication
 * @class
 * @memberof example.process.application
 * @constructor
 */
export function InitApplication()
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {

        /**
         * The camera reference.
         * @name camera
         * @memberof example.process.application.InitApplication
         * @instance
         */
        camera : { writable : true , value : null } ,

        /**
         * The cursor reference.
         * @name cursor
         * @memberof example.process.application.InitApplication
         * @instance
         */
        cursor : { writable : true , value : null } ,

        /**
         * @name states
         * @memberof example.process.application.InitApplication
         * @instance
         */
        states : { writable : true , value : null }
    });
}

InitApplication.prototype = Object.create( Task.prototype ,
{
    constructor : { value : InitApplication } ,

    /**
     * Run the process.
     * @name run
     * @memberof example.process.application.InitApplication
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
            if( !this.camera )  throw new Error( 'camera' ) ;
            if( !this.cursor )  throw new Error( 'cursor' ) ;
            if( !this.states )  throw new Error( 'states' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null."  , er.message )  ) ;
            this.notifyFinished() ;
            return ;
        }

        ///////////

        logger.debug( this + " run" ) ;

        this.camera.addChild( this.cursor ) ;

        logger.debug( this + " states length : " + this.states.length ) ;

        this.states.current = this.states.get( config.first ) ;

        this.notifyFinished();

        ///////////
    }}
});