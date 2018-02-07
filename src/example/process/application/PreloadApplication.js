"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { logger }     from '../../logging/logger.js' ;
import { Task }       from 'system/process/Task.js' ;

/**
 * This task preload all main assets in the application.
 * @name PreloadApplication
 * @class
 * @memberof example.process.application
 * @constructor
 */
export const PreloadApplication = function()
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The assets reference.
         * @name assets
         * @memberof example.process.application.PreloadApplication
         * @instance
         */
        assets : { writable : true , value : null } ,

        /**
         * The scene reference.
         * @name scene
         * @memberof example.process.application.PreloadApplication
         * @instance
         */
        scene : { writable : true , value : null } ,

        /**
         * The stage reference.
         * @name stage
         * @memberof example.process.application.PreloadApplication
         * @instance
         */
        stage : { writable : true , value : null } ,

        /**
         * @private
         */
        _finished : { writable : true , value : null }
    })
}

PreloadApplication.prototype = Object.create( Task.prototype ,
{
    constructor : { value : PreloadApplication } ,

    /**
     * Run the process.
     * @name run
     * @memberof example.process.application.PreloadApplication
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
            if( !this.assets ) throw new Error( 'assets' ) ;
            if( !this.scene )  throw new Error( 'scene' ) ;
            if( !this.stage )  throw new Error( 'stage' ) ;
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

        this._finished = this.finished.bind( this ) ;
        this.assets.element.addEventListener( 'loaded' , this._finished );

        this.scene.addChild( this.assets ) ;

        ///////////
    }},

    /**
     * @private
     * @name finished
     * @memberof example.process.application.PreloadApplication
     * @instance
     * @function
     */
    finished : { value : function()
    {
        this.stage.element.classList.add( "loaded" );

        this.assets.element.removeEventListener( 'loaded' , this._finished );

        this._finished = null ;
        this.notifyFinished() ;
    }}
});
