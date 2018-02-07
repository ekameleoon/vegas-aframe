"use strict"

import { EventListener } from 'system/events/EventListener.js' ;

/**
 * This listener is invoked to select a specific state in the state model.
 * @name Reload
 * @class
 * @memberof example.controllers
 * @constructor
 */
export function Reload()
{
    EventListener.call( this ) ;
}

Reload.prototype = Object.create( EventListener.prototype ,
{
    constructor : { value : Reload , writable : true } ,

    /**
     * Invoked when the listener handle the event.
     * @name handleEvent
     * @memberof example.controllers.Reload
     * @function
     */
    handleEvent : { value : function ()
    {
        ///////////

        /*try
        {

        }
        catch( er )
        {
            logger.warning( fastformat( this + " run failed, the {0} reference not must be null." , er.message )  ) ;
            return ;
        }*/

        ///////////

        location.reload() ;

    }}

});
