"use strict"

import { fastformat } from 'core/strings/fastformat.js' ;
import { EventListener } from 'system/events/EventListener.js' ;

import { logger } from '../../logging/logger.js' ;

/**
 * This listener is invoked to select a specific state in the state model.
 * @name SelectState
 * @class
 * @memberof example.controllers.states
 * @constructor
 */
export function SelectState()
{
    EventListener.call( this ) ;
    Object.defineProperties( this ,
    {
        /**
         * The current state id to select.
         * @name current
         * @memberof example.controllers.states.SelectState
         * @instance
         */
        current : { writable : true , value : null } ,

        /**
         * The state models reference.
         * @name states
         * @memberof example.controllers.states.SelectState
         * @instance
         */
        states : { writable : true , value : null }
    });
}

SelectState.prototype = Object.create( EventListener.prototype ,
{
    constructor : { value : SelectState , writable : true } ,

    /**
     * Invoked when the listener handle the event.
     * @name handleEvent
     * @memberof example.controllers.states.SelectState
     * @function
     */
    handleEvent : { value : function ()
    {
        ///////////

        try
        {
            /* jshint -W116*/
            if( !this.current ) throw new Error( 'current' ) ;
            if( !this.states ) throw new Error( 'states' ) ;
            /* jshint +W116*/
        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
            return ;
        }

        ///////////

        if( this.states.current.id !== this.current )
        {
            this.states.current = this.states.get( this.current ) ;
        }

    }}

});
