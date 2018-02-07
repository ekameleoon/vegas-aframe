"use strict" ;

import { fastformat } from 'core/strings/fastformat.js' ;
import { View } from 'molecule/states/View.js' ;
import { logger } from '../logging/logger.js' ;

/**
 * The scene view.
 * @name SceneView
 * @class
 * @memberof example
 * @implements molecule.states.View
 * @constructs
 * @param {Object} [init=null] - A generic object containing properties with which to populate the newly instance. If this argument is null, it is ignored.
 */
export function SceneView( init = null )
{
    Object.defineProperties( this ,
    {
        container : { writable : true , value : null } ,
        scene     : { writable : true , value : null }
    });

    View.call( this , init ) ;
}

SceneView.prototype = Object.create( View.prototype ,
{
    /**
     * The reference to the constructor function that created the instance's prototype.
     */
    constructor : { value : SceneView , writable : true } ,

    /**
     * Close the screen.
     */
    close : { writable : true , value : function()
    {
        ///////////

        try
        {
            /* jshint -W116*/
            if( !this.scene )
            {
                throw new Error( 'scene' ) ;
            }

            if( !this.container )
            {
                throw new Error( 'container' ) ;
            }
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " close failed, the {0} reference not must be null." , er.message )  ) ;
            return ;
        }

        ///////////

        logger.debug( this + " close" ) ;

        ///////////

        if( this.scene.contains( this.container ) )
        {
            this.scene.removeChild( this.container ) ;
        }
    }},

    /**
     * Open the screen.
     */
    open : { writable : true , value : function()
    {
        ///////////

        try
        {
            /* jshint -W116*/
            if( !this.scene )
            {
                throw new Error( 'scene' ) ;
            }

            if( !this.container )
            {
                throw new Error( 'container' ) ;
            }
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " open failed, the {0} reference not must be null." , er.message )  ) ;
            return ;
        }

        ///////////

        logger.debug( this + " open" ) ;

        ///////////

        if( !this.scene.contains( this.container ) )
        {
            this.scene.addChild( this.container ) ;
        }

        ///////////
    }}
}) ;
