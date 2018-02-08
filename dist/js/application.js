/**
 * The VEGAS JS + AFrame prototype - version: 1.0.0 - license: MPL 2.0/GPL 2.0+/LGPL 2.1+ - Follow me on Twitter! @ekameleon - version: 1.0.0
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.application = {})));
}(this, (function (exports) { 'use strict';

if (!(Date.now && Date.prototype.getTime))
{
    Date.now = function now()
    {
        return new Date().getTime();
    };
}

if ( !Function.prototype.bind )
{
    Function.prototype.bind = function (oThis)
    {
        if (typeof this !== "function")
        {
            throw new TypeError( 'Function.prototype.bind called on incompatible ' + this );
        }
        var  aArgs = Array.prototype.slice.call(arguments, 1),
           fToBind = this,
              fNOP = function () {},
            fBound = function ()
            {
                return fToBind.apply
                (
                    this instanceof fNOP ? this : oThis ,
                    aArgs.concat(Array.prototype.slice.call(arguments))
                );
             };
        if ( this.prototype )
        {
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
  };
}
if ( Function.prototype.name === undefined )
{
    Object.defineProperty( Function.prototype, 'name',
    {
        get : function ()
        {
            return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];
        }
    } );
}

if ( Math.sign === undefined )
{
    Math.sign = function ( x )
    {
        return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;
    };
}

if ( Object.assign === undefined )
{
    ( function () {
        Object.assign = function ( target )
        {
            if ( target === undefined || target === null )
            {
                throw new TypeError( 'Cannot convert undefined or null to object' );
            }
            var output = Object( target );
            for ( var index = 1; index < arguments.length; index ++ )
            {
                var source = arguments[ index ];
                if ( source !== undefined && source !== null )
                {
                    for ( var nextKey in source )
                    {
                        if ( Object.prototype.hasOwnProperty.call( source, nextKey ) )
                        {
                            output[ nextKey ] = source[ nextKey ];
                        }
                    }
                }
            }
            return output;
        };
    } )();
}

var global = global || null;
if( !global )
{
    try
    {
        global = window ;
    }
    catch( e )
    {
    }
}
if( !global )
{
    try
    {
        global = document ;
    }
    catch( e )
    {
    }
}
if( !global )
{
    global = {} ;
}

var performance$1 = global.performance || {};
Object.defineProperty( global, 'performance', { value : performance$1 , configurable : true , writable : true } ) ;
performance$1.now = performance$1.now       ||
                  performance$1.mozNow    ||
                  performance$1.msNow     ||
                  performance$1.oNow      ||
                  performance$1.webkitNow ;
if ( !(global.performance && global.performance.now) )
{
    const startTime = Date.now();
    global.performance.now = () => Date.now() - startTime ;
}

const ONE_FRAME_TIME = 16;
let lastTime = Date.now();
const vendors = ['ms', 'moz', 'webkit', 'o'];
let len = vendors.length;
for ( let x = 0 ; x < len && !global.requestAnimationFrame ; ++x )
{
    const p = vendors[x];
    global.requestAnimationFrame = global[`${p}RequestAnimationFrame`];
    global.cancelAnimationFrame  = global[`${p}CancelAnimationFrame`] || global[`${p}CancelRequestAnimationFrame`];
}
if (!global.requestAnimationFrame)
{
    global.requestAnimationFrame = ( callback ) =>
    {
        if ( typeof callback !== 'function' )
        {
            throw new TypeError(`${callback}is not a function`) ;
        }
        const currentTime = Date.now();
        let delay = ONE_FRAME_TIME + lastTime - currentTime;
        if ( delay < 0 )
        {
            delay = 0;
        }
        lastTime = currentTime;
        return setTimeout(() =>
        {
            lastTime = Date.now();
            callback( performance$1.now() );
        }, delay);
    };
}
if (!global.cancelAnimationFrame)
{
    global.cancelAnimationFrame = (id) => clearTimeout(id);
}
var cancelAnimationFrame  = global.cancelAnimationFrame;
var requestAnimationFrame = global.requestAnimationFrame;

if ( global && typeof( global.Uint32Array ) !== "function" && typeof(global.Uint32Array) !== "object")
{
    var CheapArray = function(type)
    {
        var proto = [];
        global[type] = function( arg )
        {
            var i;
            if (typeof(arg) === "number")
            {
                Array.call(this, arg);
                this.length = arg;
                for ( i = 0 ; i < this.length; i++)
                {
                    this[i] = 0;
                }
            }
            else
            {
                Array.call( this , arg.length );
                this.length = arg.length;
                for ( i = 0; i < this.length ; i++ )
                {
                    this[i] = arg[i];
                }
            }
        };
        global[type].prototype = proto;
        global[type].constructor = global[type];
    };
    CheapArray('Float32Array');
    CheapArray('Uint32Array');
    CheapArray('Uint16Array');
    CheapArray('Int16Array');
    CheapArray('ArrayBuffer');
}

var skip = false;
function sayHello( name = '' , version = '' , link = '' )
{
    if( skip )
    {
        return ;
    }
    try
    {
        if ( navigator && navigator.userAgent && navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
        {
            const args = [
                `\n %c %c %c ${name} ${version} %c %c ${link} %c %c\n\n`,
                'background: #ff0000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'color: #F7FF3C; background: #000000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'color: #F7FF3C; background: #ff0000; padding:5px 0;',
                'background: #AA0000; padding:5px 0;',
                'background: #ff0000; padding:5px 0;',
            ];
            window.console.log.apply( console , args );
        }
        else if (window.console)
        {
            window.console.log(`${name} ${version} - ${link}`);
        }
    }
    catch( error )
    {
    }
}
function skipHello()
{
    skip = true ;
}

function ucFirst( str )
{
    if( !(str instanceof String || typeof(str) === 'string' ) || str === "" )
    {
        return '' ;
    }
    return str.charAt(0).toUpperCase() + str.substring(1) ;
}

function Receiver() {}
Receiver.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Receiver } ,
    receive : { writable : true , value : function() {} } ,
    toString : { writable : true , value : function ()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

function Signaler() {}
Signaler.prototype = Object.create( Object.prototype,
{
    constructor : { writable : true , value : Signaler } ,
    length : { get : function () { return 0 ; }} ,
    connect : { writable : true , value : function( receiver , priority = 0 , autoDisconnect = false ) {} },
    connected : { writable : true , value : function() {} },
    disconnect: { writable : true , value : function( receiver ) {} },
    emit: { writable : true , value : function() {} },
    hasReceiver : { writable : true , value : function( receiver ) {} }
});

function SignalEntry( receiver , priority = 0 , auto = false )
{
    this.auto = auto ;
    this.receiver = receiver ;
    this.priority = priority ;
}
SignalEntry.prototype = Object.create( Object.prototype );
SignalEntry.prototype.constructor = SignalEntry;
SignalEntry.prototype.toString = function()
{
    return '[SignalEntry]' ;
};

function Signal()
{
    Object.defineProperties( this ,
    {
        proxy : { value : null, configurable : true , writable : true } ,
        receivers : { writable : true , value : [] }
    }) ;
}
Signal.prototype = Object.create( Signaler.prototype ,
{
    constructor : { value : Signal , writable : true },
    length : { get : function() { return this.receivers.length ; } },
    connect : { value : function ( receiver , priority = 0 , autoDisconnect = false )
    {
        if ( receiver === null )
        {
            return false ;
        }
        autoDisconnect = autoDisconnect === true ;
        priority = priority > 0 ? (priority - (priority % 1)) : 0 ;
        if ( ( typeof(receiver) === "function" ) || ( receiver instanceof Function ) || ( receiver instanceof Receiver ) || ( "receive" in receiver ) )
        {
            if ( this.hasReceiver( receiver ) )
            {
                return false ;
            }
            this.receivers.push( new SignalEntry( receiver , priority , autoDisconnect ) ) ;
            let i;
            let j;
            let a = this.receivers;
            let swap = function( j , k )
            {
                var temp = a[j];
                a[j]     = a[k] ;
                a[k]     = temp ;
                return true ;
            };
            let swapped = false;
            let l = a.length;
            for( i = 1 ; i < l ; i++ )
            {
                for( j = 0 ; j < ( l - i ) ; j++ )
                {
                    if ( a[j+1].priority > a[j].priority )
                    {
                        swapped = swap(j, j+1) ;
                    }
                }
                if ( !swapped )
                {
                    break;
                }
            }
            return true ;
        }
        return false ;
    }},
    connected : { value : function ()
    {
        return this.receivers.length > 0 ;
    }},
    disconnect : { value : function ( receiver = null )
    {
        if ( receiver === null )
        {
            if ( this.receivers.length > 0 )
            {
                this.receivers = [] ;
                return true ;
            }
            else
            {
                return false ;
            }
        }
        if ( this.receivers.length > 0 )
        {
            var l  = this.receivers.length;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver === receiver )
                {
                    this.receivers.splice( l , 1 ) ;
                    return true ;
                }
            }
        }
        return false ;
    }},
    emit : { value : function( ...values )
    {
        let l = this.receivers.length;
        if ( l === 0 )
        {
            return ;
        }
        let i;
        let r = [];
        let a = this.receivers.slice();
        let e;
        var slot;
        for ( i = 0 ; i < l ; i++ )
        {
            e = a[i] ;
            if ( e.auto )
            {
                r.push( e )  ;
            }
        }
        if ( r.length > 0 )
        {
            l = r.length ;
            while( --l > -1 )
            {
                i = this.receivers.indexOf( r[l] ) ;
                if ( i > -1 )
                {
                    this.receivers.splice( i , 1 ) ;
                }
            }
        }
        l = a.length ;
        for ( i = 0 ; i<l ; i++ )
        {
            slot = a[i].receiver ;
            if( slot instanceof Function || typeof(receiver) === "function" )
            {
                slot.apply( this.proxy || this , values ) ;
            }
            else if ( slot instanceof Receiver || ( "receive" in slot && (slot.receive instanceof Function) ) )
            {
                slot.receive.apply( this.proxy || slot , values ) ;
            }
        }
    }},
    hasReceiver : { value : function ( receiver )
    {
        if ( receiver === null )
        {
            return false ;
        }
        if ( this.receivers.length > 0 )
        {
            let l = this.receivers.length;
            while( --l > -1 )
            {
                if ( this.receivers[l].receiver === receiver )
                {
                    return true ;
                }
            }
        }
        return false ;
    }},
    toArray : { value : function()
    {
        let r = [];
        let l = this.receivers.length;
        if ( l > 0 )
        {
            for( let i=0 ; i<l ; i++ )
            {
                r.push( this.receivers[i].receiver ) ;
            }
        }
        return r ;
    }},
    toString : { value : function () { return '[Signal]' ; }}
});

var StageAspectRatio = Object.defineProperties( {} ,
{
    ANY : { enumerable : true , value : 'any' } ,
    LANDSCAPE : { enumerable : true , value : 'landscape' } ,
    PORTRAIT : { enumerable : true , value : 'portrait' }
});

var StageDisplayState = Object.defineProperties( {} ,
{
    FULL_SCREEN : { enumerable : true , value : 'fullScreen' } ,
    FULL_SCREEN_INTERACTIVE : { enumerable : true , value : 'fullScreenInteractive' } ,
    NORMAL : { enumerable : true , value : 'normal' }
});

var StageOrientation = Object.defineProperties( {} ,
{
    DEFAULT : { enumerable : true , value : 'default' } ,
    ROTATED_LEFT : { enumerable : true , value : 'rotatedLeft' } ,
    ROTATED_RIGHT : { enumerable : true , value : 'rotatedRight' } ,
    UNKNOWN : { enumerable : true , value : 'unknown' } ,
    UPSIDE_DOWN : { enumerable : true , value : 'upsideDown' }
});

function Stage()
{
    Object.defineProperties( this ,
    {
        fullScreen : { value : new Signal() },
        orientationChange : { value : new Signal() },
        resize : { value : new Signal() },
        _allowFullScreen : { writable : true  , value : false } ,
        _aspectRatio : { writable : true  , value : StageAspectRatio.ANY } ,
        _displayState : { writable : true  , value : StageDisplayState.NORMAL } ,
        _fullScreenExit : { writable : true  , value : null } ,
        _fullScreenHeight : { writable : true  , value : null } ,
        _fullScreenInteractive : { writable : true  , value : false } ,
        _fullScreenRequest : { writable : true  , value : null } ,
        _fullScreenWidth : { writable : true  , value : null } ,
        _height : { writable : true  , value : null } ,
        _launchedFromHomeScreen : { writable : true  , value : false } ,
        _orientation : { writable : true  , value : StageOrientation.UNKNOWN } ,
        _pixelRatio : { writable : true  , value : 1 } ,
        _supportedOrientations : { writable : true  , value : null } ,
        _supportsOrientationChange : { writable : true  , value : false } ,
        _width : { writable : true  , value : null }
    });
    this.__initialize__() ;
}
Stage.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Stage } ,
    allowFullScreen : { get : function() { return this._allowFullScreen ; } } ,
    allowFullScreenInteractive : { get : function() { return this._fullScreenInteractive ; } } ,
    aspectRatio : { get : function() { return this._aspectRatio ; } } ,
    displayState :
    {
        get : function()
        {
            return this._displayState ;
        },
        set : function( state )
        {
            if( this._displayState !== state )
            {
                this._displayState = state ;
                switch( this._displayState )
                {
                    case StageDisplayState.FULL_SCREEN :
                    {
                        document.documentElement[ this._fullScreenRequest ]();
                        break ;
                    }
                    case StageDisplayState.FULL_SCREEN_INTERACTIVE :
                    {
                        document.documentElement[ this._fullScreenRequest ]( Element.ALLOW_KEYBOARD_INPUT );
                        break ;
                    }
                    case StageDisplayState.NORMAL :
                    default :
                    {
                        document[ this._fullScreenExit ]();
                        break ;
                    }
                }
                this.notifyFullScreen( this._displayState );
            }
        }
    } ,
    fullScreenHeight : { get : function() { return this._fullScreenHeight ; } } ,
    fullScreenWidth : { get : function() { return this._fullScreenWidth ; } } ,
    height : { get : function() { return this._height ; } } ,
    launchedFromHomeScreen : { get : function() { return this._launchedFromHomeScreen ; } } ,
    orientation : { get : function() { return this._orientation ; } } ,
    pixelRatio : { get : function() { return this._pixelRatio ; } } ,
    width : { get : function() { return this._width ; } } ,
    getDeviceOrientation : { writable : true , value : function()
    {
        if( window.screen.orientation && window.screen.orientation.type )
        {
            switch ( window.screen.orientation.type )
            {
                case 'portrait-secondary' :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
                case 'landscape-primary' :
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'landscape-secondary' :
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'portrait-primary' :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
            }
        }
        else if( window.orientation !== undefined )
        {
            switch ( window.orientation )
            {
                case 180 :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break ;
                }
                case 90:
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case -90:
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case 0  :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                }
            }
        }
    }},
    getViewportSize : { writable : true , value : function()
    {
        this._width  = Math.max( document.documentElement.clientWidth  , window.innerWidth  || 0 );
        this._height = Math.max( document.documentElement.clientHeight , window.innerHeight || 0 );
        return { width : this._width , height : this._height } ;
    }},
    notifyFullScreen : { writable : true , value : function()
    {
        this.fullScreen.emit( this._displayState , this ) ;
    }},
    notifyOrientationChange : { writable : true , value : function()
    {
        this.getDeviceOrientation();
        this.orientationChange.emit( this ) ;
    }},
    notifyResized : { writable : true , value : function()
    {
        this.getViewportSize();
        this.resize.emit( this ) ;
    }},
    __initialize__ : { writable : true , value : function()
    {
        if( navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches )
        {
            this._launchedFromHomeScreen = true;
        }
        this._pixelRatio = window.devicePixelRatio || 1;
        this.getViewportSize();
        this._fullScreenWidth  = window.screen.width;
        this._fullScreenHeight = window.screen.height;
        if( window.orientation || window.screen.orientation )
        {
            this._supportsOrientationChange = true;
            this.getDeviceOrientation();
        }
        else
        {
            this._supportsOrientationChange = false;
        }
        let fullscreen =
        [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];
        let cancel =
        [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];
        let len = fullscreen.length;
        for( let i = 0 ; i < len ; i++ )
        {
            if( document.documentElement[fullscreen[i]] && document[cancel[i]] )
            {
                this._allowFullScreen   = true ;
                this._fullScreenRequest = fullscreen[i];
                this._fullScreenExit    = cancel[i];
                break;
            }
        }
        if( window.Element && Element.ALLOW_KEYBOARD_INPUT )
        {
            this._fullScreenInteractive = true;
        }
        if( this._allowFullScreen === true )
        {
            window.addEventListener( "fullscreenchange"  , this.notifyFullScreen.bind( this )      , false );
        }
        if( this._supportsOrientationChange === true )
        {
            window.addEventListener( "orientationchange" , this.notifyOrientationChange.bind(this) , false ) ;
        }
        window.addEventListener( "resize" , this.notifyResized.bind( this ) , false );
    }}
});

const draw =
{
    schema :
    {
        width      : { default : 256       },
        height     : { default : 256       },
        background : { default : "#FFFFFF" }
    },
    create : function (w, h)
    {
        var owner = this;
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.style = "display: none";
        owner.canvas = canvas;
        owner.ctx = canvas.getContext("2d");
        this.texture = new THREE.Texture(owner.canvas);
        if( this.el.object3D.children.length > 0 )
        {
            this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
            this.el.object3D.children[0].material.map = this.texture;
        }
        else
        {
            this.el.object3D.material = new THREE.MeshBasicMaterial();
            this.el.object3D.material.map = this.texture;
        }
        if( !this.el.hasLoaded )
        {
            this.el.addEventListener( "loaded" , function()
            {
                owner.render();
            });
        }
        else
        {
            owner.render();
        }
    },
    init : function()
    {
        this.registers = [] ;
        this.update();
    },
    register : function( render )
    {
        this.registers.push( render );
    },
    remove : function()
    {
    },
    render : function()
    {
        if( this.registers && this.registers.length > 0 )
        {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.data.background;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.registers.forEach( function( item )
            {
                item();
            });
        }
        this.texture.needsUpdate = true;
    },
    update : function( oldData )
    {
        if ( !oldData )
        {
            this.create( this.data.width , this.data.height );
        }
    }
};

const label =
{
    schema :
    {
        color : { default : "#FF0000"      } ,
        font  : { default : "36px Georgia" } ,
        text  : { default : ""             }
    },
    dependencies : [ "draw" ] ,
    update : function()
    {
        let draw   = this.el.components.draw;
        let ctx    = draw.ctx;
        let canvas = draw.canvas;
        ctx.fillStyle = this.el.getAttribute('color') ;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.data.color ;
        ctx.font = this.data.font ;
        ctx.textAlign    = 'center' ;
        ctx.textBaseline = 'middle' ;
        ctx.fillText(this.data.text, canvas.width * 0.5, canvas.height * 0.5);
        draw.render();
    }
};

const components = [].concat
(
    { name : "draw"  , value : draw  } ,
    { name : "label" , value : label }
);

function merge( target , source , overwrite = true )
{
    if ( overwrite === null || overwrite === undefined )
    {
        overwrite = true ;
    }
    if ( source === null || source === undefined )
    {
        source = {} ;
    }
    for( var prop in source )
    {
        if ( !( prop in target ) || overwrite )
        {
            target[prop] = source[prop] ;
        }
    }
    return target ;
}

function isIdentifiable( target )
{
    if( target )
    {
        return (target instanceof Identifiable) || ('id' in target) ;
    }
    return false ;
}
function Identifiable()
{
    Object.defineProperties( this ,
    {
        id : { value : null , writable : true }
    }) ;
}
Identifiable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value :  Identifiable }
}) ;

function ValueObject( init = null )
{
    Object.defineProperties( this ,
    {
        _constructorName : { writable : true , value : null }
    });
    Identifiable.call( this ) ;
    if( init )
    {
        this.setTo( init ) ;
    }
}
ValueObject.prototype = Object.create( Identifiable.prototype ,
{
    constructor : { writable : true , value : ValueObject } ,
    formatToString : { value : function( className , ...rest )
    {
        if( !className )
        {
            if( !this._constructorName )
            {
                this._constructorName = this.constructor.name ;
            }
            className = this._constructorName ;
        }
        let ar = [ className ];
        let len = rest.length;
        for ( let i = 0; i < len ; ++i )
        {
            if( rest[i] in this )
            {
                ar.push( rest[i] + ":" + this[rest[i]] ) ;
            }
        }
        return "[" + ar.join(' ') + "]" ;
    }},
    setTo : { writable : true , value : function( init )
    {
        if( init )
        {
            for( var prop in init )
            {
                if( prop in this )
                {
                    this[prop] = init[prop];
                }
            }
        }
        return this ;
    }},
    toString : { writable : true , value : function()
    {
        return this.formatToString( null ) ;
    }}
}) ;

function State( init = null )
{
    Object.defineProperties( this ,
    {
        owner : { value : null  , writable : true } ,
        view : { value : null  , writable : true }
    }) ;
    ValueObject.call( this , init ) ;
}
State.prototype = Object.create( ValueObject.prototype ,
{
    constructor : { writable : true , value : State } ,
    toString : { writable : true , value : function ()
    {
        return this.formatToString( null , "id" );
    }}
}) ;

var StateList = Object.defineProperties({}, {
  HOME: { enumerable: true, value: 'home' }
});

var ViewList = Object.defineProperties({}, {
  HOME: { enumerable: true, value: 'home_view' }
});

var assets = {
    home_image: { id: 'home_image', src: 'images/image.min.jpg'
    } };

var camera = {
    camera: {
        x: 0,
        y: 0,
        z: 0
    },
    over_sound: {
        src: "url(audios/snap.mp3)",
        volume: 0.3
    }
};

var expoOut = ( t , b , c , d ) => ( t === d ) ? ( b + c ) : ( c * (-Math.pow(2, -10 * t/d) + 1) + b );

var cursor = {
    cursor: {
        duration: 2,
        useSeconds: true,
        z: -1
    },
    cursor_circle: {
        color: 'red',
        opacity: 0.3,
        radius: 0.01,
        shader: 'flat',
        thetaLength: 0,
        thetaStart: 90,
        z: 0.01
    },
    cursor_ring: {
        color: 'white',
        opacity: 0.2,
        radius: 0.015,
        shader: 'flat'
    },
    cursor_over_tween: {
        easing: expoOut,
        from: { thetaLength: 0 },
        to: { thetaLength: 360 }
    },
    cursor_out_tween: {
        duration: 2,
        useSeconds: true,
        easing: expoOut,
        from: { thetaLength: 360 },
        to: { thetaLength: 0 }
    }
};

var loader = {
    loader: { class: "dots-loader" }
};

var scene = {
    scene: {
        antialias: true
    }
};

var sky = {
    sky: {
        color: '#383838'
    }
};

var home = {
    home_sky: './images/image.min.jpg',
    home_sound: {
        src: 'url(./sounds/CA01GN02_sound.mp3)',
        volume: 1
    },
    home_subtitle: {
        align: 'center',
        color: '#FFFFFF'
    },
    home_subtitle_front: {
        x: 0,
        y: -0.5,
        z: -4
    },
    home_subtitle_back: {
        side: 'double',
        rotationY: 180,
        x: 0,
        y: -0.5,
        z: 4
    },
    home_title: {
        align: 'center',
        color: '#FFFFFF',
        font: 'kelsonsans'
    },
    home_title_front: {
        x: 0,
        y: 0,
        z: -2
    },
    home_title_back: {
        side: 'double',
        rotationY: 180,
        x: 0,
        y: 0,
        z: 2
    }
};

var config = {
    name: "application",
    debug: "true" === "true",
    verbose: false,
    first: StateList.HOME,
    states: [new State({ id: StateList.HOME, view: ViewList.HOME })]
};
merge(config, assets);
merge(config, camera);
merge(config, cursor);
merge(config, loader);
merge(config, scene);
merge(config, sky);
merge(config, home);

function indexOfAny( source , anyOf , startIndex = 0 , count = -1 )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return -1 ;
    }
    if( !(anyOf instanceof Array) )
    {
        return -1 ;
    }
    startIndex = startIndex > 0 ? 0 : startIndex ;
    count      = count < 0 ? -1 : count ;
    let l = source.length;
    let endIndex;
    if( ( count < 0 ) || ( count > l - startIndex ) )
    {
        endIndex = l - 1 ;
    }
    else
    {
        endIndex = startIndex + count - 1;
    }
    for( let i = startIndex ; i <= endIndex ; i++ )
    {
        if( anyOf.indexOf( source[i] ) > - 1 )
        {
            return i ;
        }
    }
    return -1 ;
}

function KeyValuePair() {}
KeyValuePair.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value :  KeyValuePair },
    length : { get : () => 0 } ,
    clear : { value : function () {} , writable : true } ,
    clone : { value : function () { return new KeyValuePair() } , writable : true } ,
    copyFrom : { value : function( map ) {} , writable : true } ,
    delete : { value : function( key ) {} , writable : true } ,
    forEach : { value : function( callback , thisArg = null ) {} , writable : true } ,
    get : { value : function( key ) { return null ; } , writable : true } ,
    has : { value : function( key ) { return false ; } , writable : true } ,
    hasValue : { value : function( value ) { return false ; } , writable : true } ,
    isEmpty : { value : function() { return false ; } , writable : true } ,
    iterator : { value : function()              { return null ; } , writable : true } ,
    keyIterator : { value : function()              { return null } , writable : true } ,
    keys : { value : function() { return null ; } , writable : true } ,
    set : { value : function( key , value ) {} , writable : true } ,
    toString : { value : function () { return '[' + this.constructor.name + ']' ; } , writable : true } ,
    values : { value : function ()  {} , writable : true }
}) ;

function MapEntry( key , value )
{
    Object.defineProperties( this ,
    {
        key : { value : key , writable : true },
        value : { value : value , writable : true }
    }) ;
}
MapEntry.prototype = Object.create( Object.prototype ,
{
    constructor : { value : MapEntry } ,
    clone : { value : function()
    {
        return new MapEntry( this.key , this.value ) ;
    }},
    toString : { value : function()
    {
        return "[MapEntry key:" + this.key + " value:" + this.value + "]" ;
    }}
}) ;

function MapFormatter() {}
MapFormatter.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : MapFormatter },
    format : { value : function( value )
    {
        if ( value instanceof KeyValuePair )
        {
            let r = "{";
            let keys = value.keys();
            let len  = keys.length;
            if( len > 0 )
            {
                let values = value.values();
                for( let i = 0 ; i < len ; i++ )
                {
                    r += keys[i] + ':' + values[i] ;
                    if( i < len - 1 )
                    {
                        r += "," ;
                    }
                }
            }
            r += "}" ;
            return r ;
        }
        else
        {
            return "{}" ;
        }
    }}
}) ;
var formatter = new MapFormatter();

function Iterator() {}
Iterator.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Iterator } ,
    delete : { writable : true , value : function() {} } ,
    hasNext : { writable : true , value : function() {} } ,
    key : { writable : true , value : function() {} } ,
    next : { writable : true , value : function() {} } ,
    reset : { writable : true , value : function() {} } ,
    seek : { writable : true , value : function ( position ) {} } ,
    toString :
    {
        writable : true , value : function ()
        {
            if( !('__clazzname__' in this.constructor) )
            {
                Object.defineProperty( this.constructor , '__clazzname__' , { value : this.constructor.name } ) ;
            }
            return '[' + this.constructor.__clazzname__ + ']' ;
        }
    }
}) ;

function ArrayIterator( array )
{
    if ( !(array instanceof Array) )
    {
        throw new ReferenceError( this + " constructor failed, the passed-in Array argument not must be 'null'.") ;
    }
    Object.defineProperties( this ,
    {
        _a : { value : array , writable : true } ,
        _k : { value : -1    , writable : true }
    }) ;
}
ArrayIterator.prototype = Object.create( Iterator.prototype ,
{
    constructor : { value : ArrayIterator } ,
    delete : { value : function()
    {
        return this._a.splice(this._k--, 1)[0] ;
    }},
    hasNext : { value : function()
    {
        return (this._k < this._a.length -1) ;
    }},
    key : { value : function()
    {
        return this._k ;
    }},
    next : { value : function()
    {
        return this._a[++this._k] ;
    }},
    reset : { value : function()
    {
        this._k = -1 ;
    }},
    seek : { value : function ( position )
    {
        position = Math.max( Math.min( position - 1 , this._a.length ) , -1 ) ;
        this._k = isNaN(position) ? -1 : position ;
    }}
}) ;

function MapIterator( map )
{
    if ( map && ( map instanceof KeyValuePair) )
    {
        Object.defineProperties( this ,
        {
            _m : { value : map  , writable : true } ,
            _i : { value : new ArrayIterator( map.keys() ) , writable : true } ,
            _k : { value : null , writable : true }
        }) ;
    }
    else
    {
       throw new ReferenceError( this + " constructor failed, the passed-in KeyValuePair argument not must be 'null'.") ;
    }
}
MapIterator.prototype = Object.create( Iterator.prototype ,
{
    constructor : { writable : true , value : MapIterator } ,
    delete : { value : function()
    {
        this._i.delete() ;
        return this._m.delete( this._k ) ;
    }},
    hasNext : { value : function()
    {
        return this._i.hasNext() ;
    }},
    key : { value : function()
    {
        return this._k ;
    }},
    next : { value : function()
    {
        this._k = this._i.next() ;
        return this._m.get( this._k ) ;
    }},
    reset : { value : function()
    {
        this._i.reset() ;
    }},
    seek : { value : function ( position )
    {
        throw new Error( "This Iterator does not support the seek() method.") ;
    }}
}) ;

function ArrayMap( keys = null , values = null )
{
    Object.defineProperties( this ,
    {
        _keys :
        {
            value : [] ,
            writable : true
        },
        _values :
        {
            value : [] ,
            writable : true
        }
    }) ;
    if ( keys === null || values === null )
    {
        this._keys   = [] ;
        this._values = [] ;
    }
    else
    {
        let b = ( keys instanceof Array && values instanceof Array && keys.length > 0 && keys.length === values.length );
        this._keys   = b ? [].concat(keys)   : [] ;
        this._values = b ? [].concat(values) : [] ;
    }
}
ArrayMap.prototype = Object.create( KeyValuePair.prototype ,
{
    constructor : { writable : true , value : ArrayMap } ,
    length : { get : function() { return this._keys.length ; } } ,
    clear : { value : function ()
    {
        this._keys   = [] ;
        this._values = [] ;
    }},
    clone : { value : function ()
    {
        return new ArrayMap( this._keys , this._values ) ;
    }},
    copyFrom : { value : function ( map )
    {
        if ( !map || !(map instanceof KeyValuePair) )
        {
            return ;
        }
        let keys = map.keys();
        let values = map.values();
        let l = keys.length;
        for ( let i = 0 ; i<l ; i = i - (-1) )
        {
            this.set(keys[i], values[i]) ;
        }
    }},
    delete : { value : function ( key )
    {
        let v = null;
        let i = this.indexOfKey( key );
        if ( i > -1 )
        {
            v = this._values[i] ;
            this._keys.splice(i, 1) ;
            this._values.splice(i, 1) ;
        }
        return v ;
    }},
    forEach : { value : function( callback , thisArg = null )
    {
        if (typeof callback !== "function")
        {
            throw new TypeError( callback + ' is not a function' );
        }
        let l = this._keys.length;
        for( let i = 0 ; i<l ; i++ )
        {
            callback.call( thisArg , this._values[i] , this._keys[i] , this ) ;
        }
    }},
    get : { value : function( key )
    {
        return this._values[ this.indexOfKey( key ) ] ;
    }},
    getKeyAt : { value : function ( index )
    {
        return this._keys[ index ] ;
    }},
    getValueAt : { value : function ( index          )
    {
        return this._values[ index ] ;
    }},
    has : { value : function ( key )
    {
        return this.indexOfKey(key) > -1 ;
    }},
    hasValue : { value : function ( value )
    {
        return this.indexOfValue( value ) > -1 ;
    }},
    indexOfKey : { value : function (key)
    {
        let l = this._keys.length;
        while( --l > -1 )
        {
            if ( this._keys[l] === key )
            {
                return l ;
            }
        }
        return -1 ;
    }},
    indexOfValue : { value : function (value)
    {
        let l = this._values.length;
        while( --l > -1 )
        {
            if ( this._values[l] === value )
            {
                return l ;
            }
        }
        return -1 ;
    }},
    isEmpty : { value : function ()
    {
        return this._keys.length === 0 ;
    }},
    iterator : { value : function ()
    {
        return new MapIterator( this ) ;
    }},
    keyIterator : { value : function ()
    {
        return new ArrayIterator( this._keys ) ;
    }},
    keys : { value : function ()
    {
        return this._keys.concat() ;
    }},
    set : { value : function ( key , value )
    {
        let r = null;
        let i = this.indexOfKey( key );
        if ( i < 0 )
        {
            this._keys.push( key ) ;
            this._values.push( value ) ;
        }
        else
        {
            r = this._values[i] ;
            this._values[i] = value ;
        }
        return r ;
    }},
    setKeyAt : { value : function( index , key )
    {
        if ( index >= this._keys.length )
        {
            throw new RangeError( "ArrayMap.setKeyAt(" + index + ") failed with an index out of the range.") ;
        }
        if ( this.containsKey( key ) )
        {
            return null ;
        }
        let k = this._keys[index];
        if (k === undefined)
        {
            return null ;
        }
        let v = this._values[index];
        this._keys[index] = key ;
        return new MapEntry( k , v ) ;
    }},
    setValueAt : { value : function( index , value )
    {
        if ( index >= this._keys.length )
        {
            throw new RangeError( "ArrayMap.setValueAt(" + index + ") failed with an index out of the range.") ;
        }
        let v = this._values[index];
        if (v === undefined)
        {
            return null ;
        }
        let k = this._keys[index];
        this._values[index] = value ;
        return new MapEntry( k , v ) ;
    }},
    toString : { value : function () { return formatter.format( this ) ; }},
    values : { value : function ()
    {
        return this._values.concat() ;
    }}
}) ;

function InvalidChannelError( message , fileName , lineNumber )
{
    this.name = 'InvalidChannelError';
    this.message    = message || 'invalid channel error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}
InvalidChannelError.prototype = Object.create( Error.prototype );
InvalidChannelError.prototype.constructor = InvalidChannelError;

function Enum( value , name )
{
    Object.defineProperties( this ,
    {
        _name :
        {
            value        : ((typeof(name) === "string" || name instanceof String )) ? name : "" ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        },
        _value :
        {
            value        : isNaN(value) ? 0 : value ,
            enumerable   : false ,
            writable     : true ,
            configurable : true
        }
    }) ;
}
Enum.prototype = Object.create( Object.prototype );
Enum.prototype.constructor = Enum;
Enum.prototype.equals = function ( object )
{
    if ( object === this )
    {
        return true ;
    }
    if( object instanceof Enum )
    {
        return (object.toString() === this.toString()) && (object.valueOf() === this.valueOf()) ;
    }
    return false ;
};
Enum.prototype.toString = function()
{
    return this._name ;
};
Enum.prototype.valueOf = function()
{
    return this._value ;
};

function LoggerLevel( value , name )
{
    Enum.call( this , value , name ) ;
}
LoggerLevel.prototype = Object.create( Enum.prototype );
LoggerLevel.prototype.constructor = LoggerLevel;
Object.defineProperties( LoggerLevel ,
{
    ALL : { value : new LoggerLevel( 1 , 'ALL' ) , enumerable : true } ,
    CRITICAL : { value : new LoggerLevel( 16 , 'CRITICAL' ) , enumerable : true } ,
    DEBUG : { value : new LoggerLevel( 2 , 'DEBUG' ) , enumerable : true } ,
    DEFAULT_LEVEL_STRING : { value : 'UNKNOWN' , enumerable : true } ,
    ERROR : { value : new LoggerLevel( 8 , 'ERROR' ) , enumerable : true } ,
    INFO : { value : new LoggerLevel( 4 , 'INFO' ) , enumerable : true } ,
    NONE : { value : new LoggerLevel( 0 , 'NONE' ) , enumerable : true } ,
    WARNING : { value : new LoggerLevel( 6 , 'WARNING' ) , enumerable : true } ,
    WTF : { value : new LoggerLevel( 32 , 'WTF' ) , enumerable : true } ,
    get : { value : function( value )
    {
        let levels =
        [
            LoggerLevel.ALL,
            LoggerLevel.CRITICAL,
            LoggerLevel.DEBUG,
            LoggerLevel.ERROR,
            LoggerLevel.INFO,
            LoggerLevel.NONE,
            LoggerLevel.WARNING,
            LoggerLevel.WTF
        ];
        let l = levels.length;
        while( --l > -1 )
        {
            if ( levels[l]._value === value )
            {
                return levels[l] ;
            }
        }
        return null ;
    }},
    getLevelString : { value : function( value )
    {
        if ( LoggerLevel.validate( value ) )
        {
            return value.toString() ;
        }
        else
        {
            return LoggerLevel.DEFAULT_LEVEL_STRING ;
        }
    }},
    validate : { value : function( level )
    {
        let levels =
        [
            LoggerLevel.ALL,
            LoggerLevel.CRITICAL,
            LoggerLevel.DEBUG,
            LoggerLevel.ERROR,
            LoggerLevel.INFO,
            LoggerLevel.NONE,
            LoggerLevel.WARNING,
            LoggerLevel.WTF
        ];
        return levels.indexOf( level ) > -1 ;
    }}
});

function LoggerEntry( message , level , channel )
{
    this.channel = channel ;
    this.level = level instanceof LoggerLevel ? level : LoggerLevel.ALL ;
    this.message = message ;
}
LoggerEntry.prototype = Object.create( Object.prototype );
LoggerEntry.prototype.constructor = LoggerEntry;

function Logger( channel )
{
    Signal.call( this ) ;
    Object.defineProperties( this ,
    {
        _entry : { value : new LoggerEntry(null,null,channel) , writable : true }
    }) ;
}
Logger.prototype = Object.create( Signal.prototype ,
{
    constructor : { writable : true , value : Logger } ,
    channel : { get : function() { return this._entry.channel ; } },
    critical : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.CRITICAL , context , options ) ;
    }},
    debug : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.DEBUG , context , options ) ;
    }},
    error : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.ERROR , context , options ) ;
    }},
    info : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.INFO , context , options ) ;
    }},
    log : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.ALL , context , options ) ;
    }},
    warning : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.WARNING , context , options ) ;
    }},
    wtf : { value : function ( context , ...options )
    {
        this._log( LoggerLevel.WTF , context , options ) ;
    }},
    toString : { value : function() { return '[Logger]' ; } } ,
    _log : { value : function ( level , context , options  )
    {
        if( this.connected() )
        {
            if ( ( typeof(context) === "string" || context instanceof String ) && options instanceof Array )
            {
                var len = options.length;
                for( var i = 0 ; i<len ; i++ )
                {
                    context = String(context).replace( new RegExp( "\\{" + i + "\\}" , "g" ) , options[i] ) ;
                }
            }
            this._entry.message = context ;
            this._entry.level   = level ;
            this.emit( this._entry ) ;
        }
    }}
});

function fastformat( pattern , ...args )
{
    if( (pattern === null) || !(pattern instanceof String || typeof(pattern) === 'string' ) )
    {
        return "" ;
    }
    if( args.length > 0 )
    {
        args = [].concat.apply( [] , args ) ;
        let len  = args.length;
        for( var i = 0 ; i < len ; i++ )
        {
            pattern = pattern.replace( new RegExp( "\\{" + i + "\\}" , "g" ), args[i] );
        }
    }
    return pattern;
}

function InvalidFilterError( message , fileName , lineNumber )
{
    this.name = 'InvalidFilterError';
    this.message    = message || 'invalid filter error' ;
    this.fileName   = fileName ;
    this.lineNumber = lineNumber ;
    this.stack      = (new Error()).stack;
}
InvalidFilterError.prototype = Object.create( Error.prototype );
InvalidFilterError.prototype.constructor = InvalidFilterError;

var strings = Object.defineProperties( {} ,
{
    CHARS_INVALID : { value : "The following characters are not valid\: []~$^&\/(){}<>+\=_-`!@#%?,\:;'\\" , enumerable : true } ,
    CHAR_PLACEMENT : { value : "'*' must be the right most character." , enumerable : true } ,
    EMPTY_FILTER : { value : "filter must not be null or empty." , enumerable : true },
    ERROR_FILTER : { value : "Error for filter '{0}'." , enumerable : true },
    DEFAULT_CHANNEL : { value : "" , enumerable : true },
    ILLEGALCHARACTERS : { value : "[]~$^&/\\(){}<>+=`!#%?,:;'\"@" , enumerable : true },
    INVALID_CHARS : { value : "Channels can not contain any of the following characters : []~$^&/\\(){}<>+=`!#%?,:;'\"@" , enumerable : true },
    INVALID_LENGTH : { value : "Channels must be at least one character in length." , enumerable : true },
    INVALID_TARGET : { value : "Log, Invalid target specified." , enumerable : true }
});

function LoggerTarget()
{
    Object.defineProperties( this ,
    {
        _count   : { value : 0 , writable : true } ,
        _factory : { value : null , writable : true } ,
        _filters : { value : ["*"] , writable : true } ,
        _level   : { value : LoggerLevel.ALL , writable : true }
    }) ;
    this.factory = Log ;
}
LoggerTarget.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : LoggerTarget , writable : true } ,
    factory :
    {
        get : function() { return this._factory ; },
        set : function( factory )
        {
            if ( this._factory )
            {
                this._factory.removeTarget( this ) ;
            }
            this._factory = ( factory instanceof LoggerFactory ) ? factory : Log ;
            this._factory.addTarget( this ) ;
        }
    },
    filters :
    {
        get : function() { return [].concat( this._filters ) ; },
        set : function( value )
        {
            let filters  = [];
            if ( value && value instanceof Array && value.length > 0 )
            {
                let filter;
                let length = value.length;
                for ( var i = 0 ; i < length ; i++ )
                {
                    filter = value[i] ;
                    if ( filters.indexOf( filter ) === -1 )
                    {
                        this._checkFilter( filter ) ;
                        filters.push( filter ) ;
                    }
                }
            }
            else
            {
                filters.push( '*' ) ;
            }
            if ( this._count > 0 )
            {
                this._factory.removeTarget( this ) ;
            }
            this._filters = filters ;
            if( this._count > 0 )
            {
                this._factory.addTarget( this ) ;
            }
        }
    },
    level :
    {
        get : function() { return this._level ; },
        set : function( value )
        {
            this._factory.removeTarget( this ) ;
            this._level = value || LoggerLevel.ALL ;
            this._factory.addTarget( this ) ;
        }
    },
    addFilter : { value : function ( channel )
    {
        this._checkFilter( channel ) ;
        let index = this._filters.indexOf( channel );
        if ( index === -1 )
        {
            this._filters.push( channel ) ;
            return true ;
        }
        return false ;
    }},
    addLogger : { value : function ( logger )
    {
        if ( logger && logger instanceof Logger )
        {
            this._count ++ ;
            logger.connect( this ) ;
        }
    }},
    logEntry : { value : function( entry )
    {
    }},
    receive : { value : function( entry )
    {
        if ( entry instanceof LoggerEntry )
        {
            if ( this._level === LoggerLevel.NONE )
            {
                return ;
            }
            else if ( entry.level.valueOf() >= this._level.valueOf() )
            {
                this.logEntry( entry ) ;
            }
        }
    }},
    removeFilter : { value : function( channel )
    {
        if ( channel && (typeof(channel) === "string" || (channel instanceof String) ) && ( channel !== "" ) )
        {
            let index = this._filters.indexOf( channel );
            if ( index > -1 )
            {
                this._filters.splice( index , 1 ) ;
                return true ;
            }
        }
        return false ;
    }},
    removeLogger : { value : function( logger )
    {
        if ( logger instanceof Logger )
        {
            this._count-- ;
            logger.disconnect( this ) ;
        }
    }},
    _checkFilter : { value : function( filter )
    {
        if ( filter === null )
        {
            throw new InvalidFilterError( strings.EMPTY_FILTER  ) ;
        }
        if ( this._factory.hasIllegalCharacters( filter ) )
        {
             throw new InvalidFilterError( fastformat( strings.ERROR_FILTER , filter ) + strings.CHARS_INVALID ) ;
        }
        var index  = filter.indexOf("*");
        if ( (index >= 0) && (index !== (filter.length -1)) )
        {
            throw new InvalidFilterError( fastformat( strings.ERROR_FILTER , filter) + strings.CHAR_PLACEMENT ) ;
        }
    }},
    toString : { value : function() { return '[LoggerTarget]' ; } }
});

function LoggerFactory()
{
    Object.defineProperties( this ,
    {
        _loggers     : { value : new ArrayMap()    , writable : true } ,
        _targetLevel : { value : LoggerLevel.NONE  , writable : true } ,
        _targets     : { value : []                , writable : true }
    }) ;
}
LoggerFactory.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : LoggerFactory } ,
    addTarget : { value : function( target                  )
    {
        if( target && (target instanceof LoggerTarget) )
        {
            let channel;
            let log;
            let filters  = target.filters;
            let it = this._loggers.iterator();
            while ( it.hasNext() )
            {
                log     = it.next() ;
                channel = it.key() ;
                if( this._channelMatchInFilterList( channel, filters ) )
                {
                    target.addLogger( log ) ;
                }
            }
            this._targets.push( target );
            if ( ( this._targetLevel === LoggerLevel.NONE ) || ( target.level.valueOf() < this._targetLevel.valueOf() ) )
            {
                this._targetLevel = target.level ;
            }
        }
        else
        {
            throw new Error( strings.INVALID_TARGET );
        }
    }},
    flush : { value : function()
    {
        this._loggers.clear() ;
        this._targets     = [] ;
        this._targetLevel = LoggerLevel.NONE ;
    }},
    getLogger : { value : function ( channel  )
    {
        this._checkChannel( channel ) ;
        let logger = this._loggers.get( channel );
        if( !logger )
        {
            logger = new Logger( channel ) ;
            this._loggers.set( channel , logger ) ;
        }
        let target;
        let len = this._targets.length;
        for( var i = 0 ; i<len ; i++ )
        {
            target = this._targets[i] ;
            if( this._channelMatchInFilterList( channel , target.filters ) )
            {
                target.addLogger( logger ) ;
            }
        }
        return logger ;
    }},
    hasIllegalCharacters : { value : function ( value )
    {
        return indexOfAny( value , strings.ILLEGALCHARACTERS.split("") ) !== -1 ;
    }},
    isAll : { value : function () { return this._targetLevel === LoggerLevel.ALL ; } },
    isCritical : { value : function () { return this._targetLevel === LoggerLevel.CRITICAL ; } },
    isDebug : { value : function() { return this._targetLevel === LoggerLevel.DEBUG ; } },
    isError : { value : function () { return this._targetLevel === LoggerLevel.ERROR ; } },
    isInfo : { value : function() { return this._targetLevel === LoggerLevel.INFO ; } },
    isWarning : { value : function() { return this._targetLevel === LoggerLevel.WARNING ; } },
    isWtf : { value : function() { return this._targetLevel === LoggerLevel.WTF ; } },
    removeTarget : { value : function ( target )
    {
        if( target && target instanceof LoggerTarget )
        {
            var log;
            var filters = target.filters;
            var it = this._loggers.iterator();
            while ( it.hasNext() )
            {
                log = it.next() ;
                var c = it.key();
                if( this._channelMatchInFilterList( c, filters ) )
                {
                    target.removeLogger( log );
                }
            }
            var len = this._targets.length;
            for( var i = 0  ; i < len ; i++ )
            {
                if( target === this._targets[i] )
                {
                    this._targets.splice(i, 1) ;
                    i-- ;
                }
            }
            this._resetTargetLevel() ;
        }
        else
        {
            throw new Error( strings.INVALID_TARGET );
        }
    }},
    toString : { value : function() { return '[LoggerFactory]' ; } },
    _channelMatchInFilterList : { value : function( channel  , filters  )
    {
        let filter;
        let index = -1;
        let len = filters.length;
        for( var i  = 0 ; i<len ; i++ )
        {
            filter = filters[i] ;
            index  = filter.indexOf("*") ;
            if( index === 0 )
            {
                return true ;
            }
            index = (index < 0) ? ( index = channel.length ) : ( index - 1 ) ;
            if( channel.substring(0, index) === filter.substring(0, index) )
            {
                return true ;
            }
        }
        return false ;
    }},
    _checkChannel : { value : function( channel  )
    {
        if( channel === null || channel.length === 0 )
        {
            throw new InvalidChannelError( strings.INVALID_LENGTH );
        }
        if( this.hasIllegalCharacters( channel ) || ( channel.indexOf("*") !== -1 ) )
        {
            throw new InvalidChannelError( strings.INVALID_CHARS ) ;
        }
    }},
    _resetTargetLevel : { value : function()
    {
        let t;
        let min = LoggerLevel.NONE;
        let len = this._targets.length;
        for ( let i = 0 ; i < len ; i++ )
        {
            t = this._targets[i] ;
            if ( ( min === LoggerLevel.NONE ) || ( t.level.valueOf() < min.valueOf() ) )
            {
                min = t.level ;
            }
        }
        this._targetLevel = min ;
    }}
});

var Log = new LoggerFactory();

function LineFormattedTarget( init = null )
{
    LoggerTarget.call( this ) ;
    Object.defineProperties( this ,
    {
        _lineNumber : { value : 1 , writable : true }
    }) ;
    this.includeChannel = false ;
    this.includeDate = false ;
    this.includeLevel = false ;
    this.includeLines = false ;
    this.includeMilliseconds = false ;
    this.includeTime = false ;
    this.separator = " " ;
    if( init )
    {
        for( var prop in init )
        {
            if ( this.hasOwnProperty(prop) )
            {
                this[prop] = init[prop] ;
            }
        }
    }
}
LineFormattedTarget.prototype = Object.create( LoggerTarget.prototype ,
{
    constructor : { value : LineFormattedTarget , writable : true } ,
    internalLog : { value : function( message , level )
    {
    }},
    toString : { writable : true , value : function() { return '[' + this.constructor.name + ']' ; } } ,
    logEntry : { value : function( entry )
    {
        var message = this.formatMessage
        (
            entry.message,
            LoggerLevel.getLevelString( entry.level ),
            entry.channel ,
            new Date()
        );
        this.internalLog( message , entry.level ) ;
    }},
    resetLineNumber : { value : function()
    {
        this._lineNumber = 1 ;
    }},
    formatDate : { value : function( d )
    {
        var date  = "";
        date += this.getDigit( d.getDate() ) ;
        date += "/" + this.getDigit( d.getMonth() + 1 ) ;
        date += "/" + d.getFullYear() ;
        return date ;
    }},
    formatLevel : { value : function( level  )
    {
        return '[' + level + ']' ;
    }},
    formatLines : { value : function()
    {
        return "[" + this._lineNumber++ + "]" ;
    }},
    formatMessage : { value : function( message , level  , channel  , date          )
    {
        var msg = "";
        if (this.includeLines)
        {
            msg += this.formatLines() + this.separator ;
        }
        if( this.includeDate || this.includeTime )
        {
            date = date || new Date() ;
            if (this.includeDate)
            {
                msg += this.formatDate(date) + this.separator ;
            }
            if (this.includeTime)
            {
                msg += this.formatTime(date) + this.separator ;
            }
        }
        if (this.includeLevel)
        {
            msg += this.formatLevel(level || "" ) + this.separator ;
        }
        if ( this.includeChannel )
        {
            msg += ( channel || "" ) + this.separator ;
        }
        msg += message ;
        return msg ;
    }},
    formatTime : { value : function( d )
    {
        var time  = "";
        time += this.getDigit(d.getHours()) ;
        time += ":" + this.getDigit(d.getMinutes()) ;
        time += ":" + this.getDigit(d.getSeconds()) ;
        if( this.includeMilliseconds )
        {
            time += ":" + this.getDigit( d.getMilliseconds() ) ;
        }
        return time ;
    }},
    getDigit : { value : function( n )
    {
        if ( isNaN(n) )
        {
            return "00" ;
        }
        return ((n < 10) ? "0" : "") + n ;
    }}
});

function ConsoleTarget( init = null )
{
    LineFormattedTarget.call( this , init ) ;
}
ConsoleTarget.prototype = Object.create( LineFormattedTarget.prototype ,
{
    constructor : { value : ConsoleTarget } ,
    internalLog : { value : function( message , level )
    {
        if( console )
        {
            switch( level )
            {
                case LoggerLevel.CRITICAL :
                {
                    console.trace( message ) ;
                    break ;
                }
                case LoggerLevel.DEBUG :
                {
                    console.log( message ) ;
                    break ;
                }
                case LoggerLevel.ERROR :
                {
                    console.error( message ) ;
                    break ;
                }
                case LoggerLevel.INFO :
                {
                    console.info( message ) ;
                    break ;
                }
                case LoggerLevel.WARNING :
                {
                    console.warn( message ) ;
                    break ;
                }
                default :
                case LoggerLevel.ALL :
                {
                    console.log( message ) ;
                    break ;
                }
            }
        }
        else
        {
            throw new new ReferenceError('The console reference is unsupported.') ;
        }
    }}
});

var target = new ConsoleTarget({
    includeChannel: true,
    includeDate: false,
    includeLevel: true,
    includeLines: true,
    includeMilliseconds: true,
    includeTime: true
});
target.filters = ['*'];
target.level = LoggerLevel.ALL;

var logger = Log.getLogger(config.name);

function isString( object )
{
    return (typeof(object) === 'string') || (object instanceof String )
}

var isHTMLElement = ( value ) =>
{
    if( !value )
    {
        return false ;
    }
    if ( "HTMLElement" in window )
    {
        return (value && value instanceof HTMLElement);
    }
    return !!( value && typeof(obj) === "object" && ('nodeType' in value) && (value.nodeType === 1) && value.nodeName );
};

function Event$1( type , bubbles = false, cancelable = false )
{
    Object.defineProperties( this ,
    {
        _bubbles                     : { writable : true , value : Boolean(bubbles) } ,
        _cancelable                  : { writable : true , value : Boolean(cancelable) } ,
        _currentTarget               : { writable : true , value : null } ,
        _defaultPrevented            : { writable : true , value : false } ,
        _eventPhase                  : { writable : true , value : 0 } ,
        _propagationStopped          : { writable : true , value : false } ,
        _immediatePropagationStopped : { writable : true , value : false } ,
        _target                      : { writable : true , value : null } ,
        _type                        : { writable : true , value : (type instanceof String || typeof(type) === 'string') ? type : null } ,
    });
    ValueObject.call( this ) ;
}
Event$1.prototype = Object.create( ValueObject.prototype ,
{
    constructor : { writable : true , value : Event$1 } ,
    bubbles : { get : function() { return this._bubbles } } ,
    cancelable : { get : function() { return this._cancelable  ; } }  ,
    currentTarget : { get : function() { return this._currentTarget } }  ,
    eventPhase : { get : function() { return this._eventPhase ; } } ,
    target : { get : function() { return this._target } } ,
    timestamp : { value : (new Date()).valueOf() } ,
    type : { get : function() { return this._type } } ,
    clone : { writable : true , value : function ()
    {
        return new Event$1( this._type, this._bubbles, this._cancelable );
    }},
    isDefaultPrevented : { value : function()
    {
        return this._defaultPrevented ;
    }},
    isImmediatePropagationStopped : { value : function()
    {
        return this._immediatePropagationStopped ;
    }},
    isPropagationStopped : { value : function()
    {
        return this._propagationStopped ;
    }},
    preventDefault : { value : function()
    {
        if( this._cancelable )
        {
            this._defaultPrevented = true;
        }
    }},
    stopImmediatePropagation : { value : function()
    {
        this._immediatePropagationStopped = true;
    }},
    stopPropagation : { value : function()
    {
        this._propagationStopped = true;
    }},
    toString : { writable : true , value : function ()
    {
        return this.formatToString( null , "type", "bubbles", "cancelable");
    }},
    withTarget : { value : function( target )
    {
        var event = this.target ? this.clone() : this;
        event._target = target;
        return event ;
    }},
    withCurrentTarget  : { value : function( currentTarget )
    {
        this._currentTarget = currentTarget ;
        return this;
    }}
});
Object.defineProperties( Event$1 ,
{
    ACTIVATE : { value : "activate" } ,
    ADDED : { value : "added" } ,
    ADDED_TO_STAGE : { value : "addedToStage" } ,
    CANCEL : { value : "cancel" } ,
    CHANGE : { value : "change" } ,
    CLEAR : { value : "clear" } ,
    CLICK : { value : "click" } ,
    CLOSE : { value : "close" } ,
    COMPLETE : { value : "complete" } ,
    CONNECT : { value : "connect" } ,
    COPY : { value : "copy" } ,
    CUT : { value : "cut" } ,
    DEACTIVATE : { value : "deactivate" } ,
    FULLSCREEN : { value : "fullScreen" } ,
    INIT : { value : "init" } ,
    OPEN : { value : "open" } ,
    PASTE : { value : "paste" } ,
    REMOVED : { value : "removed" } ,
    REMOVED_FROM_STAGE : { value : "removedFromStage" } ,
    RENDER : { value : "render" } ,
    RESIZE : { value : "resize" } ,
    SCROLL : { value : "scroll" } ,
    SELECT : { value : "select" } ,
   UNLOAD : { value : "unload" }
 });

function EventListener() {}
EventListener.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : EventListener } ,
    handleEvent : { writable : true , value : function() {} } ,
    toString : { writable : true , value : function ()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

var EventPhase = Object.defineProperties( {} ,
{
    AT_TARGET : { value : 2 , enumerable : true } ,
    BUBBLING_PHASE : { value : 3 , enumerable : true } ,
    CAPTURING_PHASE : { value : 1 , enumerable : true } ,
    NONE : { value : 0 , enumerable : true }
});

function IEventDispatcher() {}
IEventDispatcher.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : IEventDispatcher },
    addEventListener : { writable : true , value : function( type, listener, useCapture = false, priority = 0 ) {} },
    dispatchEvent : { writable : true , value : function( event ) {} },
    hasEventListener : { writable : true , value : function( type ) {} },
    removeEventListener : { writable : true , value : function( type, listener, useCapture = false ) {} },
    willTrigger : { writable : true , value : function( type ) {} }
});

function EventDispatcher( target )
{
    Object.defineProperties( this ,
    {
        target            : { writable : true , value : target instanceof IEventDispatcher ? target : null } ,
        _captureListeners : { value : {} } ,
        _listeners        : { value : {} }
    });
}
EventDispatcher.prototype = Object.create( IEventDispatcher.prototype ,
{
    constructor : { writable : true , value : EventDispatcher },
    addEventListener : { writable : true , value : function( type, listener, useCapture = false, priority = 0 )
    {
        if( !( type instanceof String || typeof(type) === 'string') )
        {
            throw new TypeError( this + " addEventListener failed, the type argument must be a valid String expression." ) ;
        }
        if( !( listener instanceof Function || listener instanceof EventListener ) )
        {
            throw new TypeError( this + " addEventListener failed, the listener must be a valid Function or EventListener reference." ) ;
        }
        let collection = useCapture ? this._captureListeners : this._listeners;
        let entry =
        {
            type       : type,
            listener   : listener ,
            useCapture : useCapture,
            priority   : priority
        };
        if ( !(type in collection) )
        {
            collection[type] = [ entry ];
        }
        else
        {
            collection[type].push( entry );
        }
        collection[type].sort( this.compare );
    } },
    dispatchEvent : { writable : true , value : function( event )
    {
        if( !( event instanceof Event$1 ) )
        {
            throw new TypeError( this + " dispatchEvent failed, the event argument must be a valid Event object." ) ;
        }
        event = event.withTarget( this.target || this );
        let ancestors = this.createAncestorChain();
        event._eventPhase = EventPhase.CAPTURING_PHASE ;
        EventDispatcher.internalHandleCapture( event , ancestors );
        if ( !event.isPropagationStopped() )
        {
            event._eventPhase = EventPhase.AT_TARGET;
            event.withCurrentTarget( event._target );
            let listeners = this._listeners[ event.type ];
            if (this._listeners[ event.type ])
            {
                EventDispatcher.processListeners( event, listeners );
            }
        }
        if ( event.bubbles && !event.isPropagationStopped() )
        {
            event._eventPhase = EventPhase.BUBBLING_PHASE;
            EventDispatcher.internalHandleBubble( event , ancestors ) ;
        }
        return !event.isDefaultPrevented();
    }},
    hasEventListener : { writable : true , value : function( type )
    {
        return Boolean(this._listeners[type] || this._captureListeners[type]) ;
    }},
    removeEventListener : { writable : true , value : function( type , listener, useCapture = false )
    {
        if( !( type instanceof String || typeof(type) === 'string') )
        {
            throw new TypeError( this + " removeEventListener failed, the type must be a valid String expression." ) ;
        }
        if( !( listener instanceof Function || listener instanceof EventListener ) )
        {
            throw new TypeError( this + " removeEventListener failed, the listener must be a valid Function or EventListener reference." ) ;
        }
        let collection = useCapture ? this._captureListeners : this._listeners;
        let listeners  = collection[type];
        if ( listeners && listeners.length > 0 )
        {
            let len = listeners.length;
            for ( let i = 0 ; i < len ; ++i )
            {
                if ( listeners[i].listener === listener )
                {
                    if ( len === 1 )
                    {
                        delete collection[type] ;
                    }
                    else
                    {
                        listeners.splice(i, 1);
                    }
                    break;
                }
            }
        }
    }},
    toString : { writable : true , value : function ()
    {
        let exp = '[' + this.constructor.name;
        if( this.target )
        {
            exp += ' target:' + this.target ;
        }
        return exp + ']' ;
    }},
    willTrigger : { writable : true , value : function( type )
    {
        let parents = this.createAncestorChain();
        if( (parents instanceof Array) && parents.length > 0 )
        {
            let parent;
            let len = parents.length;
            while( --len > -1 )
            {
                parent = parents[len] ;
                if( (parent instanceof IEventDispatcher) && parent.hasEventListener( type ) )
                {
                    return true;
                }
            }
        }
        return this.hasEventListener(type);
    }} ,
    createAncestorChain : { writable : true , value : function()
    {
        return null;
    }},
    compare : { value : function( entry1 , entry2 )
    {
        if ( entry1.priority > entry2.priority )
        {
            return -1;
        }
        else if ( entry1.priority < entry2.priority )
        {
            return 1;
        }
        else
        {
            return 0 ;
        }
    }},
    processCapture : { value : function( event )
    {
        event.withCurrentTarget( this.target || this ) ;
        let listeners = this._captureListeners[ event.type ];
        if ( listeners )
        {
            EventDispatcher.processListeners( event , listeners );
        }
    }},
    processBubble : { value : function( event )
    {
        event.withCurrentTarget( this.target || this );
        let listeners = this._listeners[ event.type ];
        if ( listeners )
        {
            EventDispatcher.processListeners( event, listeners ) ;
        }
    }}
});
Object.defineProperties( EventDispatcher ,
{
    processListeners : { value : function ( event , listeners )
    {
        if( listeners instanceof Array && listeners.length > 0 )
        {
            let len = listeners.length;
            let listener;
            for ( let i = 0 ; i < len ; ++i )
            {
                listener = listeners[i].listener ;
                let flag;
                if( listener instanceof EventListener )
                {
                    flag = listener.handleEvent(event) ;
                }
                else if( listener instanceof Function )
                {
                    flag = listener(event) ;
                }
                if( flag === false )
                {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if ( event.isImmediatePropagationStopped() )
                {
                    break;
                }
            }
        }
    }},
    internalHandleCapture : { value : function( event , ancestors )
    {
        if ( !(ancestors instanceof Array) || ancestors.length <= 0 )
        {
            return ;
        }
        let dispatcher;
        let len = ancestors.length - 1;
        for ( let i = len ; i >= 0 ; i-- )
        {
            dispatcher = ancestors[i] ;
            dispatcher.processCapture( event );
            if ( event.isPropagationStopped() )
            {
                break ;
            }
        }
    }},
    internalHandleBubble : { value : function( event , ancestors )
    {
        if (!ancestors || ancestors.length <= 0)
        {
            return;
        }
        let dispatcher;
        let len = ancestors.length;
        for ( let i = 0 ; i < len ; i++ )
        {
            dispatcher = ancestors[i];
            dispatcher.processBubble( event ) ;
            if ( event.isPropagationStopped() )
            {
                break;
            }
        }
    }}
});

function DisplayObject( init = null )
{
    EventDispatcher.call( this ) ;
    Object.defineProperties( this ,
    {
        _id       : { value : null  , writable : true } ,
        __isStage : { value : false , writable : true } ,
        _parent   : { value : null  , writable : true }
    }) ;
    if( init )
    {
        for( let prop in init )
        {
            if( prop in this )
            {
                this[prop] = init[prop] ;
            }
        }
    }
}
DisplayObject.prototype = Object.create( EventDispatcher.prototype ,
{
    constructor : { value : DisplayObject , writable : true } ,
    base :
    {
        get : function()
        {
            let current = this;
            while( current._parent )
            {
                current = current._parent;
            }
            return current ;
        }
    },
    id :
    {
        get : function() { return this._id ; },
        set : function( value )
        {
            this._id = isString(value) ? value : null ;
            if( this._element )
            {
                this.setAttribute( 'id' , value ) ;
            }
        }
    },
    parent :
    {
        get : function() { return this._parent ; }
    },
    root :
    {
        get : function()
        {
            let current = this;
            while( current._parent )
            {
                if ( current._parent.__isStage )
                {
                    return current ;
                }
                else
                {
                    current = current._parent ;
                }
            }
            return current ;
        }
    },
    stage :
    {
        get : function()
        {
            let base = this.base;
            return base && base.__isStage ? base : null ;
        }
    },
    dispose : { value : function()
    {
    }},
    removeFromParent : { value : function()
    {
        if ( this._parent )
        {
            this._parent.removeChild( this );
        }
    }},
    createAncestorChain : { value : function()
    {
        let ancestors = [];
        let current = this;
        while( current._parent )
        {
            ancestors.push( current._parent ) ;
            current = current._parent ;
        }
        return ancestors ;
    }},
    setParent : { value : function( value )
    {
        let ancestor = value;
        while ( (ancestor !== this) && (ancestor !== null) )
        {
            ancestor = ancestor._parent ;
        }
        if( ancestor === this )
        {
            throw new ReferenceError("An object cannot be added as a child to itself or one of its children.");
        }
        else
        {
            this._parent = value;
        }
    }}
}) ;

function DisplayObjectContainer( init = null )
{
    Object.defineProperties( this ,
    {
        _broadcastListeners : { value : [] } ,
        _children           : { value : [] }
    }) ;
    DisplayObject.call( this , init ) ;
}
DisplayObjectContainer.prototype = Object.create( DisplayObject.prototype ,
{
    constructor : { value : DisplayObjectContainer , writable : true } ,
    children : { get : function()
    {
        return this._children ;
    }},
    numChildren : { get : function()
    {
        return this._children.length ;
    }},
    addChild : { value : function( child )
    {
        return this.addChildAt( child , this._children.length );
    }},
    addChildAt : { value : function( child , index )
    {
        if( child instanceof DisplayObject )
        {
            let numChildren = this._children.length;
            if ( index >= 0 && index <= numChildren )
            {
                if( child.parent === this )
                {
                    this.setChildIndex(child, index) ;
                }
                else
                {
                    if ( index >= numChildren )
                    {
                        this._children.push( child ) ;
                        this._appendChild( child ) ;
                    }
                    else
                    {
                        this._children.splice( index , 0 , child ) ;
                        this._insertChildAt( child , index ) ;
                    }
                    child.removeFromParent() ;
                    child.setParent( this );
                    child.dispatchEvent( new Event$1( Event$1.ADDED , true ) ) ;
                    if( this.stage )
                    {
                        let event = new Event$1( Event$1.ADDED_TO_STAGE );
                        if( child instanceof DisplayObjectContainer )
                        {
                            child.broadcastEvent( event );
                        }
                        else
                        {
                            child.dispatchEvent(event);
                        }
                    }
                }
                return child ;
            }
            else
            {
                throw new RangeError( this + " addChildAt(" + index + ") failed, invalid child index.");
            }
        }
        return null ;
    }} ,
    contains : { value : function( child )
    {
        while (child)
        {
            if (child === this)
            {
                return true;
            }
            else
            {
                child = child._parent;
            }
        }
        return false;
    }},
    getChildAt : { value : function( index )
    {
        let numChildren = this._children.length;
        if (index < 0)
        {
            index = numChildren + index;
        }
        if (index >= 0 && index < numChildren)
        {
            return this._children[index];
        }
        else
        {
            throw new RangeError("Invalid child index");
        }
    }},
    getChildIndex : { value : function( child )
    {
        return this._children.indexOf(child);
    }},
    removeChild : { value : function( child , dispose = false )
    {
        let index = this.getChildIndex(child);
        if ( index !== -1 )
        {
            return this.removeChildAt( index , dispose );
        }
        return null ;
    }},
    removeChildAt : { value : function( index , dispose = false )
    {
        if (index >= 0 && index < this._children.length )
        {
            let child = this._children[index];
            child.dispatchEvent( new Event$1( Event$1.REMOVED, true ) );
            if( this.stage )
            {
                let event = new Event$1( Event$1.REMOVED_FROM_STAGE );
                if( child instanceof DisplayObjectContainer )
                {
                    child.broadcastEvent(event);
                }
                else
                {
                    child.dispatchEvent(event);
                }
            }
            child.setParent(null);
            index = this._children.indexOf( child ) ;
            if (index >= 0)
            {
                this._children.splice( index , 0 , child ) ;
                this._removeChild( child ) ;
            }
            if( dispose === true )
            {
                child.dispose() ;
            }
            return child;
        }
        else
        {
            throw new RangeError( this + " removeChildAt failed with an invalid child index");
        }
    }},
    removeChildren : { value : function( beginIndex = 0 , endIndex = -1 , dispose = false )
    {
        let len = this._children.length;
        if ( (endIndex < 0) || (endIndex >= len) )
        {
            endIndex = len - 1;
        }
        let children = this._children.slice( beginIndex, endIndex - beginIndex + 1 );
        len = children.length ;
        for( let i = 0 ; i <= len ; i++ )
        {
            this.removeChild(children[i], dispose);
        }
    }},
    setChildIndex : { value : function( child , index )
    {
        if( child instanceof Node )
        {
            let oldIndex = this.getChildIndex( child );
            if (oldIndex === index)
            {
                return;
            }
            if (oldIndex === -1)
            {
                throw new Error( this + " setChildIndex failed, the passed-in child reference is not a child of this container." );
            }
            this._children.splice( oldIndex, 1 ) ;
            this._children.splice( index , 0 , child ) ;
            if( this._element )
            {
                if ( index >= this._children.length )
                {
                    this._element.appendChild( child._element ) ;
                }
                else
                {
                    this._element.insertBefore( child._element, this._element.children[index] ) ;
                }
            }
        }
    }},
    broadcastEvent : { value : function( event )
    {
        if( !(event instanceof Event$1) )
        {
            throw new ReferenceError( this + " broadcastEvent failed, the event parameter must be a valid system.events.Event reference." ) ;
        }
        if ( event.bubbles )
        {
            throw new ReferenceError("Broadcast of bubbling events is prohibited");
        }
        let fromIndex = this._broadcastListeners.length;
        this.getChildEventListeners( this, event.type , this._broadcastListeners );
        let toIndex = this._broadcastListeners.length;
        for( let i = fromIndex ; i < toIndex ; i++ )
        {
            this._broadcastListeners[i].dispatchEvent( event ) ;
        }
        this._broadcastListeners.length = fromIndex ;
    }},
    getChildEventListeners : { value : function( object, eventType, listeners )
    {
        try
        {
            if ( object.hasEventListener( eventType ) )
            {
                listeners[listeners.length] = object ;
            }
            if ( object instanceof DisplayObjectContainer )
            {
                let children = object._children;
                let len      = children.length;
                for ( let i = 0 ; i<len ; i++ )
                {
                    this.getChildEventListeners( children[i] , eventType , listeners );
                }
            }
        }
        catch (e)
        {
            console.log( this + " error " + e ) ;
        }
    }},
    _appendChild : { writable : true , value : function( child )
    {
    }},
    _insertChildAt : { writable : true , value : function( child , index )
    {
    }},
    _removeChild : { writable : true , value : function( child )
    {
    }}
}) ;

function Node$1( init = null , tag = null )
{
    let el = null;
    if( isHTMLElement(tag) )
    {
        el = tag ;
    }
    else if( isString(tag) )
    {
        el = document.createElement( tag ) ;
    }
    Object.defineProperties( this ,
    {
        _element : { value : el , writable : true }
    }) ;
    DisplayObjectContainer.call( this , init ) ;
}
Node$1.prototype = Object.create( DisplayObjectContainer.prototype ,
{
    constructor : { value : Node$1 , writable : true } ,
    addClass : { value : function( value )
    {
        if( !this._element.classList.contains( value ) )
        {
            this._element.classList.add( value ) ;
        }
    }},
    id :
    {
        get : function() { return this._element.id ; },
        set : function( value )
        {
            this._element.id = value;
        }
    },
    class :
    {
        get : function() { return this.getAttribute( "class" ) ; },
        set : function( value )
        {
            this.setAttribute( "class" , value );
        }
    },
    element :
    {
        get : function() { return this._element ; },
        set : function( value )
        {
            this._element = null ;
            if( isHTMLElement(value) )
            {
                this._element = value ;
            }
            else if( isString(value) )
            {
                this._element = document.getElementById( value ) ;
            }
        }
    },
    getAttribute : { value : function( name )
    {
        if( this._element )
        {
            return this._element.getAttribute( name ) ;
        }
        return null ;
    }},
    removeClass : { value : function( value )
    {
        if( this._element.classList.contains( value ) )
        {
            this._element.classList.remove( value ) ;
        }
    }},
    setAttribute : { value : function( name , value )
    {
        if( this._element )
        {
            this._element.setAttribute( name , value ) ;
        }
    }},
    _appendChild : { writable : true , value : function( child )
    {
        if( child && child._element && this._element )
        {
            this._element.appendChild( child._element ) ;
        }
    }},
    _insertChildAt : { writable : true , value : function( child , index )
    {
        if( this._element && child && child._element  )
        {
            this._element.insertBefore( child._element, this._element.children[index] ) ;
        }
    }},
    _removeChild : { writable : true , value : function( child )
    {
        if( child && child._element )
        {
            child._element.parentNode.removeChild(child._element);
        }
    }}
}) ;

function Img ()
{
    Node$1.call( this , null , 'img' ) ;
}
Img.prototype = Object.create( Node$1.prototype ,
{
    constructor : { value : Img , writable : true } ,
    height :
    {
        get : function() { return this.getAttribute( 'height' ) ; } ,
        set : function( value ) { this.setAttribute( 'height' , value ) ; }
    },
    src :
    {
        get : function() { return this.getAttribute('src') ; },
        set : function( value )
        {
            this.setAttribute( 'src' , value ) ;
        }
    },
    width :
    {
        get : function() { return this.getAttribute( 'width' ) ; } ,
        set : function( value ) { this.setAttribute( 'width' , value ) ; }
    }
}) ;

const logger$1 = Log.getLogger( 'molecule.logging.logger' );

function Assets( init = null )
{
    Node$1.call( this , init , 'a-assets' ) ;
    if( this.element )
    {
        this.element.addEventListener( 'error'  , this._error.bind(this) ) ;
        this.element.addEventListener( 'loaded' , this._loaded.bind(this) ) ;
    }
}
Assets.prototype = Object.create( Node$1.prototype ,
{
    constructor : { value : Assets , writable : true } ,
    _error : { value : function( event )
    {
        logger$1.error( this + " error, " + event ) ;
    }},
    _loaded : { value : function( event )
    {
        logger$1.debug( this + " loaded, " + event ) ;
    }}
}) ;

var assets$1 = [{
    id: "assets",
    type: Assets,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "addChild", args: [{ ref: "home_image" }] }]
},
{
    id: "home_image",
    type: Img,
    properties: [{ name: "#init", config: "home_image" }]
}];

var clamp = ( value , min , max ) =>
{
    if ( isNaN( value ) )
    {
        return NaN ;
    }
    if ( isNaN( min ) )
    {
        min = value ;
    }
    if ( isNaN( max ) )
    {
        max = value ;
    }
    return Math.max( Math.min( value, max ), min ) ;
};

function AEntity( init = null , tag = 'a-entity' )
{
    Object.defineProperties( this ,
    {
        addedToStage : { value : new Signal() } ,
        removedFromStage : { value : new Signal() } ,
        _addedToStage     : { writable : true , value : null } ,
        _onStage          : { writable : true , value : false } ,
        _position         : { writable : false , value : { x : 0 , y : 0 , z : 0 } } ,
        _raycast          : { writable : false , value : 'button' } ,
        _removedFromStage : { writable : true , value : null } ,
        _rotation         : { writable : false , value : { x : 0 , y : 0 , z : 0 } } ,
        _root             : { writable : true  , value : null } ,
        _scale            : { writable : false , value : { x : 1 , y : 1 , z : 1 } }
    }) ;
    Node$1.call( this , init , tag ) ;
    this._addedToStage = this.__addedToStage.bind( this ) ;
    this._removedFromStage = this.__removedFromStage.bind( this ) ;
    this.addEventListener( Event$1.ADDED_TO_STAGE     , this._addedToStage ) ;
    this.addEventListener( Event$1.REMOVED_FROM_STAGE , this._removedFromStage ) ;
}
AEntity.prototype = Object.create( Node$1.prototype ,
{
    constructor : { value : AEntity , writable : true } ,
    alpha :
    {
        get : function() { return this.getAttribute('opacity') ; },
        set : function( value )
        {
            this.setAttribute( 'opacity' , clamp(value,0,1) ) ;
        }
    },
    dispose : { value : function()
    {
        this.removeEventListener( Event$1.ADDED_TO_STAGE     , this._addedToStage ) ;
        this.removeEventListener( Event$1.REMOVED_FROM_STAGE , this._removedFromStage ) ;
    }},
    geometry :
    {
        get : function() { return this.getAttribute( 'geometry' ) ; },
        set : function( value ) { this.setAttribute( 'geometry' , value ) ; }
    },
    raycasted :
    {
        get : function() { return this._element.classList.contains( this._raycast ) ; },
        set : function( value )
        {
            if( value === true )
            {
                this._element.classList.add( this._raycast ) ;
            }
            else
            {
                if( this._element.classList.contains( this._raycast ) )
                {
                    this._element.classList.remove( this._raycast ) ;
                }
            }
        }
    },
    raycast :
    {
        get : function() { return this._raycast ; },
        set : function( value )
        {
            if( value !== this._raycast )
            {
                this.raycasted = false ;
            }
            this._raycast = value ;
            this.raycasted = true ;
        }
    },
    opacity :
    {
        get : function() { return this.getAttribute('opacity') ; },
        set : function( value )
        {
            this.setAttribute( 'opacity' , clamp(value,0,1) ) ;
        }
    },
    position :
    {
        get : function() { return this._position ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._position.x = value.x ;
            }
            if( 'y' in value )
            {
                this._position.y = value.y ;
            }
            if( 'z' in value )
            {
                this._position.z = value.z ;
            }
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },
    rotation :
    {
        get : function() { return this._rotation ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._rotation.x = value.x ;
            }
            if( 'y' in value )
            {
                this._rotation.y = value.y ;
            }
            if( 'z' in value )
            {
                this._rotation.z = value.z ;
            }
            this.setAttribute( 'position' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },
    rotationX :
    {
        get : function() { return this._rotation.x ; },
        set : function(value)
        {
            this._rotation.x = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },
    rotationY :
    {
        get : function() { return this._rotation.y ; },
        set : function( value )
        {
            this._rotation.y = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },
    rotationZ :
    {
        get : function() { return this._rotation.z ; },
        set : function(value)
        {
            this._rotation.z = value ;
            this.setAttribute( 'rotation' , this._rotation.x + ' ' + this._rotation.y + ' ' + this._rotation.z ) ;
        }
    },
    scale :
    {
        get : function() { return this._scale ; },
        set : function( value )
        {
            if( 'x' in value )
            {
                this._scale.x = value.x ;
            }
            if( 'y' in value )
            {
                this._scale.y = value.y ;
            }
            if( 'z' in value )
            {
                this._scale.z = value.z ;
            }
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },
    scaleX :
    {
        get : function() { return this._scale.x ; },
        set : function(value)
        {
            this._scale.x = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },
    scaleY :
    {
        get : function() { return this._scale.y ; },
        set : function( value )
        {
            this._scale.y = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },
    scaleZ :
    {
        get : function() { return this._scale.z ; },
        set : function(value)
        {
            this._scale.z = value ;
            this.setAttribute( 'scale' , this._scale.x + ' ' + this._scale.y + ' ' + this._scale.z ) ;
        }
    },
    visible :
    {
        get : function() { return this.getAttribute('visible') === "true" ; },
        set : function(value)
        {
            this.setAttribute( 'visible' , value === true ? 'true' : 'false' ) ;
        }
    },
    x :
    {
        get : function() { return this._position.x ; },
        set : function(value)
        {
            this._position.x = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },
    y :
    {
        get : function() { return this._position.y ; },
        set : function( value )
        {
            this._position.y = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },
    z :
    {
        get : function() { return this._position.z ; },
        set : function(value)
        {
            this._position.z = value ;
            this.setAttribute( 'position' , this._position.x + ' ' + this._position.y + ' ' + this._position.z ) ;
        }
    },
    notifyAddedToStage : { value : function()
    {
        this.addedToStage.emit( this ) ;
    }},
    notifyRemovedFromStage : { value : function()
    {
        this.removedFromStage.emit( this ) ;
    }},
    setAttribute : { value : function( attr , value , componentAttrValue )
    {
        if( this._element )
        {
            this._element.setAttribute( attr , value , componentAttrValue ) ;
        }
    }},
    __addedToStage : { value : function()
    {
        this._onStage = true ;
        this.notifyAddedToStage() ;
    }},
    __removedFromStage : { value : function()
    {
        this._onStage = false ;
        this.notifyRemovedFromStage() ;
    }}
}) ;

function Sound( init = null )
{
    Object.defineProperties( this ,
    {
        finishIt : { value : new Signal() },
        startIt : { value : new Signal() } ,
         _ended       : { writable : true , value : null  } ,
         _playing     : { writable : true , value : false } ,
         _requestPlay : { writable : true , value : false } ,
         _running     : { writable : true , value : false }
    }) ;
    AEntity.call( this , init , 'a-sound' ) ;
}
Sound.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Sound , writable : true } ,
    autoplay :
    {
        get : function() { return this._requestPlay ; },
        set : function( value ) { this._requestPlay = (value === true) ; }
    },
    loop :
    {
        get : function() { return this.getAttribute( 'sound' ).loop ; },
        set : function( value ) { this.setAttribute( 'sound' , 'loop' , value ) ; }
    },
    phase : { get : function() { return this._phase ; } },
    running : { get : function() { return this._running ; } },
    notifyFinished : { writable : true , value : function()
    {
        this._running = false ;
        this.finishIt.emit( this ) ;
    }},
    notifyStarted : { writable : true , value : function()
    {
        this._running = true ;
        this.startIt.emit( this ) ;
    }},
    play : { value : function()
    {
        if( this._onStage === true && this._playing === false )
        {
            setTimeout( this.__playSound.bind( this ) , 100 );
        }
        else
        {
            this._requestPlay = true ;
        }
    }},
    pause : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            this._element.components.sound.pauseSound();
            this._playing = false ;
        }
    }},
    stop : { value : function()
    {
        if( this._onStage === true && this._playing === true )
        {
            if( this._ended )
            {
                this._element.removeEventListener( 'sound-ended' , this._ended ) ;
                this._ended = false ;
            }
            this._element.components.sound.stopSound();
            this._playing = false ;
        }
    }},
    src :
    {
        get : function() { return this.getAttribute( 'sound' ).src ; },
        set : function( value ) { this.setAttribute( 'sound' , 'src' , value ) ; }
    },
    volume :
    {
        get : function() { return this.getAttribute( 'sound' ).volume ; },
        set : function( value ) { this.setAttribute( 'sound' , 'volume' , value ) ; }
    },
    __addedToStage : { value : function()
    {
        this._onStage = true ;
        if( this._requestPlay === true )
        {
            this._requestPlay = false ;
            this.play() ;
        }
    }},
    __playSound : { value : function()
    {
        if( this._onStage === true && this._playing === false )
        {
            this._playing = true ;
            this.notifyStarted() ;
            this._ended = this.__ended.bind( this ) ;
            this._element.addEventListener( 'sound-ended' , this._ended ) ;
            this._element.components.sound.playSound();
        }
    }},
    __removedFromStage : { value : function()
    {
        this._onStage = false ;
        if( this._ended )
        {
            this._element.removeEventListener( 'sound-ended' , this._ended ) ;
            this._ended = false ;
        }
        if( this._playing === true )
        {
            this.stop() ;
        }
    }},
    __ended : { value : function()
    {
        this._playing = false ;
        this._element.removeEventListener( 'sound-ended' , this._ended ) ;
        this._ended = null ;
        this.notifyFinished() ;
    }}
}) ;

var camera$1 = [{
    id: "camera",
    type: AEntity,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "camera" }, { name: "setAttribute", args: [{ value: "camera" }, { value: "" }] }, { name: "setAttribute", args: [{ value: "look-controls" }, { value: "" }]
    }]
}, {
    id: "over_sound",
    type: Sound,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "over_sound" }]
}];

var container = [{
    id: "container",
    type: AEntity,
    singleton: true,
    lazyInit: true
}];

function Runnable() {}
Runnable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Runnable },
    run : { writable : true , value : function()
    {
    }},
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

var TaskPhase = Object.defineProperties( {} ,
{
    ERROR : { value : 'error' , enumerable : true } ,
    DELAYED : { value : 'delayed'  , enumerable : true } ,
    FINISHED : { value : 'finished' , enumerable : true } ,
    INACTIVE : { value : 'inactive' , enumerable : true } ,
    RUNNING : { value : 'running' , enumerable : true } ,
    STOPPED : { value : 'stopped' , enumerable : true } ,
    TIMEOUT : { value : 'timeout' , enumerable : true }
});

function Action()
{
    Object.defineProperties( this ,
    {
        finishIt : { value : new Signal() },
        startIt : { value : new Signal() } ,
        __lock__ : { writable : true  , value : false },
        _phase : { writable : true , value : TaskPhase.INACTIVE },
        _running : { writable : true , value : false }
    }) ;
}
Action.prototype = Object.create( Runnable.prototype ,
{
    constructor : { writable : true , value : Action } ,
    phase : { get : function() { return this._phase ; } },
    running : { get : function() { return this._running ; } },
    clone : { writable : true , value : function()
    {
        return new Action() ;
    }},
    isLocked : { writable : true , value : function()
    {
        return this.__lock__ ;
    }},
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},
    notifyFinished : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.FINISHED ;
        this.finishIt.emit( this ) ;
        this._phase = TaskPhase.INACTIVE ;
    }},
    notifyStarted : { writable : true , value : function()
    {
        this._running = true ;
        this._phase  = TaskPhase.RUNNING ;
        this.startIt.emit( this ) ;
    }},
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
    }}
});

function Task()
{
    Action.call( this ) ;
    Object.defineProperties( this ,
    {
        changeIt : { value : new Signal() },
        clearIt : { value : new Signal() },
        errorIt : { value : new Signal() },
        infoIt : { value : new Signal() },
        looping : { value : false  , writable : true } ,
        loopIt : { value : new Signal() },
        pauseIt : { value : new Signal() },
        progressIt : { value : new Signal() },
        resumeIt : { value : new Signal() },
        stopIt : { value : new Signal() },
        throwError : { value : false , writable : true } ,
        timeoutIt : { value : new Signal() }
    }) ;
}
Task.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Task },
    clone : { writable : true , value : function()
    {
        return new Task() ;
    }},
    notifyChanged : { writable : true , value : function()
    {
        if ( !this.__lock__ )
        {
            this.changeIt.emit( this ) ;
        }
    }},
    notifyCleared : { writable : true , value : function()
    {
        if ( !this.__lock__ )
        {
            this.clearIt.emit( this ) ;
        }
    }},
    notifyError : { writable : true , value : function( message = null )
    {
        this._running = false ;
        this._phase = TaskPhase.ERROR ;
        if ( !this.__lock__ )
        {
            this.errorIt.emit( this , message ) ;
        }
        if( this.throwError )
        {
            throw new Error( message ) ;
        }
    }},
    notifyInfo : { writable : true , value : function( info )
    {
        if ( !this.__lock__ )
        {
            this.infoIt.emit( this , info ) ;
        }
    }},
    notifyLooped : { writable : true , value : function()
    {
        this._running = true ;
        this._phase = TaskPhase.RUNNING ;
        if ( !this.__lock__ )
        {
            this.loopIt.emit( this ) ;
        }
    }},
    notifyPaused : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.STOPPED ;
        if ( !this.__lock__ )
        {
            this.pauseIt.emit( this ) ;
        }
    }},
    notifyProgress : { writable : true , value : function()
    {
        this._running = true ;
        this._phase = TaskPhase.RUNNING ;
        if ( !this.__lock__ )
        {
            this.progressIt.emit( this ) ;
        }
    }},
    notifyResumed : { writable : true , value : function()
    {
        this._running = true ;
        this._phase = TaskPhase.RUNNING ;
        if ( !this.__lock__ )
        {
            this.resumeIt.emit( this ) ;
        }
    }},
    notifyStopped : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.STOPPED ;
        if ( !this.__lock__ )
        {
            this.stopIt.emit( this ) ;
        }
    }},
    notifyTimeout : { writable : true , value : function()
    {
        this._running = false ;
        this._phase = TaskPhase.TIMEOUT ;
        if ( !this.__lock__ )
        {
            this.timeoutIt.emit( this ) ;
        }
    }},
    resume : { writable : true , value : function() {} },
    reset : { writable : true , value : function() {} },
    start : { writable : true , value : function()
    {
        this.run() ;
    }},
    stop : { writable : true , value : function() {} }
});

function Timer( delay =  0 , repeatCount = 0, useSeconds = false )
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        _count : { value : 0 , writable : true },
        _delay : { value : delay > 0 ? delay : 0 , writable : true },
        _itv : { value : 0 , writable : true },
        _repeatCount : { value : repeatCount > 0 ? repeatCount : 0 , writable : true },
        _stopped : { value : false , writable : true },
        _useSeconds : { value : Boolean(useSeconds) , writable : true }
    }) ;
}
Timer.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Timer , writable : true } ,
    currentCount : { get : function() { return this._count ; } } ,
    delay :
    {
        get : function () { return this._delay ; } ,
        set : function( value )
        {
            if ( this._running )
            {
                throw new Error( this + " the 'delay' property can't be changed during the running phase.") ;
            }
            this._delay = ( value > 0 ) ? value : 0 ;
        }
    },
    repeatCount :
    {
        get :function ()
        {
            return this._repeatCount ;
        },
        set : function( value )
        {
            this._repeatCount = (value > 0) ? value : 0 ;
        }
    },
    stopped : { get : function () { return this._stopped ; } },
    useSeconds :
    {
        get : function() { return this._useSeconds ; } ,
        set : function( flag  )
        {
            if ( this._running )
            {
                throw new Error( this + " the 'useSeconds' property can't be changed during the running phase.") ;
            }
            this._useSeconds = Boolean(flag) ;
        }
    },
    clone : { value : function()
    {
        return new Timer( this._delay , this._repeatCount ) ;
    }} ,
    resume : { value : function()
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this._itv = setInterval
            (
                this._next.bind(this) ,
                this._useSeconds ? (this._delay*1000) : this._delay
            ) ;
            this.notifyResumed() ;
        }
    }},
    reset : { value : function()
    {
        if( this.running )
        {
            this.stop() ;
        }
        this._count = 0 ;
    }},
    run : { value : function ()
    {
        if( !this._running )
        {
            this._count   = 0 ;
            this._stopped = false ;
            this.notifyStarted() ;
            this._itv = setInterval
            (
                this._next.bind(this) ,
                this._useSeconds ? (this._delay*1000) : this._delay
            ) ;
        }
    }},
    stop : { value : function()
    {
        if ( this._running && !this._stopped )
        {
            this._running = false ;
            this._stopped = true ;
            clearInterval( this._itv ) ;
            this.notifyStopped() ;
        }
    }},
    _next : { value : function()
    {
        this._count ++ ;
        this.notifyProgress() ;
        if ( (this._repeatCount > 0) && (this._repeatCount === this._count) )
        {
            clearInterval( this._itv ) ;
            this.notifyFinished() ;
        }
    }}
});

function Cursor( init = null )
{
    Object.defineProperties( this ,
    {
        click : { value : new Signal() } ,
        down : { value : new Signal() } ,
        out : { value : new Signal() } ,
        over : { value : new Signal() } ,
        up : { value : new Signal() } ,
         _enabled             : { writable : true , value : true } ,
         _intersection        : { writable : true , value : null } ,
         _intersectionCleared : { writable : true , value : null } ,
         _launchedRaycaster   : { writable : true , value : false } ,
         _objects             : { writable : true , value : 'button' } ,
         _mouseDown           : { writable : true , value : null } ,
         _mouseUp             : { writable : true , value : null } ,
         _notifyClick         : { writable : true , value : null } ,
         _target              : { writable : true , value : null } ,
         _timer               : { value : new Timer( 0 , 1 ) }
    });
    AEntity.call( this , init ) ;
    this.objects = this._objects ;
}
Cursor.prototype = Object.create( AEntity.prototype ,
{
    constructor : { writable : true , value : Cursor } ,
    duration :
    {
        get : function () { return this._timer.delay ; } ,
        set : function( value )
        {
            this._timer.delay = value ;
        }
    },
    dispose : { value : function()
    {
        this.removeEventListener( 'addedToStage'     , this._addedToStage ) ;
        this.removeEventListener( 'removedFromStage' , this._removedFromStage ) ;
    }},
    enabled :
    {
        get : function()
        {
            return this._enabled ;
        },
        set : function( value )
        {
            this._enabled = (value === true) ;
            if( this._enabled ===  true )
            {
                if( this._onStage === true && this._launchedRaycaster === false )
                {
                    this.launchRaycaster() ;
                }
            }
            else
            {
                if( this._launchedRaycaster === true )
                {
                    this.stopRaycaster() ;
                }
            }
        }
    },
    objects :
    {
        get : function()
        {
            return this._objects ;
        },
        set : function( value )
        {
            if( isString(this._objects) && this._objects !== '' )
            {
                this._objects = value ;
                this.setAttribute( 'raycaster' , 'objects' , '.' + this._objects ) ;
            }
            else
            {
                this._objects = '' ;
                this.setAttribute( 'raycaster' , '' ) ;
            }
        }
    },
    notifyClick : { value : function()
    {
        if( this._target )
        {
            if ( this.click.connected )
            {
                this.click.emit( this._target , this ) ;
            }
            this._target.dispatchEvent( new Event( 'click' ) ) ;
        }
    }},
    notifyDown : { value : function()
    {
        if ( this.down.connected )
        {
            this.down.emit( this._target , this ) ;
        }
        this._target.dispatchEvent( new Event( 'mousedown' ) ) ;
    }},
    notifyOver : { value : function()
    {
        if( this._target )
        {
            if ( this.over.connected )
            {
                this.over.emit( this._target , this ) ;
            }
            this._target.dispatchEvent( new Event( 'mouseenter' ) ) ;
            this._timer.run() ;
        }
    }},
    notifyOut : { value : function()
    {
        if( this._timer.running )
        {
            this._timer.stop() ;
        }
        if( this._target )
        {
            if ( this.out.connected )
            {
                this.out.emit( this._target , this ) ;
            }
            this._target.dispatchEvent( new Event( 'mouseleave' ) ) ;
        }
    }},
    notifyUp : { value : function()
    {
        if ( this.up.connected )
        {
            this.up.emit( this._target , this ) ;
        }
        this._target.dispatchEvent( new Event( 'mouseup' ) ) ;
    }},
    useSeconds :
    {
        get : function() { return this._timer.useSeconds ; } ,
        set : function( flag  )
        {
            this._timer.useSeconds = flag ;
        }
    },
    __addedToStage : { value : function()
    {
        this._onStage = true ;
        if( ( this._enabled === true ) && ( this._launchedRaycaster === false ) )
        {
            this.launchRaycaster() ;
        }
    }},
    __removedFromStage : { value : function()
    {
        this._onStage = false ;
        if( this._launchedRaycaster === true )
        {
            this.stopRaycaster() ;
        }
    }},
    launchRaycaster : { value : function()
    {
        this._notifyClick = this.notifyClick.bind( this ) ;
        this._intersection        = this.intersection.bind( this ) ;
        this._intersectionCleared = this.intersectionCleared.bind( this ) ;
        this._mouseDown = this.notifyDown.bind( this ) ;
        this._mouseUp = this.notifyUp.bind( this ) ;
        this._timer.finishIt.connect( this._notifyClick );
        this.element.addEventListener( 'raycaster-intersection'         , this._intersection ) ;
        this.element.addEventListener( 'raycaster-intersection-cleared' , this._intersectionCleared ) ;
        this._launchedRaycaster = true ;
    }},
    stopRaycaster : { value : function()
    {
        this.element.removeEventListener('raycaster-intersection' , this._intersection ) ;
        this.element.removeEventListener('raycaster-intersection-cleared' , this._intersectionCleared ) ;
        this._timer.finishIt.disconnect();
        this._notifyClick = null ;
        this._intersection = null ;
        this._intersectionCleared = null ;
        this._mouseDown = null ;
        this._mouseUp = null ;
        this._launchedRaycaster = false ;
    }},
    intersection : { value : function( event )
    {
        let cursor = this.element;
        let index;
        let intersected;
        index = event.detail.els[0] === cursor ? 1 : 0 ;
        intersected = event.detail.els[ index ] ;
        if( !intersected )
        {
            return ;
        }
        if( intersected === this._target )
        {
            return ;
        }
        if( this._target )
        {
            this.notifyOut() ;
        }
        this._target = intersected ;
        this.notifyOver() ;
    }},
    intersectionCleared : { value : function( event )
    {
        let cursor = this.element;
        let intersected = event.detail.el;
        if( cursor === intersected )
        {
            return ;
        }
        if( intersected !== this._target )
        {
            return ;
        }
        this.notifyOut() ;
        this._target = null ;
    }}
}) ;

function Material( init = null , tag = 'a-entity' )
{
    AEntity.call( this , init , tag ) ;
}
Material.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Material , writable : true } ,
    color :
    {
        get : function() { return this.getAttribute( 'color' ) ; },
        set : function( value ) { this.setAttribute( 'color' , value ) ; }
    },
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },
    src :
    {
        get : function() { return this.getAttribute( 'src' ) ; } ,
        set : function( value ) { this.setAttribute( 'src' , value ) ; }
    }
}) ;

function Circle( init = null )
{
    Material.call( this , init , 'a-circle' ) ;
}
Circle.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Circle , writable : true } ,
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' ).radius ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    },
    thetaLength :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaLength ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaLength' , value ) ; }
    },
    thetaStart :
    {
        get : function() { return this.getAttribute( 'geometry' ).thetaStart ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'thetaStart' , value ) ; }
    }
}) ;

function CursorOver() {
    Object.defineProperties(this, {
        cursor: { writable: true, value: null },
        sound: { writable: true, value: null },
        tweenOver: { writable: true, value: null },
        tweenOut: { writable: true, value: null },
        _onFinish: { writable: true, value: null }
    });
    Receiver.call(this);
}
CursorOver.prototype = Object.create(Receiver.prototype, {
    constructor: { writable: true, value: CursorOver },
    receive: { value: function value(args) {
            try {
                if (!this.sound) throw new Error('sound');
                if (!this.tweenOver) throw new Error('tweenOver');
                if (!this.tweenOut) throw new Error('tweenOut');
            } catch (er) {
                logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
                return;
            }
            if (config.debug && config.verbose) {
                logger.debug(this + " receive : " + args);
            }
            if (this.tweenOut.running) {
                this.tweenOut.stop();
            }
            this.sound.play();
            this.tweenOver.run();
        } }
});

function CursorOut() {
    Object.defineProperties(this, {
        tweenOver: { writable: true, value: null },
        tweenOut: { writable: true, value: null }
    });
    Receiver.call(this);
}
CursorOut.prototype = Object.create(Receiver.prototype, {
    constructor: { writable: true, value: CursorOut },
    receive: { writable: true, value: function value(args) {
            try {
                if (!this.tweenOver) throw new Error('tweenOver');
                if (!this.tweenOut) throw new Error('tweenOut');
            } catch (er) {
                logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
                return;
            }
            if (config.debug && config.verbose) {
                logger.debug(this + " receive : " + args);
            }
            if (this.tweenOver.running) {
                this.tweenOver.stop();
            }
            this.tweenOut.run();
        } }
});

var linear = ( t , b , c , d ) => ( c * t / d ) + b;

function MotionNextFrame( motion )
{
    this.motion = motion instanceof Motion ? motion : null ;
}
MotionNextFrame.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : MotionNextFrame } ,
    receive : { value : function()
    {
        if( this.motion )
        {
            this.motion.setTime( (this.motion.useSeconds) ? ( ( performance$1.now() - this.motion._startTime ) / 1000 ) : ( this.motion._time + 1 ) ) ;
        }
    }}
}) ;

function Transition ( id = null )
{
    Task.call( this ) ;
    Object.defineProperties( this ,
    {
        _id : { value : id , writable : true }
    });
}
Transition.prototype = Object.create( Task.prototype ,
{
    constructor : { value : Transition , writable : true } ,
    id :
    {
        get : function() { return this._id ; } ,
        set : function( value ) { this._id = value ; } ,
    },
    clone : { writable : true , value : function()
    {
        return new Transition( this.id ) ;
    }},
    equals : { writable : true , value : function( o )
    {
        if ( o === this )
        {
            return true ;
        }
        else if ( o && (o instanceof Transition) )
        {
            return ( o.id === this.id) ;
        }
        else
        {
            return false ;
        }
    }},
    toString : { value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

function FrameTimer()
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        deltaTime : { value : 1 , writable : true },
        elapsedMS : { value : 1 / FPMS , writable : true } ,
        fps : { get : function()
        {
            return 1000 / this.elapsedMS;
        }},
        minFPS :
        {
            get : function()
            {
                return 1000 / this._maxElapsedMS ;
            },
            set : function(fps)
            {
                this._maxElapsedMS = 1 / Math.min(Math.max(0, fps) / 1000, FPMS);
            }
        },
        lastTime : { value : 0 , writable : true } ,
        speed : { value : 1 , writable : true } ,
        _requestID : { value : null , writable : true },
        _maxElapsedMS : { value : 100 , writable : true } ,
        _stopped : { value : false , writable : true }
    }) ;
}
FrameTimer.prototype = Object.create( Task.prototype ,
{
    constructor : { value : FrameTimer , writable : true } ,
    stopped : { get : function () { return this._stopped ; } },
    clone : { value : function()
    {
        return new FrameTimer() ;
    }} ,
    resume : { value : function()
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this.notifyResumed() ;
            this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
        }
    }},
    reset : { value : function()
    {
        this.stop() ;
        this._stopped = false ;
    }},
    run : { value : function ()
    {
        if( !this._running )
        {
            this._stopped = false ;
            this.lastTime = performance.now();
            this.notifyStarted() ;
            this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
        }
    }},
    stop : { value : function()
    {
        if ( this._running && !this._stopped )
        {
            this._running = false ;
            this._stopped = true ;
            cancelAnimationFrame( this._requestID ) ;
            this._requestID = null ;
            this.notifyStopped() ;
        }
    }},
    toString : { value : function ()
    {
        return '[FrameTimer]' ;
    }},
    _next : { value : function( time = performance.now() )
    {
        if( this._requestID !== null && (this._stopped || !this._running) )
        {
            cancelAnimationFrame( this._requestID ) ;
            this._requestID = null ;
            return ;
        }
        let elapsedMS;
        if ( time > this.lastTime )
        {
            elapsedMS = this.elapsedMS = time - this.lastTime ;
            if ( elapsedMS > this._maxElapsedMS )
            {
                elapsedMS = this._maxElapsedMS;
            }
            this.deltaTime = elapsedMS * FPMS * this.speed ;
            this.notifyProgress() ;
        }
        else
        {
            this.deltaTime = this.elapsedMS = 0;
        }
        this.lastTime = time ;
        this._requestID = requestAnimationFrame( this._next.bind(this) ) ;
    }}
});
var FPMS = 0.06;

function Motion( id = null )
{
    Transition.call( this , id ) ;
    Object.defineProperties( this ,
    {
        useSeconds : { writable : true , value : false },
        _duration : { writable : true , value : 0 },
        _fps : { writable : true , value : NaN } ,
        _nextFrame : { value : new MotionNextFrame(this) },
        _prevTime : { writable : true , value : NaN },
        _startTime : { writable : true , value : NaN },
        _stopped : { writable : true , value : false },
        _target : { writable : true , value : null },
        _time : { writable : true , value : NaN },
        _timer : { writable : true , value : null }
    });
    this.setTimer( new FrameTimer() ) ;
}
Motion.prototype = Object.create( Transition.prototype ,
{
    constructor : { value : Motion , writable : true } ,
    duration :
    {
        get : function()
        {
            return this._duration ;
        },
        set : function( value )
        {
            this._duration = (isNaN(value) || value <= 0 ) ? 0 : value ;
        }
    },
    fps :
    {
        get : function()
        {
            return this._fps ;
        },
        set : function( value )
        {
            if ( this._timer && this._timer._running )
            {
                this._timer.stop() ;
            }
            this._fps = value > 0 ? value : NaN ;
            if ( isNaN(this._fps) )
            {
                this.setTimer( new FrameTimer() ) ;
            }
            else
            {
                this.setTimer( new Timer( 1000 / this._fps ) ) ;
            }
        }
    },
    prevTime :
    {
        get : function()
        {
            return this._prevTime ;
        }
    },
    stopped :
    {
        get : function()
        {
            return this._stopped ;
        }
    },
    target :
    {
        get : function()
        {
            return this._target ;
        },
        set : function( value )
        {
            this._target = value ;
        }
    },
    clone : { writable : true , value : function()
    {
        return new Motion( this.id ) ;
    }},
    nextFrame : { value : function()
    {
        this.setTime( (this.useSeconds) ? ( ( performance$1.now() - this._startTime ) / 1000 ) : ( this._time + 1 ) ) ;
    }},
    prevFrame : { value : function()
    {
        if (!this.useSeconds)
        {
            this.setTime( this._time - 1 )  ;
        }
    }},
    resume : { writable : true , value : function()
    {
        if ( this._stopped && this._time !== this._duration )
        {
            this._stopped = false ;
            this.fixTime() ;
            this.startInterval() ;
            this.notifyResumed() ;
        }
        else
        {
            this.run() ;
        }
    }},
    rewind : { value : function( time = 0 )
    {
        this._time = time > 0 ? time : 0 ;
        this.fixTime() ;
        this.update() ;
    }} ,
    run : { writable : true , value : function()
    {
        this._stopped = false ;
        this.notifyStarted() ;
        this.rewind() ;
        this.startInterval() ;
    }},
    setTime : { value : function( time )
    {
        this._prevTime = this._time ;
        if (time > this._duration)
        {
            time = this._duration ;
            if ( this.looping )
            {
                this.rewind( time - this._duration );
                this.notifyLooped() ;
            }
            else
            {
                if ( this.useSeconds )
                {
                    this._time = this._duration ;
                    this.update() ;
                }
                this.stop() ;
                this.notifyFinished() ;
            }
        }
        else if ( time < 0 )
        {
            this.rewind() ;
        }
        else
        {
            this._time = time ;
            this.update() ;
        }
    }},
    startInterval : { value : function()
    {
        this._timer.start() ;
        this._running = true ;
    }},
    stop : { value : function()
    {
        if( this._running )
        {
            this.stopInterval() ;
            this._stopped = true ;
            this.notifyStopped() ;
        }
    }},
    stopInterval : { value : function()
    {
        this._timer.stop() ;
        this._running = false ;
    }},
    update : { writable : true , value : function()
    {
    }} ,
    fixTime : { value : function()
    {
        if ( this.useSeconds )
        {
            this._startTime = performance$1.now() - ( this._time * 1000 ) ;
        }
    }},
    setTimer : { value : function( value )
    {
        if ( this._timer )
        {
            if( this._timer instanceof Task )
            {
                if( this._timer._running )
                {
                    this._timer.stop();
                }
                this._timer.progressIt.disconnect( this._nextFrame ) ;
            }
            this._timer = null ;
        }
        this._timer = (value instanceof Task) ? value : new Timer() ;
        if( this._timer )
        {
            this._timer.progressIt.connect( this._nextFrame ) ;
        }
    }}
});

function TweenUnit( easing = null , duration = 0 , useSeconds = false , auto = false , id = null )
{
    Motion.call( this , id ) ;
    Object.defineProperties( this ,
    {
        position : { writable : true , value : 0 },
        _change: { writable : true , value : 1 } ,
        _easing : { writable : true , value : (easing instanceof Function) ? easing : linear }
    });
    this.duration   = duration ;
    this.useSeconds = useSeconds ;
    if ( auto )
    {
        this.run() ;
    }
}
TweenUnit.prototype = Object.create( Motion.prototype ,
{
    constructor : { value : TweenUnit , writable : true } ,
    easing :
    {
        get : function()
        {
            return this._easing ;
        },
        set : function( value )
        {
            this._easing = value instanceof Function ? value : linear ;
        }
    },
    clone : { writable : true , value : function()
    {
        return new TweenUnit( this.easing, this.duration, this.useSeconds ) ;
    }},
    set : { value : function( easing , duration = 0 , useSeconds = false )
    {
        this.duration   = duration   ;
        this.useSeconds = useSeconds ;
        this.easing     = easing     ;
    }},
    update : { writable : true , value : function()
    {
        if( this._easing )
        {
            this.position = this._easing( this._time, 0, this._change , this._duration ) ;
            this.notifyChanged() ;
        }
        else
        {
            this.position = null ;
        }
    }}
});

function Tween( init )
{
    TweenUnit.call( this ) ;
    this.position = null ;
    Object.defineProperties( this ,
    {
        _begin : { writable : true , value : null } ,
        _changed : { writable : true , value : false } ,
        _easings : { writable : true , value : null },
        _from : { writable : true , value : null } ,
        _target: { writable : true , value : null } ,
        _to : { writable : true , value : null }
    });
    if( init )
    {
        for( var prop in init )
        {
            if( prop in this )
            {
                this[prop] = init[prop];
            }
        }
        if ( 'auto' in init && init.auto === true )
        {
            this.run() ;
        }
    }
}
Tween.prototype = Object.create( TweenUnit.prototype ,
{
    constructor : { value : TweenUnit , writable : true } ,
    easings :
    {
        get : function()
        {
            return this._easings ;
        },
        set : function( value )
        {
            this._easings = value ;
        }
    },
    from :
    {
        get : function()
        {
            return this._from ;
        },
        set : function( value )
        {
            this._from = value ;
            this._changed = true ;
        }
    },
    target :
    {
        get : function()
        {
            return this._target ;
        },
        set : function( value )
        {
            this._target  = value ;
            this._changed = true ;
        }
    },
    to :
    {
        get : function()
        {
            return this._to ;
        },
        set : function( value )
        {
            this._to      = value ;
            this._changed = true ;
        }
    },
    clone : { writable : true , value : function()
    {
        return new Tween
        ({
            duration   : this.duration,
            easing     : this.easing,
            easings    : this.easings,
            from       : this.from,
            target     : this.target,
            to         : this.to,
            useSeconds : this.useSeconds
        }) ;
    }},
    notifyFinished : { value : function()
    {
        this._changed = true ;
        this._running = false ;
        this._phase = TaskPhase.FINISHED ;
        this.finishIt.emit( this ) ;
        this._phase = TaskPhase.INACTIVE ;
    }},
    run : { writable : true , value : function( to = null )
    {
        if ( to )
        {
            this.to = to ;
        }
        this._changed  = true ;
        this._stopped  = false ;
        this.position  = null ;
        this.notifyStarted() ;
        this.rewind() ;
        this.startInterval() ;
    }},
    update : { writable : true , value : function()
    {
        if ( this._changed )
        {
            this._changed = false ;
            if ( !this._target )
            {
                throw new Error( this + " update failed, the 'target' property not must be null.") ;
            }
            if( !this._to )
            {
                throw new Error( this + " update failed, the 'to' property not must be null.") ;
            }
            if ( this._from )
            {
                this._begin = this._from ;
            }
            else
            {
                this._begin = {} ;
                for( let prop in this._to )
                {
                    if( prop in this._target )
                    {
                        this._begin[prop] = this._target[prop] ;
                    }
                }
            }
        }
        this.position = {} ;
        for ( let prop in this._to )
        {
            if( prop in this._target )
            {
                let e = (this._easings && (prop in this._easings) && this.easings[prop] instanceof Function) ? this.easings[prop] : this._easing;
                this._target[prop] = this.position[prop] = e( this._time, this._begin[prop] , this._to[prop] - this._begin[prop] , this._duration ) ;
            }
        }
        this.notifyChanged() ;
    }}
});

var cursor$1 = [{
    id: "cursor",
    type: Cursor,
    singleton: true,
    lazyInit: true,
    generates: ["cursor_over_receiver", "cursor_out_receiver"],
    properties: [{ name: "#init", config: "cursor" },
    { name: "addChild", args: [{ ref: "cursor_circle" }] }, { name: "addChild", args: [{ ref: "cursor_ring" }] }]
}, {
    id: "cursor_circle",
    type: Circle,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "cursor_circle" }]
}, {
    id: "cursor_ring",
    type: Circle,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "cursor_ring" }]
},
{
    id: "cursor_over_receiver",
    type: CursorOver,
    properties: [{ name: "cursor", ref: "cursor" }, { name: "sound", ref: "over_sound" }, { name: "tweenOver", ref: "cursor_over_tween" }, { name: "tweenOut", ref: "cursor_out_tween" }],
    receivers: [{ signal: "cursor.over" }]
}, {
    id: "cursor_out_receiver",
    type: CursorOut,
    properties: [{ name: "tweenOver", ref: "cursor_over_tween" }, { name: "tweenOut", ref: "cursor_out_tween" }],
    receivers: [{ signal: "cursor.out" }]
},
{
    id: "cursor_over_tween",
    type: Tween,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "cursor_over_tween" }, { name: "target", ref: "cursor_circle" }, { name: "duration", ref: "cursor.duration" }, { name: "useSeconds", ref: "cursor.useSeconds" }]
}, {
    id: "cursor_out_tween",
    type: Tween,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "cursor_out_tween" }, { name: "target", ref: "cursor_circle" }]
}];

function Div ()
{
    Node$1.call( this , null , 'div' ) ;
}
Div.prototype = Object.create( Node$1.prototype ,
{
    constructor : { value : Div , writable : true }
}) ;

var loader$1 = [{
    id: "loader",
    type: Div,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "loader" }]
}];

function Scene( init = null )
{
    AEntity.call( this , init , 'a-scene' ) ;
}
Scene.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Scene , writable : true },
    antialias :
    {
        get : function() { return this._element ? (this._element.getAttribute('antialias') === "true") : false ; },
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'antialias' , value === true ? 'true' : 'false' ) ;
            }
        }
    },
    embedded :
    {
        get : function() { return this._element ? (this._element.getAttribute('embedded') === "") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'embedded' , value === true ? '' : null ) ;
            }
        }
    },
    fog :
    {
        get : function() { return this._element ? (this._element.getAttribute('fog') === "") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'fog' , value === true ? '' : null ) ;
            }
        }
    },
    isMobile : { get : function() { return this._element ? this._element.isMobile : false ; } },
    vrModeUI :
    {
        get : function() { return this._element ? (this._element.getAttribute('vr-mode-ui', 'enabled') === "true") : false ; } ,
        set : function( value )
        {
            if( this._element )
            {
                this._element.setAttribute( 'vr-mode-ui' , 'enabled' , (value === true) ? 'true' : 'false' ) ;
            }
        }
    },
    enterVR : { value : function()
    {
        if( this._element )
        {
            this._element.enterVR() ;
        }
    }},
    exitVR : { value : function()
    {
        if( this._element )
        {
            this._element.exitVR() ;
        }
    }},
    reload : { value : function()
    {
        if( this._element )
        {
            this._element.reload() ;
        }
    }}
});

var scene$1 = [{
    id: "scene",
    type: Scene,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "scene" }, { name: "addChild", args: [{ ref: "camera" }] }, { name: "addChild", args: [{ ref: "sky" }] }]
}];

function Stage$1( init = null , tag = null )
{
    Node$1.call( this , init , tag ) ;
    Object.defineProperties( this ,
    {
        activated : { value : new Signal() },
        desactivated : { value : new Signal() },
        fullScreen : { value : new Signal() },
        orientationChange : { value : new Signal() },
        resize : { value : new Signal() },
        _allowFullScreen : { writable : true  , value : false } ,
        _aspectRatio : { writable : true  , value : StageAspectRatio.ANY } ,
        _displayState : { writable : true  , value : StageDisplayState.NORMAL } ,
        _fullScreenChange : { writable : true  , value : null } ,
        _fullScreenElement : { writable : true  , value : null } ,
        _fullScreenExit : { writable : true  , value : null } ,
        _fullScreenHeight : { writable : true  , value : null } ,
        _fullScreenInteractive : { writable : true  , value : false } ,
        _fullScreenRequest : { writable : true  , value : null } ,
        _fullScreenWidth : { writable : true  , value : null } ,
        _height : { writable : true  , value : null } ,
        __isStage : { value : true } ,
        _launchedFromHomeScreen : { writable : true  , value : false } ,
        _orientation : { writable : true  , value : StageOrientation.UNKNOWN } ,
        _pixelRatio : { writable : true  , value : 1 } ,
        _supportedOrientations : { writable : true  , value : null } ,
        _supportsOrientationChange : { writable : true  , value : false } ,
        _width : { writable : true  , value : null }
    }) ;
    this.__initialize__() ;
}
Stage$1.prototype = Object.create( Node$1.prototype ,
{
    constructor : { value : Stage$1 , writable : true },
    allowFullScreen : { get : function() { return this._allowFullScreen ; } } ,
    allowFullScreenInteractive : { get : function() { return this._fullScreenInteractive ; } } ,
    aspectRatio : { get : function() { return this._aspectRatio ; } } ,
    displayState :
    {
        get : function() { return this._displayState ; },
        set : function( state )
        {
            if( this._displayState !== state )
            {
                this._displayState = state ;
                switch( this._displayState )
                {
                    case StageDisplayState.FULL_SCREEN :
                    {
                        document.documentElement[ this._fullScreenRequest ]();
                        break ;
                    }
                    case StageDisplayState.FULL_SCREEN_INTERACTIVE :
                    {
                        document.documentElement[ this._fullScreenRequest ]( Element.ALLOW_KEYBOARD_INPUT );
                        break ;
                    }
                    case StageDisplayState.NORMAL :
                    default :
                    {
                        document[ this._fullScreenExit ]();
                        break ;
                    }
                }
            }
        }
    } ,
    fullScreenHeight : { get : function() { return this._fullScreenHeight ; } } ,
    fullScreenWidth : { get : function() { return this._fullScreenWidth ; } } ,
    height : { get : function() { return this._height ; } } ,
    launchedFromHomeScreen : { get : function() { return this._launchedFromHomeScreen ; } } ,
    orientation : { get : function() { return this._orientation ; } } ,
    pixelRatio : { get : function() { return this._pixelRatio ; } } ,
    width : { get : function() { return this._width ; } } ,
    dispose : { value : function()
    {
        if( this._notifyFullScreen instanceof Function )
        {
            window.removeEventListener( this._fullScreenChange , this._notifyFullScreen , false );
            this._notifyFullScreen = null ;
        }
        if( this._notifyOrientationChange instanceof Function )
        {
            window.removeEventListener( "orientationchange" , this._notifyOrientationChange , false );
            this._notifyOrientationChange = null ;
        }
    }},
    getDeviceOrientation : { writable : true , value : function()
    {
        if( window.screen.orientation && window.screen.orientation.type )
        {
            switch ( window.screen.orientation.type )
            {
                case 'portrait-secondary' :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
                case 'landscape-primary' :
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'landscape-secondary' :
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break;
                }
                case 'portrait-primary' :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break;
                }
            }
        }
        else if( window.orientation !== undefined )
        {
            switch ( window.orientation )
            {
                case 180 :
                {
                    this._orientation = StageOrientation.UPSIDE_DOWN;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                    break ;
                }
                case 90:
                {
                    this._orientation = StageOrientation.ROTATED_LEFT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case -90:
                {
                    this._orientation = StageOrientation.ROTATED_RIGHT;
                    this._aspectRatio = StageAspectRatio.LANDSCAPE;
                    break ;
                }
                case 0  :
                default :
                {
                    this._orientation = StageOrientation.DEFAULT;
                    this._aspectRatio = StageAspectRatio.PORTRAIT;
                }
            }
        }
    }},
    getViewportSize : { writable : true , value : function()
    {
        this._width  = Math.min( document.documentElement.clientWidth  , window.innerWidth  || 0 );
        this._height = Math.min( document.documentElement.clientHeight , window.innerHeight || 0 );
        return { width : this._width , height : this._height } ;
    }},
    notifyActivated : { writable : true , value : function()
    {
        if( this.activated.connected() )
        {
            this.activated.emit( this ) ;
        }
    }},
    notifyDesactivated : { writable : true , value : function()
    {
        if( this.desactivated.connected() )
        {
            this.desactivated.emit( this ) ;
        }
    }},
    notifyFullScreen : { writable : true , value : function()
    {
        if( document[ this._fullScreenElement ] === null  )
        {
            this.displayState = StageDisplayState.NORMAL ;
        }
        if( this.fullScreen.connected() )
        {
            this.fullScreen.emit( this._displayState , this ) ;
        }
    }},
    notifyOrientationChange : { writable : true , value : function()
    {
        this.getDeviceOrientation();
        if( this.orientationChange.connected() )
        {
            this.orientationChange.emit( this._orientation , this ) ;
        }
    }},
    notifyResized : { writable : true , value : function()
    {
        this.getViewportSize();
        if( this.resize.connected() )
        {
            this.resize.emit( this ) ;
        }
    }},
    toString : { writable : true , value : function ()
    {
        return '[Stage]' ;
    }},
    __initialize__ : { writable : true , value : function()
    {
        if( navigator.standalone === true || window.matchMedia('(display-mode: fullscreen)').matches || window.matchMedia('(display-mode: standalone)').matches )
        {
            this._launchedFromHomeScreen = true;
        }
        this._pixelRatio = window.devicePixelRatio || 1;
        this.getViewportSize();
        this._fullScreenWidth  = window.screen.width;
        this._fullScreenHeight = window.screen.height;
        if( window.orientation !== undefined || window.screen.orientation !== undefined )
        {
            this._supportsOrientationChange = true;
            this.getDeviceOrientation();
        }
        else
        {
            this._supportsOrientationChange = false;
        }
        let fullscreen =
        [
            'requestFullscreen',
            'requestFullScreen',
            'webkitRequestFullscreen',
            'webkitRequestFullScreen',
            'msRequestFullscreen',
            'msRequestFullScreen',
            'mozRequestFullScreen',
            'mozRequestFullscreen'
        ];
        let cancel =
        [
            'cancelFullScreen',
            'exitFullscreen',
            'webkitCancelFullScreen',
            'webkitExitFullscreen',
            'msCancelFullScreen',
            'msExitFullscreen',
            'mozCancelFullScreen',
            'mozExitFullscreen'
        ];
        let change =
        [
            'fullscreenchange',
            'fullscreenchange',
            'webkitfullscreenchange',
            'webkitfullscreenchange',
            'msfullscreenchange',
            'msfullscreenchange',
            'mozfullscreenchange',
            'mozfullscreenchange',
        ];
        let element =
        [
            'fullscreenElement',
            'fullscreenElement',
            'webkitFullscreenElement',
            'webkitFullscreenElement',
            'msFullScreenElement',
            'msFullscreenElement',
            'mozFullScreenElement',
            'mozFullscreenElement',
        ];
        let len = fullscreen.length;
        for( let i = 0 ; i < len ; i++ )
        {
            if( document.documentElement[fullscreen[i]] && document[cancel[i]] )
            {
                this._allowFullScreen   = true ;
                this._fullScreenRequest = fullscreen[i];
                this._fullScreenExit    = cancel[i];
                this._fullScreenChange  = change[i];
                this._fullScreenElement = element[i];
                break;
            }
        }
        if( window.Element && Element.ALLOW_KEYBOARD_INPUT )
        {
            this._fullScreenInteractive = true;
        }
        if( this._allowFullScreen === true )
        {
            this._notifyFullScreen = this.notifyFullScreen.bind( this ) ;
            window.addEventListener( this._fullScreenChange , this._notifyFullScreen , false );
        }
        if( this._supportsOrientationChange === true )
        {
            this._notifyOrientationChange = this.notifyOrientationChange.bind( this ) ;
            window.addEventListener( "orientationchange" , this._notifyOrientationChange , false ) ;
        }
        window.addEventListener( "resize" , this.notifyResized.bind( this ) , false );
        window.addEventListener( "focus" , this.notifyActivated.bind( this )    , false );
        window.addEventListener( "blur"  , this.notifyDesactivated.bind( this ) , false );
    }}
}) ;

function Body( init = null )
{
    Stage$1.call( this , init , document.body || document.createElement('body') ) ;
}
Body.prototype = Object.create( Stage$1.prototype ,
{
    constructor : { value : Body , writable : true } ,
    toString : { writable : true , value : function ()
    {
        return '[Body]' ;
    }}
}) ;

var stage = [{
    id: "stage",
    type: Body,
    singleton: true,
    lazyInit: true
}];

function Sky( init = null )
{
    Material.call( this , init , 'a-sky' ) ;
}
Sky.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Sky , writable : true } ,
    radius :
    {
        get : function() { return this.getAttribute( 'geometry' , 'radius' ) ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'radius' , value ) ; }
    }
}) ;

var sky$1 = [{
    id: "sky",
    type: Sky,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "sky" }]
}];

var display = [].concat(assets$1, camera$1, container, cursor$1, loader$1, scene$1, sky$1, stage);

function ActionEntry( action , priority = 0 , auto = false )
{
    Object.defineProperties( this ,
    {
        action : { writable : true , value : action } ,
        auto : { writable : true , value : auto === true } ,
        priority : { writable : true , value : (priority > 0) ? Math.ceil( priority ) : 0 }
    });
}
ActionEntry.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ActionEntry } ,
    toString : { value : function()
    {
        return "[ActionEntry action:" + this.action + " priority:" + this.priority + " auto:" + this.auto + "]" ;
    }}
});

function TaskGroup( mode = 'normal' , actions = null )
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        verbose : { value : false , writable : true },
        _actions : { value : [] , writable : true },
        _next : { value : null , writable : true , configurable : true },
        _stopped : { value : false , writable : true } ,
        _mode : { value : TaskGroup.NORMAL , writable : true }
    }) ;
    if( typeof(mode) === "string" || ( mode instanceof String ) )
    {
        this.mode = mode ;
    }
    if ( actions && ( actions instanceof Array ) && ( actions.length > 0 ) )
    {
        actions.forEach( ( action ) =>
        {
            if( action instanceof Action )
            {
                this.add( action ) ;
            }
        });
    }
}
Object.defineProperties( TaskGroup ,
{
    EVERLASTING : { value : 'everlasting' , enumerable : true } ,
    NORMAL : { value : 'normal' , enumerable : true } ,
    TRANSIENT : { value : 'transient' , enumerable : true } ,
}) ;
TaskGroup.prototype = Object.create( Task.prototype ,
{
    constructor : { writable : true , value : TaskGroup },
    length :
    {
        get : function() { return this._actions.length ; },
        set : function( value )
        {
            if ( this._running )
            {
                throw new Error( this + " length property can't be changed, the batch process is in progress." ) ;
            }
            this.dispose() ;
            var old           = this._actions.length;
            this._actions.length = value ;
            var l  = this._actions.length;
            if ( l > 0 )
            {
                while( --l > -1 )
                {
                    let entry = this._actions[l];
                    if ( entry && entry.action && this._next )
                    {
                        entry.action.finishIt.connect( this._next ) ;
                    }
                }
            }
            else if ( old > 0 )
            {
                this.notifyCleared() ;
            }
        }
    },
    mode :
    {
        get : function() { return this._mode ; },
        set : function( value )
        {
            this._mode = ( value === TaskGroup.TRANSIENT || value === TaskGroup.EVERLASTING ) ? value : TaskGroup.NORMAL ;
        }
    },
    stopped : { get : function() { return this._stopped ; } },
    add : { value : function( action , priority = 0 , autoRemove = false )
    {
        if ( this._running )
        {
            throw new Error( this + " add failed, the process is in progress." ) ;
        }
        if ( action && ( action instanceof Action ) )
        {
            autoRemove = autoRemove === true ;
            priority = ( priority > 0 ) ? Math.round(priority) : 0 ;
            if( this._next )
            {
                action.finishIt.connect( this._next ) ;
            }
            this._actions.push( new ActionEntry( action , priority , autoRemove ) ) ;
            let i;
            let j;
            let a = this._actions;
            let swap = ( j , k ) =>
            {
                var temp = a[j];
                a[j]     = a[k] ;
                a[k]     = temp ;
                return true ;
            };
            let swapped = false;
            let l = a.length;
            for( i = 1 ; i < l ; i++ )
            {
                for( j = 0 ; j < ( l - i ) ; j++ )
                {
                    if ( a[j+1].priority > a[j].priority )
                    {
                        swapped = swap(j, j+1) ;
                    }
                }
                if ( !swapped )
                {
                    break;
                }
            }
            return true ;
        }
        return false ;
    }},
    clone : { writable : true , value : function()
    {
        return new TaskGroup( this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }},
    contains : { writable : true , value : function( action )
    {
        if ( action && action instanceof Action )
        {
            if ( this._actions.length > 0 )
            {
                var e;
                var l  = this._actions.length;
                while( --l > -1 )
                {
                    e = this._actions[l] ;
                    if ( e && e.action === action )
                    {
                        return true ;
                    }
                }
            }
        }
        return false ;
    }},
    dispose : { writable : true , value : function()
    {
        if ( this._actions.length > 0 )
        {
            this._actions.forEach( ( entry ) =>
            {
                if ( entry instanceof ActionEntry )
                {
                    entry.action.finishIt.disconnect( this._next ) ;
                }
            });
        }
    }},
    get : { writable : true , value : function( index )
    {
        if ( this._actions.length > 0 && index < this._actions.length )
        {
            var entry = this._actions[index];
            if ( entry )
            {
                return entry.action ;
            }
        }
        return null ;
    }},
    isEmpty : { writable : true , value : function()
    {
        return this._actions.length === 0 ;
    }},
    next : { writable : true , value : function( action            )
    {
    }},
    remove : { writable : true , value : function( action )
    {
        if ( this._running )
        {
            throw new Error( this + " remove failed, the process is in progress." ) ;
        }
        this.stop() ;
        if ( this._actions.length > 0 )
        {
            if ( action && action instanceof Action )
            {
                let e;
                let l = this._actions.length;
                this._actions.forEach( ( element ) =>
                {
                    if ( element && (element instanceof ActionEntry) && element.action === action )
                    {
                        if ( this._next )
                        {
                            e.action.finishIt.disconnect( this._next ) ;
                        }
                        this._actions.splice( l , 1 ) ;
                        return true ;
                    }
                });
            }
            else
            {
                this.dispose() ;
                this._actions.length = 0 ;
                this.notifyCleared() ;
                return true ;
            }
        }
        return false ;
    }},
    toArray : { writable : true , value : function()
    {
        if ( this._actions.length > 0 )
        {
            var output  = [];
            if( this._actions.length > 0 )
            {
                this._actions.forEach( ( element ) =>
                {
                    if ( element && element instanceof ActionEntry && element.action )
                    {
                        output.push( element.action ) ;
                    }
                });
            }
            return output ;
        }
        else
        {
            return [] ;
        }
    }},
    toString : { writable : true , value : function()
    {
        let s  = "[" + this.constructor.name;
        if ( this.verbose === true )
        {
            if ( this._actions.length > 0 )
            {
                s += "[" ;
                let i;
                let e;
                let l  = this._actions.length;
                let r  = [];
                for( i = 0 ; i < l ; i++ )
                {
                    e = this._actions[i] ;
                    r.push( ( e && e.action ) ? e.action : null ) ;
                }
                s += r.toString() ;
                s += "]" ;
            }
        }
        s += "]" ;
        return s ;
    }}
});

function ChainNext( chain = null )
{
    this.chain = chain ;
}
ChainNext.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ChainNext } ,
    receive : { value : function()
    {
        if( this.chain === null )
        {
            return ;
        }
        var chain = this.chain;
        var mode  = chain._mode;
        if ( chain._current )
        {
            if ( mode !== TaskGroup.EVERLASTING )
            {
                if ( mode === TaskGroup.TRANSIENT || ( mode === TaskGroup.NORMAL && chain._current.auto ) )
                {
                    chain._current.action.finishIt.disconnect( this ) ;
                    chain._position-- ;
                    chain._actions.splice( this._position , 1 ) ;
                }
            }
            chain.notifyChanged() ;
            chain._current = null ;
        }
        if ( chain._actions.length > 0 )
        {
            if ( chain.hasNext() )
            {
                chain._current = chain._actions[ chain._position++ ] ;
                chain.notifyProgress() ;
                if ( chain._current && chain._current.action )
                {
                    chain._current.action.run() ;
                }
                else
                {
                    this.receive() ;
                }
            }
            else if ( this.looping )
            {
                chain._position = 0 ;
                if( chain.numLoop === 0 )
                {
                    chain.notifyLooped() ;
                    chain._currentLoop = 0  ;
                    this.receive() ;
                }
                else if ( chain._currentLoop < chain.numLoop )
                {
                    chain._currentLoop ++ ;
                    chain.notifyLooped() ;
                    this.receive() ;
                }
                else
                {
                    chain._currentLoop = 0 ;
                    chain.notifyFinished() ;
                }
            }
            else
            {
                chain._currentLoop = 0 ;
                chain._position    = 0 ;
                chain.notifyFinished() ;
            }
        }
        else
        {
            chain.notifyFinished() ;
        }
    }}
}) ;

function Chain( looping = false , numLoop = 0 , mode = 'normal' , actions = null )
{
    TaskGroup.call( this , mode , actions ) ;
    Object.defineProperties( this ,
    {
        looping : { value : Boolean( looping ) , writable : true } ,
        numLoop :
        {
            value    : ( numLoop > 0 ) ? Math.round( numLoop ) : 0 ,
            writable : true
        },
        _current     : { value : null , writable : true } ,
        _currentLoop : { value : 0    , writable : true } ,
        _position    : { value : 0    , writable : true } ,
        _next        : { value : new ChainNext(this)    }
    }) ;
}
Chain.prototype = Object.create( TaskGroup.prototype ,
{
    constructor : { writable : true , value : Chain },
    current : { get : function() { return this._current ? this._current.action : null ; } } ,
    currentLoop : { get : function() { return this._currentLoop ; } } ,
    position : { get: function() { return this._position ; } },
    clone : { writable : true , value : function()
    {
        return new Chain( this.looping , this.numLoop , this._mode , ( this._actions.length > 0 ? this._actions : null ) ) ;
    }},
    element : { writable : true , value : function()
    {
        return this.hasNext() ? ( this._actions[ this._position ] ).action : null ;
    }},
    hasNext : { writable : true , value : function()
    {
        return this._position < this._actions.length ;
    }},
    resume : { writable : true , value : function()
    {
        if ( this._stopped )
        {
            this._running = true ;
            this._stopped = false ;
            this.notifyResumed() ;
            if ( this._current && this._current.action )
            {
                if ( "resume" in this._current.action )
                {
                    this._current.action.resume() ;
                }
            }
            else
            {
                this._next.receive() ;
            }
        }
        else
        {
            this.run() ;
        }
    }},
    run : { writable : true , value : function()
    {
        if ( !this._running )
        {
            this.notifyStarted() ;
            this._current     = null  ;
            this._stopped     = false ;
            this._position    = 0 ;
            this._currentLoop = 0 ;
            this._next.receive() ;
        }
    }},
    stop : { writable : true , value : function()
    {
        if ( this._running )
        {
            if ( this._current && this._current.action )
            {
                if ( 'stop' in this._current.action && this._current.action instanceof Function )
                {
                    this._current.action.stop() ;
                    this._running = false ;
                    this._stopped = true ;
                    this.notifyStopped() ;
                }
            }
        }
    }}
}) ;

function BuildApplication() {
    Task.call(this);
    Object.defineProperties(this, {
        factory: { writable: true, value: null }
    });
}
BuildApplication.prototype = Object.create(Task.prototype, {
    constructor: { value: BuildApplication, writable: true },
    run: { value: function value() {
            this.notifyStarted();
            try {
                if (!this.factory) throw new Error('factory');
            } catch (er) {
                logger.warning(fastformat("[BuildApplication] run failed, the {0} reference not must be null.", er.message));
                this.notifyFinished();
                return;
            }
            logger.debug(this + " run");
            var stage = this.factory.getObject('stage');
            var scene = this.factory.getObject('scene');
            stage.addChild(scene);
            this.notifyFinished();
        } }
});

function InitApplication() {
    Task.call(this);
    Object.defineProperties(this, {
        camera: { writable: true, value: null },
        cursor: { writable: true, value: null },
        states: { writable: true, value: null }
    });
}
InitApplication.prototype = Object.create(Task.prototype, {
    constructor: { value: InitApplication },
    run: { value: function value() {
            this.notifyStarted();
            try {
                if (!this.camera) throw new Error('camera');
                if (!this.cursor) throw new Error('cursor');
                if (!this.states) throw new Error('states');
            } catch (er) {
                logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
                this.notifyFinished();
                return;
            }
            logger.debug(this + " run");
            this.camera.addChild(this.cursor);
            logger.debug(this + " states length : " + this.states.length);
            this.states.current = this.states.get(config.first);
            this.notifyFinished();
        } }
});

var PreloadApplication = function PreloadApplication() {
  Task.call(this);
  Object.defineProperties(this, {
    assets: { writable: true, value: null },
    scene: { writable: true, value: null },
    stage: { writable: true, value: null },
    _finished: { writable: true, value: null }
  });
};
PreloadApplication.prototype = Object.create(Task.prototype, {
  constructor: { value: PreloadApplication },
  run: { value: function value() {
      this.notifyStarted();
      try {
        if (!this.assets) throw new Error('assets');
        if (!this.scene) throw new Error('scene');
        if (!this.stage) throw new Error('stage');
      } catch (er) {
        logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
        this.notifyFinished();
        return;
      }
      logger.debug(this + " run");
      this._finished = this.finished.bind(this);
      this.assets.element.addEventListener('loaded', this._finished);
      this.scene.addChild(this.assets);
    } },
  finished: { value: function value() {
      this.stage.element.classList.add("loaded");
      this.assets.element.removeEventListener('loaded', this._finished);
      this._finished = null;
      this.notifyFinished();
    } }
});

var run = [{
    id: "run",
    type: Chain,
    init: "run",
    properties: [{ name: "mode", value: TaskGroup.TRANSIENT }, { name: "add", args: [{ ref: "body_states_init" }] }, { name: "add", args: [{ ref: "build_application" }] },
    { name: "add", args: [{ ref: "init_application" }] }]
}, {
    id: "build_application",
    type: BuildApplication,
    properties: [{ name: "factory", ref: "#this" }]
}, {
    id: "init_application",
    type: InitApplication,
    properties: [{ name: "camera", ref: "camera" }, { name: "cursor", ref: "cursor" }, { name: "states", ref: "body_states_model" }]
}, {
    id: "preload_application",
    type: PreloadApplication,
    properties: [{ name: "assets", ref: "assets" }, { name: "scene", ref: "scene" }, { name: "stage", ref: "stage" }]
}];

var states = [{
    id: 'states_chain',
    type: Chain,
    singleton: true,
    lazyInit: true,
    properties: [{ name: 'mode', value: TaskGroup.TRANSIEN }]
}];

var tasks = [].concat(run, states);

var controllers = [].concat();

function AddState() {}
AddState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : AddState } ,
    receive : { value : function ( state )
    {
        logger$1.debug( this + " receive : " + state ) ;
    }}
});

function invoke( c , a = null )
{
    if( !(c instanceof Function) )
    {
        return null ;
    }
    if( a === null || !(a instanceof Array) || (a.length === 0)  )
    {
        return new c();
    }
    switch( a.length )
    {
        case 0:
        return new c();
        case 1:
        return new c( a[0] );
        case 2:
        return new c( a[0],a[1] );
        case 3:
        return new c( a[0],a[1],a[2] );
        case 4:
        return new c( a[0],a[1],a[2],a[3] );
        case 5:
        return new c( a[0],a[1],a[2],a[3],a[4] );
        case 6:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5] );
        case 7:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6] );
        case 8:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7] );
        case 9:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8] );
        case 10:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9] );
        case 11:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10] );
        case 12:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11] );
        case 13:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12] );
        case 14:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13] );
        case 15:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14] );
        case 16:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15] );
        case 17:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16] );
        case 18:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17] );
        case 19:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18] );
        case 20:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19] );
        case 21:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20] );
        case 22:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21] );
        case 23:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22] );
        case 24:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23] );
        case 25:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24] );
        case 26:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25] );
        case 27:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26] );
        case 28:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27] );
        case 29:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28] );
        case 30:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29] );
        case 31:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30] );
        case 32:
        return new c( a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15],a[16],
                      a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],a[29],a[30],a[31] );
        default:
        return null;
    }
}

function Evaluable() {}
Evaluable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Evaluable } ,
    eval : { writable : true , value : function( value ) {} } ,
    toString : { writable : true , value : function() { return '[' + this.constructor.name + ']' ; } }
});

function MultiEvaluator( elements = null )
{
    Object.defineProperties( this ,
    {
        autoClear : { value : false , writable : true } ,
        _evaluators : { value : [] , writable : true }
    }) ;
    if ( elements instanceof Array && elements.length > 0 )
    {
        this.add.apply( this, elements ) ;
    }
}
MultiEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    length :
    {
        get : function()
        {
            return this._evaluators.length ;
        }
    },
    add : { value : function ( ...evaluators )
    {
        if ( this.autoClear )
        {
            this.clear() ;
        }
        var l = evaluators.length;
        if ( l > 0 )
        {
            var c, i, j;
            var e;
            for ( i = 0 ; i < l ; i++ )
            {
                e = evaluators[i] ;
                if ( e instanceof Evaluable )
                {
                    this._evaluators.push( e ) ;
                }
                else if ( e instanceof Array )
                {
                    c = e.length ;
                    for ( j = 0 ; j < c ; j++ )
                    {
                        if ( e[j] instanceof Evaluable )
                        {
                            this._evaluators.push( e[j] ) ;
                        }
                    }
                }
            }
        }
    }},
    clear : { value : function()
    {
        this._evaluators = [] ;
    }},
    eval : { value : function( value )
    {
        this._evaluators.forEach( ( element ) =>
        {
            if( element instanceof Evaluable )
            {
                value = element.eval( value ) ;
            }
        }) ;
        return value ;
    }},
    remove : { value : function( evaluator )
    {
        if( evaluator instanceof Evaluable )
        {
            var index = this._evaluators.indexOf( evaluator );
            if( index > - 1 )
            {
                this._evaluators.splice( index , 1 ) ;
                return true ;
            }
        }
        return false ;
    }}
});
MultiEvaluator.prototype.constructor = MultiEvaluator ;
MultiEvaluator.prototype.toString = function ()
{
    return "[MultiEvaluator]" ;
};

function isLockable( target )
{
    if( target )
    {
        if( target instanceof Lockable )
        {
            return true ;
        }
        else
        {
            return Boolean( target['isLocked'] ) && ( target.isLocked instanceof Function ) &&
                   Boolean( target['lock'] )     && ( target.lock     instanceof Function ) &&
                   Boolean( target['unlock'] )   && ( target.unlock   instanceof Function ) ;
        }
    }
    return false ;
}
function Lockable()
{
    Object.defineProperties( this ,
    {
        __lock__ : { writable : true  , value : false }
    }) ;
}
Lockable.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : Lockable } ,
    isLocked : { writable : true , value : function()
    {
        return this.__lock__ ;
    }},
    lock : { writable : true , value : function()
    {
        this.__lock__ = true ;
    }},
    unlock : { writable : true , value : function()
    {
        this.__lock__ = false ;
    }},
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }}
});

var ObjectAttribute = Object.defineProperties( {} ,
{
    ARGUMENTS : { value : 'args' , enumerable : true },
    CALLBACK : { value : 'callback' , enumerable : true },
    CONFIG : { value : 'config' , enumerable : true },
    DEPENDS_ON : { value : 'dependsOn' , enumerable : true },
    DESTROY_METHOD_NAME : { value : 'destroy' , enumerable : true },
    EVALUATORS : { value : 'evaluators' , enumerable : true },
    FACTORY : { value : 'factory' , enumerable : true },
    GENERATES : { value : 'generates' , enumerable : true },
    ID : { value : 'id' , enumerable : true },
    IDENTIFY : { value : 'identify' , enumerable : true },
    INIT_METHOD_NAME : { value : 'init' , enumerable : true },
    LAZY_INIT : { value : 'lazyInit' , enumerable : true },
    LAZY_TYPE : { value : 'lazyType' , enumerable : true },
    LISTENERS : { value : 'listeners' , enumerable : true },
    LOCALE : { value : 'locale' , enumerable : true },
    LOCK : { value : 'lock' , enumerable : true },
    NAME : { value : 'name' , enumerable : true },
    PROPERTIES : { value : 'properties' , enumerable : true },
    RECEIVERS : { value : 'receivers' , enumerable : true },
    REFERENCE : { value : 'ref' , enumerable : true },
    SCOPE : { value : 'scope' , enumerable : true },
    SINGLETON : { value : 'singleton' , enumerable : true },
    TYPE : { value : 'type' , enumerable : true },
    VALUE : { value : 'value' , enumerable : true }
});

function ObjectArgument( value , policy = "value" , evaluators = null )
{
    Object.defineProperties( this ,
    {
        args : { value : null, writable : true } ,
        evaluators : { value : evaluators instanceof Array ? evaluators : null, writable : true } ,
        scope : { value : null, writable : true } ,
        value : { value : value , writable : true } ,
        _policy : { value : null , writable : true }
    });
    this.policy = policy ;
}
ObjectArgument.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectArgument } ,
    policy :
    {
        get : function policy()
        {
            return this._policy ;
        },
        set : function( str )
        {
            switch (str)
            {
                case ObjectAttribute.CALLBACK  :
                case ObjectAttribute.REFERENCE :
                case ObjectAttribute.CONFIG    :
                case ObjectAttribute.LOCALE    :
                {
                    this._policy = str ;
                    break ;
                }
                default :
                {
                    this._policy = ObjectAttribute.VALUE ;
                }
            }
        }
    },
    toString : { value : function () { return '[ObjectArgument]' ; }}
});

function createArguments( a )
{
    if ( !(a instanceof Array) || a.length === 0 )
    {
        return null ;
    }
    else
    {
        let args = [];
        let l = a.length;
        for ( let i = 0 ; i<l ; i++ )
        {
            let o = a[i];
            if ( o !== null )
            {
                let call       = ( ObjectAttribute.CALLBACK in o )   ? o[ ObjectAttribute.CALLBACK ]  : null;
                let conf       = ( ObjectAttribute.CONFIG in o )     ? String(o[ ObjectAttribute.CONFIG ]) : null;
                let i18n       = ( ObjectAttribute.LOCALE in o )     ? String(o[ ObjectAttribute.LOCALE ]) : null;
                let ref        = ( ObjectAttribute.REFERENCE in o )  ? String(o[ ObjectAttribute.REFERENCE ]) : null;
                let value      = ( ObjectAttribute.VALUE in o )      ? o[ ObjectAttribute.VALUE ] : null;
                let evaluators = ( ObjectAttribute.EVALUATORS in o ) ? o[ ObjectAttribute.EVALUATORS ] : null;
                if ( ref !== null && ref.length > 0 )
                {
                    args.push( new ObjectArgument( ref , ObjectAttribute.REFERENCE , evaluators ) ) ;
                }
                else if ( conf !== null && conf.length > 0 )
                {
                    args.push( new ObjectArgument( conf , ObjectAttribute.CONFIG , evaluators ) ) ;
                }
                else if ( i18n !== null && i18n.length > 0 )
                {
                    args.push( new ObjectArgument( i18n , ObjectAttribute.LOCALE , evaluators ) ) ;
                }
                else if ( call instanceof Function || ( (call instanceof String || typeof(call) === 'string') && (call !== '') ) )
                {
                    let def = new ObjectArgument( call , ObjectAttribute.CALLBACK , evaluators );
                    if( ObjectAttribute.SCOPE in o )
                    {
                        def.scope = o[ObjectAttribute.SCOPE] ;
                    }
                    if( ( ObjectAttribute.ARGUMENTS in o ) && (o[ ObjectAttribute.ARGUMENTS ] instanceof Array) )
                    {
                        def.args = createArguments( o[ ObjectAttribute.ARGUMENTS ] ) ;
                    }
                    args.push( def ) ;
                }
                else
                {
                    args.push( new ObjectArgument( value , ObjectAttribute.VALUE , evaluators ) ) ;
                }
            }
        }
        return args.length > 0 ? args : null ;
    }
}

function dumpArray( value  , prettyprint = false , indent = 0 , indentor = "    " )
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;
    if( !indentor )
    {
        indentor = "    " ;
    }
    var source  = [];
    var i;
    var l  = value.length;
    for( i = 0 ; i < l ; i++ )
    {
        if( value[i] === undefined )
        {
            source.push( "undefined" );
            continue;
        }
        if( value[i] === null )
        {
            source.push( "null" );
            continue;
        }
        if( prettyprint )
        {
            indent++ ;
        }
        source.push( dump( value[i], prettyprint, indent, indentor ) ) ;
        if( prettyprint )
        {
            indent-- ;
        }
    }
    if( prettyprint )
    {
        var spaces  = [];
        for( i=0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }
        var decal  = "\n" + spaces.join( "" );
        return decal + "[" + decal + indentor + source.join( "," + decal + indentor ) + decal + "]" ;
    }
    else
    {
        return "[" + source.join( "," ) + "]" ;
    }
}

function dumpDate( date          , timestamp = false  )
{
    timestamp = Boolean( timestamp ) ;
    if ( timestamp )
    {
        return "new Date(" + String( date.valueOf() ) + ")";
    }
    else
    {
        var y    = date.getFullYear();
        var m    = date.getMonth();
        var d    = date.getDate();
        var h    = date.getHours();
        var mn   = date.getMinutes();
        var s    = date.getSeconds();
        var ms   = date.getMilliseconds();
        var data = [ y, m, d, h, mn, s, ms ];
        data.reverse();
        while( data[0] === 0 )
        {
            data.splice( 0, 1 );
        }
        data.reverse() ;
        return "new Date(" + data.join( "," ) + ")";
    }
}

function dumpObject( value , prettyprint = false , indent = 0 , indentor = "    ")
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;
    if( !indentor )
    {
        indentor = "    " ;
    }
    var source  = [];
    for( var member  in value )
    {
        if( value.hasOwnProperty( member ) )
        {
            if( value[member] === undefined )
            {
                source.push( member + ":" + "undefined" );
                continue;
            }
            if( value[member] === null )
            {
                source.push( member + ":" + "null" );
                continue;
            }
            if( prettyprint )
            {
                indent++ ;
            }
            source.push( member + ":" + dump( value[ member ], prettyprint, indent, indentor ) );
            if( prettyprint )
            {
                indent-- ;
            }
        }
    }
    source = source.sort();
    if( prettyprint )
    {
        let spaces = [];
        for( var i = 0 ; i < indent ; i++ )
        {
            spaces.push( indentor );
        }
        let decal = '\n' + spaces.join( '' );
        return decal + '{' + decal + indentor + source.join( ',' + decal + indentor ) + decal + '}' ;
    }
    else
    {
        return( '{' + source.join( ',' ) + '}' ) ;
    }
}

function toUnicodeNotation( num )
{
    var hex = num.toString( 16 );
    while( hex.length < 4 )
    {
        hex = "0" + hex ;
    }
    return hex ;
}

function dumpString( value   )
{
    var code;
    var quote  = "\"";
    var str    = "";
    var ch     = "";
    var pos       = 0;
    var len       = value.length;
    while( pos < len )
    {
        ch  = value.charAt( pos );
        code = value.charCodeAt( pos );
        if( code > 0xFF )
        {
            str += "\\u" + toUnicodeNotation( code );
            pos++;
            continue;
        }
        switch( ch )
        {
            case "\u0008" :
            {
                str += "\\b" ;
                break;
            }
            case "\u0009" :
            {
                str += "\\t" ;
                break;
            }
            case "\u000A" :
            {
                str += "\\n" ;
                break;
            }
            case "\u000B" :
            {
                str += "\\v" ;
                break;
            }
            case "\u000C" :
            {
                str += "\\f" ;
                break;
            }
            case "\u000D" :
            {
                str += "\\r" ;
                break;
            }
            case "\u0022" :
            {
                str += "\\\"" ;
                break;
            }
            case "\u0027" :
            {
                str += "\\\'";
                break;
            }
            case "\u005c" :
            {
                str += "\\\\";
                break;
            }
            default :
            {
                str += ch;
            }
        }
        pos++;
    }
    return quote + str + quote;
}

function dump( o , prettyprint  , indent  , indentor   )
{
    indent = isNaN(indent) ? 0 : indent ;
    prettyprint = Boolean( prettyprint ) ;
    if( !indentor )
    {
        indentor = "    " ;
    }
    if( o === undefined )
    {
        return "undefined";
    }
    else if( o === null )
    {
        return "null";
    }
    else if( typeof(o) === "string" || o instanceof String )
    {
        return dumpString( o );
    }
    else if ( typeof(o) === "boolean" || o instanceof Boolean  )
    {
        return o ? "true" : "false";
    }
    else if( typeof(o) === "number" || o instanceof Number )
    {
        return o.toString() ;
    }
    else if( o instanceof Date )
    {
        return dumpDate( o );
    }
    else if( o instanceof Array )
    {
        return dumpArray( o , prettyprint, indent, indentor );
    }
    else if( o.constructor && o.constructor === Object )
    {
        return dumpObject( o , prettyprint, indent, indentor );
    }
    else if( "toSource" in o )
    {
        return o.toSource( indent );
    }
    else
    {
        return "<unknown>";
    }
}

var logger$2 = Log.getLogger( "system.ioc.logger" );

var ObjectOrder = Object.defineProperties( {} ,
{
    AFTER : { value : "after" , enumerable : true },
    BEFORE : { value : "before" , enumerable : true },
    NONE : { value : "none" , enumerable : true },
    NOW : { value : "now" , enumerable : true }
});

function ObjectListener( dispatcher , type , method = null , useCapture = false , order = "after" , priority = 0 )
{
    Object.defineProperties( this ,
    {
        dispatcher : { value : dispatcher , writable : true } ,
        method : { value : method , writable : true } ,
        priority : { value : priority , writable : true } ,
        type : { value : type , writable : true } ,
        useCapture : { value : useCapture === true , writable : true } ,
        _order : { value : ( order === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER  , writable : true }
    }) ;
}
ObjectListener.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectListener } ,
    order :
    {
        get : function() { return this._order ; } ,
        set : function( value )
        {
            this._order = ( value === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER ;
        }
    },
    toString : { value : function () { return '[ObjectListener]' ; }}
}) ;
Object.defineProperties( ObjectListener ,
{
    DISPATCHER : { value : "dispatcher" , enumerable : true } ,
    METHOD : { value : "method" , enumerable : true } ,
    ORDER : { value : "order" , enumerable : true } ,
    PRIORITY : { value : "priority" , enumerable : true } ,
    USE_CAPTURE : { value : "useCapture" , enumerable : true } ,
    TYPE : { value : "type" , enumerable : true }
});

function createListeners( factory )
{
    if ( !factory )
    {
        return null ;
    }
    let a = null;
    if ( factory instanceof Array )
    {
        a = factory ;
    }
    else if( ( ObjectAttribute.LISTENERS in factory ) && (factory[ ObjectAttribute.LISTENERS ] instanceof Array ) )
    {
        a = factory[ ObjectAttribute.LISTENERS ] ;
    }
    if ( a === null || a.length === 0 )
    {
        return null ;
    }
    let def;
    let dispatcher;
    let type;
    let listeners = [];
    let id = String(factory[ ObjectAttribute.ID ]);
    let len = a.length;
    for ( let i = 0 ; i<len ; i++ )
    {
        def = a[i] ;
        if ( def !== null && (ObjectListener.DISPATCHER in def) && (ObjectListener.TYPE in def) )
        {
            dispatcher = def[ ObjectListener.DISPATCHER ] ;
            if ( !(dispatcher instanceof String || typeof(dispatcher) === 'string') || dispatcher.length === 0 )
            {
                continue ;
            }
            type = def[ ObjectListener.TYPE ] ;
            if ( !(type instanceof String || typeof(type) === 'string') || type.length === 0 )
            {
                continue ;
            }
            listeners.push
            (
                new ObjectListener
                (
                    dispatcher , type ,
                    def[ ObjectListener.METHOD ] ,
                    def[ ObjectListener.USE_CAPTURE ] === true ,
                    (def[ ObjectListener.ORDER ] === ObjectOrder.BEFORE) ? ObjectOrder.BEFORE : ObjectOrder.AFTER ,
                    isNaN(def[ ObjectListener.PRIORITY ]) ? 0 : def[ ObjectListener.PRIORITY ]
                )
            ) ;
        }
        else
        {
            if( logger$2 )
            {
                logger$2.warning
                (
                    "ObjectBuilder.createListeners failed, a listener definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                    id , i , dump( def )
                ) ;
            }
        }
    }
    return ( listeners.length > 0 ) ? listeners : null ;
}

function ObjectStrategy() {}
ObjectStrategy.prototype = Object.create( Object.prototype ,
{
    constructor : { writable : true , value : ObjectStrategy },
    toString : { writable : true , value : function () { return '[' + this.constructor.name + ']' ; } }
}) ;

function ObjectProperty( name , value , policy = "value" , evaluators = null )
{
    Object.defineProperties( this ,
    {
        args : { value : null, writable : true } ,
        evaluators : { value : evaluators instanceof Array ? evaluators : null, writable : true } ,
        name : { value : name , writable : true } ,
        scope : { value : null, writable : true } ,
        value : { value : value , writable : true } ,
        _policy : { value : null , writable : true }
    }) ;
    this.policy = policy ;
}
ObjectProperty.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { writable : true , value : ObjectProperty } ,
    policy :
    {
        get : function() { return this._policy ; } ,
        set : function( str )
        {
            switch( str )
            {
                case ObjectAttribute.ARGUMENTS :
                case ObjectAttribute.CALLBACK  :
                case ObjectAttribute.CONFIG    :
                case ObjectAttribute.LOCALE    :
                case ObjectAttribute.REFERENCE :
                {
                    this._policy = str ;
                    break ;
                }
                default :
                {
                    this._policy = ObjectAttribute.VALUE ;
                }
            }
        }
    }
}) ;

function createProperties( factory )
{
    if ( !factory )
    {
        return null ;
    }
    let a = null;
    if ( factory instanceof Array )
    {
        a = factory ;
    }
    else if( (ObjectAttribute.PROPERTIES in factory) && (factory[ObjectAttribute.PROPERTIES] instanceof Array ) )
    {
        a = factory[ObjectAttribute.PROPERTIES] ;
    }
    if ( !(a instanceof Array) || (a.length === 0) )
    {
        return null ;
    }
    let properties = [];
    let id = String(factory[ ObjectAttribute.ID ]);
    let len = a.length;
    let prop = null;
    for ( let i = 0 ; i<len ; i++ )
    {
        prop = a[i] ;
        let args = null;
        let call = null;
        let conf = null;
        let i18n = null;
        let name = null;
        let ref  = null;
        let value = null;
        let evaluators = null;
        if ( prop && (ObjectAttribute.NAME in prop) )
        {
            name = prop[ ObjectAttribute.NAME ] ;
            if ( !(name instanceof String || typeof(name) === 'string') || (name.length === '') )
            {
                continue ;
            }
            if( ObjectAttribute.EVALUATORS in prop )
            {
                evaluators = (prop[ ObjectAttribute.EVALUATORS ] instanceof Array) ? prop[ ObjectAttribute.EVALUATORS ] : null ;
            }
            if( ObjectAttribute.ARGUMENTS in prop )
            {
                args = prop[ ObjectAttribute.ARGUMENTS ] || null ;
            }
            if( ObjectAttribute.CONFIG in prop )
            {
                conf = prop[ ObjectAttribute.CONFIG ] || null ;
            }
            if( ObjectAttribute.LOCALE in prop )
            {
                i18n = prop[ ObjectAttribute.LOCALE ] || null ;
            }
            if( ObjectAttribute.CALLBACK in prop )
            {
                call = prop[ ObjectAttribute.CALLBACK ] ;
            }
            if( ObjectAttribute.REFERENCE in prop )
            {
                ref = prop[ ObjectAttribute.REFERENCE ] || null ;
            }
            if( ObjectAttribute.VALUE in prop )
            {
                value = prop[ ObjectAttribute.VALUE ] ;
            }
            let property = null;
            if ( (ref instanceof String || typeof(ref) === 'string') && (ref !== '') )
            {
                property = new ObjectProperty( name , ref , ObjectAttribute.REFERENCE , evaluators ) ;
            }
            else if ( (conf instanceof String || typeof(conf) === 'string') && (conf !== '') )
            {
                property = new ObjectProperty( name , conf , ObjectAttribute.CONFIG , evaluators ) ;
            }
            else if ( (i18n instanceof String || typeof(i18n) === 'string') && (i18n !== '') )
            {
                property = new ObjectProperty( name , i18n , ObjectAttribute.LOCALE , evaluators ) ;
            }
            else if( call instanceof Function || ( (call instanceof String || typeof(call) === 'string') && (call !== '') ) )
            {
                property = new ObjectProperty( name , call , ObjectAttribute.CALLBACK , evaluators ) ;
                if( args && (args instanceof Array) )
                {
                    property.args = createArguments( args );
                }
                if( ObjectAttribute.SCOPE in prop )
                {
                    property.scope = prop[ ObjectAttribute.SCOPE ] || null ;
                }
            }
            else if ( args && (args instanceof Array) )
            {
                property = new ObjectProperty( name , createArguments( args ) , ObjectAttribute.ARGUMENTS ) ;
            }
            else
            {
                property = new ObjectProperty( name , value , ObjectAttribute.VALUE , evaluators ) ;
            }
            if( property )
            {
                properties.push( property ) ;
            }
        }
        else if( logger$2 )
        {
            logger$2.warning
            (
                "createProperties failed, a property definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                id , i , dump( prop )
            ) ;
        }
    }
    return ( properties.length > 0 ) ? properties : null ;
}

function ObjectReceiver( signal , slot = null , priority = 0 , autoDisconnect = false , order = "after" )
{
    Object.defineProperties( this ,
    {
        autoDisconnect : { value : autoDisconnect , writable : true } ,
        order :
        {
            get : function() { return this._order ; } ,
            set : function( value )
            {
                this._order = ( value === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER ;
            }
        },
        priority : { value : priority , writable : true } ,
        signal : { value : signal , writable : true } ,
        slot : { value : slot , writable : true } ,
        _order : { value : ( order === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER  , writable : true }
    }) ;
}
ObjectReceiver.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectReceiver },
    toString : { value : function () { return '[ObjectReceiver]' ; }}
});
Object.defineProperties( ObjectReceiver ,
{
    AUTO_DISCONNECT : { value : "autoDisconnect" , enumerable : true } ,
    ORDER : { value : "order" , enumerable : true } ,
    PRIORITY : { value : "priority" , enumerable : true } ,
    SIGNAL : { value : "signal" , enumerable : true } ,
    SLOT : { value : "slot" , enumerable : true }
});

function createReceivers( factory )
{
    if ( !factory )
    {
        return null ;
    }
    let a = null;
    if ( factory instanceof Array )
    {
        a = factory ;
    }
    else if( ( ObjectAttribute.RECEIVERS in factory ) && (factory[ObjectAttribute.RECEIVERS] instanceof Array ) )
    {
        a = factory[ObjectAttribute.RECEIVERS] ;
    }
    if ( a === null || a.length === 0 )
    {
        return null ;
    }
    let def;
    let receivers = [];
    let signal;
    let id = String( factory[ObjectAttribute.ID] );
    let len = a.length;
    for ( let i = 0 ; i<len ; i++ )
    {
        def = a[i] ;
        if ( def !== null && ( ObjectReceiver.SIGNAL in def ) )
        {
            signal = def[ ObjectReceiver.SIGNAL ] ;
            if ( !(signal instanceof String || typeof(signal) === 'string') || signal.length === 0 )
            {
                continue ;
            }
            receivers.push
            (
                new ObjectReceiver
                (
                    signal ,
                    def[ ObjectReceiver.SLOT ] ,
                    isNaN(def[ ObjectReceiver.PRIORITY ]) ? 0 : def[ ObjectReceiver.PRIORITY ] ,
                    def[ ObjectReceiver.AUTO_DISCONNECT ] === true ,
                    ( def[ ObjectReceiver.ORDER ] === ObjectOrder.BEFORE ) ? ObjectOrder.BEFORE : ObjectOrder.AFTER
                )
            ) ;
        }
        else
        {
            logger$2.warning
            (
                "ObjectBuilder.createReceivers failed, a receiver definition is invalid in the object definition \"{0}\" at \"{1}\" with the value : {2}" ,
                id , i , dump( def )
            ) ;
        }
    }
    return ( receivers.length > 0 ) ? receivers : null ;
}

var ObjectStrategies = Object.defineProperties( {} ,
{
    FACTORY_METHOD : { value : 'factoryMethod' , enumerable : true },
    FACTORY_PROPERTY : { value : 'factoryProperty' , enumerable : true },
    FACTORY_REFERENCE : { value : 'factoryReference' , enumerable : true },
    FACTORY_VALUE : { value : 'factoryValue' , enumerable : true },
    STATIC_FACTORY_METHOD : { value : 'staticFactoryMethod' , enumerable : true },
    STATIC_FACTORY_PROPERTY : { value : 'staticFactoryProperty' , enumerable : true },
});

function ObjectMethod( name , args )
{
    Object.defineProperties( this ,
    {
        args : { value : args , writable : true } ,
        name : { value : name , writable : true }
    }) ;
}
ObjectMethod.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { writable : true , value : ObjectMethod }
}) ;

function ObjectFactoryMethod( factory , name , args )
{
    ObjectMethod.call( this , name , args ) ;
    Object.defineProperties( this ,
    {
        factory : { value : factory , writable : true }
    }) ;
}
ObjectFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    constructor : { writable : true  , value : ObjectFactoryMethod }
});
Object.defineProperties( ObjectFactoryMethod ,
{
    build : { value : function( o )
    {
        if ( o === null )
        {
            return null ;
        }
        if ( (ObjectAttribute.FACTORY in o) && (ObjectAttribute.NAME in o) )
        {
            return new ObjectFactoryMethod
            (
                o[ ObjectAttribute.FACTORY ] || null ,
                o[ ObjectAttribute.NAME ] || null ,
                createArguments( o[ ObjectAttribute.ARGUMENTS ] || null )
            ) ;
        }
        else
        {
            return null ;
        }
    }}
});

function ObjectFactoryProperty( factory  , name  , evaluators  = null )
{
    ObjectProperty.call( this , name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        factory : { value : factory , writable : true }
    }) ;
}
ObjectFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    constructor : { writable : true , value : ObjectFactoryProperty }
}) ;
Object.defineProperties( ObjectFactoryProperty ,
{
    build :
    {
        value : function( o )
        {
            if ( o === null )
            {
                return null ;
            }
            if ( (ObjectAttribute.FACTORY in o) && (ObjectAttribute.NAME in o) )
            {
                return new ObjectFactoryProperty
                (
                    o[ ObjectAttribute.FACTORY    ] || null ,
                    o[ ObjectAttribute.NAME       ] || null ,
                    o[ ObjectAttribute.EVALUATORS ] || null
                ) ;
            }
            else
            {
                return null ;
            }
        }
    }
});

function ObjectReference( ref )
{
    Object.defineProperties( this ,
    {
        ref : { value : (ref instanceof String) || typeof(ref) === 'string' ? ref : null , writable : true }
    }) ;
}
ObjectReference.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { value : ObjectReference }
}) ;

function ObjectStaticFactoryMethod( type , name , args )
{
    ObjectMethod.call( this , name , args ) ;
    Object.defineProperties( this ,
    {
        type : { value : type , writable : true }
    }) ;
}
ObjectStaticFactoryMethod.prototype = Object.create( ObjectMethod.prototype ,
{
    constructor : { value : ObjectStaticFactoryMethod , writable : true }
}) ;
Object.defineProperties( ObjectStaticFactoryMethod ,
{
    build : { value : function( o )
    {
        if ( o === null )
        {
            return null ;
        }
        if ( ( ObjectAttribute.TYPE in o ) && ( ObjectAttribute.NAME in o ) )
        {
            let strategy = new ObjectStaticFactoryMethod
            (
                o[ ObjectAttribute.TYPE ] || null ,
                o[ ObjectAttribute.NAME ] || null ,
                createArguments( o[ ObjectAttribute.ARGUMENTS ] || null )
            );
            return strategy ;
        }
        else
        {
            return null ;
        }
    }}
});

function ObjectStaticFactoryProperty( name  , type  , evaluators  = null )
{
    ObjectProperty.call( this , name , null, null, evaluators ) ;
    Object.defineProperties( this ,
    {
        type : { value : type , writable : true }
    }) ;
}
ObjectStaticFactoryProperty.prototype = Object.create( ObjectProperty.prototype ,
{
    constructor : { value : ObjectStaticFactoryProperty , writable : true }
}) ;
Object.defineProperties( ObjectStaticFactoryProperty ,
{
    build : { value : function( o )
    {
        if ( o === null )
        {
            return null ;
        }
        if ( (ObjectAttribute.TYPE in o) && (ObjectAttribute.NAME in o) )
        {
            return new ObjectStaticFactoryProperty
            (
                o[ ObjectAttribute.NAME       ] || null ,
                o[ ObjectAttribute.TYPE       ] || null ,
                o[ ObjectAttribute.EVALUATORS ] || null
            ) ;
        }
        else
        {
            return null ;
        }
    }}
});

function ObjectValue( value )
{
    Object.defineProperties( this ,
    {
        value : { writable : true , value : value }
    }) ;
}
ObjectValue.prototype = Object.create( ObjectStrategy.prototype ,
{
    constructor : { writable : true , value : ObjectValue }
}) ;

function createStrategy( o )
{
    if ( ObjectStrategies.FACTORY_METHOD in o )
    {
        return ObjectFactoryMethod.build( o[ ObjectStrategies.FACTORY_METHOD ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_PROPERTY in o )
    {
        return ObjectFactoryProperty.build( o[ ObjectStrategies.FACTORY_PROPERTY ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_REFERENCE in o )
    {
        return new ObjectReference( o[ ObjectStrategies.FACTORY_REFERENCE ] ) ;
    }
    else if ( ObjectStrategies.FACTORY_VALUE in o )
    {
        return new ObjectValue( o[ ObjectStrategies.FACTORY_VALUE ] ) ;
    }
    else if ( ObjectStrategies.STATIC_FACTORY_METHOD  in o )
    {
        return ObjectStaticFactoryMethod.build( o[ ObjectStrategies.STATIC_FACTORY_METHOD ] ) ;
    }
    else if ( ObjectStrategies.STATIC_FACTORY_PROPERTY in o )
    {
        return ObjectStaticFactoryProperty.build( o[ ObjectStrategies.STATIC_FACTORY_PROPERTY ] ) ;
    }
    else
    {
        return null ;
    }
}

var ObjectScope = Object.defineProperties( {} ,
{
    PROTOTYPE : { value : "prototype" , enumerable : true },
    SINGLETON : { value : "singleton" , enumerable : true },
    SCOPES : { value : [ "prototype" , "singleton" ] },
    validate : { value : function( scope )
    {
        return ObjectScope.SCOPES.indexOf( scope ) > -1 ;
    }}
});

function ObjectDefinition( id , type , singleton = false , lazyInit = false , lazyType=false )
{
    if ( id === null || id === undefined )
    {
        throw new ReferenceError( this + " constructor failed, the 'id' value passed in argument not must be empty or 'null' or 'undefined'.") ;
    }
    if ( type === null || type === undefined )
    {
        throw new ReferenceError( this + " constructor failed, the 'type' passed in argument not must be empty or 'null' or 'undefined'.") ;
    }
    Object.defineProperties( this ,
    {
        constructorArguments : { value : null , enumerable : true , writable : true } ,
        destroyMethodName : { value : null , enumerable : true , writable : true } ,
        id : { value : id , enumerable : true , writable : true } ,
        identify : { value : false , enumerable : true , writable : true } ,
        initMethodName : { value : null , enumerable : true , writable : true } ,
        lock : { value : false , enumerable : true , writable : true } ,
        properties : { value : null , enumerable : true , writable : true } ,
        type : { value : type , enumerable : true , writable : true } ,
        _afterListeners  : { value : null , writable : true } ,
        _beforeListeners : { value : null , writable : true } ,
        _dependsOn       : { value : null , writable : true } ,
        _generates       : { value : null , writable : true } ,
        _lazyInit        : { value : lazyInit && singleton , writable : true } ,
        _lazyType        : { value : lazyType === true , writable : true } ,
        _singleton       : { value : singleton === true , writable : true } ,
        _scope           : { value : singleton === true ? ObjectScope.SINGLETON : ObjectScope.PROTOTYPE , writable : true } ,
        _strategy        : { value : null , writable : true }
    }) ;
}
ObjectDefinition.prototype = Object.create( Identifiable.prototype ,
{
    constructor : { writable : true , value : Identifiable },
    afterListeners : { get : function() { return this._afterListeners ; } },
    afterReceivers : { get : function() { return this._afterReceivers ; } },
    beforeListeners : { get : function() { return this._beforeListeners ; } },
    beforeReceivers : { get : function() { return this._beforeReceivers ; } },
    dependsOn :
    {
        get : function() { return this._dependsOn ; } ,
        set : function( ar )
        {
            this._dependsOn = ( ar instanceof Array && ar.length > 0 ) ? ar.filter( this._filterStrings ) : null ;
        }
    },
    generates :
    {
        get : function() { return this._generates ; } ,
        set : function( ar )
        {
            this._generates = ( ar instanceof Array && ar.length > 0 ) ? ar.filter( this._filterStrings ) : null ;
        }
    },
    lazyInit :
    {
        get : function() { return this._lazyInit; },
        set : function( flag )
        {
            this._lazyInit = ((flag instanceof Boolean) || (typeof(flag) === 'boolean')) ? flag : false ;
        }
    },
    lazyType :
    {
        get : function() { return this._lazyType; },
        set : function( value )
        {
            this._lazyType = value === true ;
        }
    },
    listeners : { set : function( ar )
    {
        this._afterListeners  = [] ;
        this._beforeListeners = [] ;
        if ( ar === null || !(ar instanceof Array) )
        {
            return ;
        }
        let l = ar.length;
        if ( l > 0 )
        {
            for( let i = 0 ; i < l ; i++ )
            {
                let r = ar[i];
                if ( r instanceof ObjectListener )
                {
                    if( r.order === ObjectOrder.AFTER )
                    {
                        this._afterListeners.push( r ) ;
                    }
                    else
                    {
                        this._beforeListeners.push( r ) ;
                    }
                }
            }
        }
    }},
    receivers : { set : function( ar )
    {
        this._afterReceivers  = [] ;
        this._beforeReceivers = [] ;
        if ( ar === null || !(ar instanceof Array) )
        {
            return ;
        }
        let l = ar.length;
        if ( l > 0 )
        {
            for( var i = 0 ; i < l ; i++ )
            {
                let r = ar[i];
                if ( r instanceof ObjectReceiver )
                {
                    if( r.order === ObjectOrder.AFTER )
                    {
                        this._afterReceivers.push( r ) ;
                    }
                    else
                    {
                        this._beforeReceivers.push( r ) ;
                    }
                }
            }
        }
    }},
    singleton : { get : function() { return this._singleton; } },
    scope :
    {
        get : function() { return this._scope ; } ,
        set : function( scope )
        {
            this._scope = ObjectScope.validate( scope ) ? scope : ObjectScope.PROTOTYPE ;
            this._singleton = Boolean(this._scope === ObjectScope.SINGLETON) ;
        }
    },
    strategy :
    {
        get : function() { return this._strategy ; } ,
        set : function( strategy )
        {
            this._strategy = (strategy instanceof ObjectStrategy) ? strategy : null ;
        }
    },
    toString : { value : function () { return "[ObjectDefinition]" ; } } ,
    _filterStrings : { value : function( item )
    {
        return (typeof(item) === 'string' || item instanceof String) && item.length > 0 ;
    }}
}) ;

function createObjectDefinition( o )
{
    let definition = new ObjectDefinition
    (
        o[ ObjectAttribute.ID ]        || null ,
        o[ ObjectAttribute.TYPE ]      || null ,
        o[ ObjectAttribute.SINGLETON ] || false ,
        o[ ObjectAttribute.LAZY_INIT ] || false ,
        o[ ObjectAttribute.LAZY_TYPE ] || false
    );
    if( (ObjectAttribute.IDENTIFY in o) && (o[ObjectAttribute.IDENTIFY] instanceof Boolean || typeof(o[ObjectAttribute.IDENTIFY]) === 'boolean') )
    {
        definition.identify = o[ ObjectAttribute.IDENTIFY ] ;
    }
    if( (ObjectAttribute.LOCK in o) && (o[ObjectAttribute.LOCK] instanceof Boolean || typeof(o[ObjectAttribute.LOCK]) === 'boolean') )
    {
        definition.lock = o[ ObjectAttribute.LOCK ] ;
    }
    if( (ObjectAttribute.ARGUMENTS in o ) && ( o[ ObjectAttribute.ARGUMENTS ] instanceof Array ) )
    {
        definition.constructorArguments = createArguments( o[ ObjectAttribute.ARGUMENTS ] );
    }
    if( ObjectAttribute.DESTROY_METHOD_NAME in o )
    {
        definition.destroyMethodName = o[ ObjectAttribute.DESTROY_METHOD_NAME ] ;
    }
    if( ObjectAttribute.INIT_METHOD_NAME in o )
    {
        definition.initMethodName = o[ ObjectAttribute.INIT_METHOD_NAME ] ;
    }
    if( ObjectAttribute.SCOPE in o )
    {
        definition.scope = o[ ObjectAttribute.SCOPE ] ;
    }
    if( (ObjectAttribute.DEPENDS_ON in o) && ( o[ObjectAttribute.DEPENDS_ON] instanceof Array ) )
    {
        definition.dependsOn = o[ ObjectAttribute.DEPENDS_ON ] ;
    }
    if( (ObjectAttribute.GENERATES in o) && (o[ObjectAttribute.GENERATES] instanceof Array) )
    {
        definition.generates = o[ ObjectAttribute.GENERATES ] ;
    }
    let listeners = createListeners( o );
    if( listeners )
    {
        definition.listeners = listeners ;
    }
    let properties = createProperties( o );
    if( properties )
    {
        definition.properties = properties ;
    }
    let receivers = createReceivers( o );
    if( receivers )
    {
        definition.receivers = receivers ;
    }
    let strategy = createStrategy( o );
    if( strategy )
    {
        definition.strategy = strategy ;
    }
    return definition ;
}

var MagicReference = Object.defineProperties( {} ,
{
    CONFIG : { value : "#config" , enumerable : true },
    INIT : { value : "#init" , enumerable : true },
    LOCALE : { value : "#locale" , enumerable : true },
    PARAMS : { value : "#params" , enumerable : true },
    ROOT : { value : "#root" , enumerable : true },
    STAGE : { value : "#stage" , enumerable : true },
    THIS : { value : "#this" , enumerable : true }
});

function Formattable()
{
}
Formattable.prototype = Object.create( Object.prototype );
Formattable.prototype.constructor = Formattable;
Formattable.prototype.format = function( value )
{
};

function ExpressionFormatter()
{
    Object.defineProperties( this ,
    {
        expressions : { value : new ArrayMap() },
        _beginSeparator : { value : '{' , writable : true } ,
        _endSeparator : { value : '}' , writable : true } ,
        _pattern : { value : "{0}((\\w+\)|(\\w+)((.\\w)+|(.\\w+))){1}" } ,
        _reg : { value : null , writable : true }
    }) ;
    this._reset() ;
}
Object.defineProperties( ExpressionFormatter ,
{
    MAX_RECURSION : { value : 200 , enumerable : true }
}) ;
ExpressionFormatter.prototype = Object.create( Formattable.prototype ,
{
    constructor : { value : ExpressionFormatter } ,
    beginSeparator :
    {
        get : function()
        {
            return this._beginSeparator ;
        },
        set : function( str )
        {
            this._beginSeparator = str || "{" ;
            this._reset() ;
        }
    },
    endSeparator :
    {
        get : function()
        {
            return this._endSeparator ;
        },
        set : function( str )
        {
            this._endSeparator = str || "}" ;
            this._reset() ;
        }
    },
    length :
    {
        get : function()
        {
            return this.expressions.length ;
        }
    },
    clear :
    {
        value : function ()
        {
            this.expressions.clear() ;
        }
    },
    format :
    {
        value : function ( value )
        {
            return this._format( String(value) , 0 ) ;
        }
    },
    set :
    {
        value : function ( key , value )
        {
            if ( key === '' || !(key instanceof String || typeof(key) === 'string') )
            {
                return false ;
            }
            if ( value === '' || !(value instanceof String || typeof(value) === 'string') )
            {
                return false ;
            }
            this.expressions.set( key , value ) ;
            return true ;
        }
    },
    toString : { value : function() { return '[ExpressionFormatter]' ; } } ,
    _reset :
    {
        value : function()
        {
            this._reg = new RegExp( fastformat( this._pattern , this.beginSeparator , this.endSeparator ) , "g" ) ;
        }
    },
    _format : { value : function( str , depth = 0 )
    {
        if ( depth >= ExpressionFormatter.MAX_RECURSION )
        {
            return str ;
        }
        let m = str.match( this._reg );
        if ( m === null )
        {
            return str ;
        }
        let l = m.length;
        if ( l > 0 )
        {
            let exp;
            let key;
            for ( let i = 0 ; i<l ; i++ )
            {
                key = m[i].substr(1) ;
                key = key.substr( 0 , key.length-1 ) ;
                if ( this.expressions.has( key ) )
                {
                    exp = this._format( this.expressions.get(key) , depth + 1 ) ;
                    this.expressions.set( key , exp ) ;
                    str = str.replace( m[i] , exp ) || exp ;
                }
            }
        }
        return str ;
    }}
}) ;

function PropertyEvaluator( target )
{
    Object.defineProperties( this ,
    {
        separator : { value : "." , writable : true } ,
        target : { value : target , writable : true , configurable : true } ,
        throwError : { value : false , writable : true } ,
        undefineable : { value : null , writable : true }
    }) ;
}
PropertyEvaluator.prototype = Object.create( Evaluable.prototype );
PropertyEvaluator.prototype.constructor = PropertyEvaluator;
PropertyEvaluator.prototype.eval = function ( o )
{
    if ( o !== null && ( typeof(o) === "string" || o instanceof String ) && (this.target !== null) )
    {
        var exp  = String(o);
        if ( exp.length > 0 )
        {
            var value = this.target;
            var members = exp.split( this.separator );
            var len = members.length;
            for ( var i  = 0 ; i < len ; i++ )
            {
                if ( members[i] in value )
                {
                    value = value[ members[i] ] ;
                }
                else
                {
                    if ( this.throwError )
                    {
                        throw new EvalError( this + " eval failed with the expression : " + o ) ;
                    }
                    return this.undefineable ;
                }
            }
            return value ;
        }
    }
    return this.undefineable ;
};
PropertyEvaluator.prototype.toString = function ()
{
    return "[PropertyEvaluator]" ;
};

function ConfigEvaluator( config )
{
    PropertyEvaluator.call(this) ;
    this.config = (config instanceof ObjectConfig) ? config : null ;
    Object.defineProperties( this ,
    {
        target : { get : function() { return this.config !== null ? this.config.config : null ; } }
    }) ;
}
ConfigEvaluator.prototype = Object.create( PropertyEvaluator.prototype ,
{
    constructor : { value : ConfigEvaluator }
});

function LocaleEvaluator( config )
{
    PropertyEvaluator.call(this) ;
    this.config = (config instanceof ObjectConfig) ? config : null ;
    Object.defineProperties( this ,
    {
        target :
        {
            get : function() { return this.config !== null ? this.config.locale : null ; }
        }
    }) ;
}
LocaleEvaluator.prototype = Object.create( PropertyEvaluator.prototype ,
{
    constructor : { value : LocaleEvaluator }
});

function ReferenceEvaluator( factory )
{
    Object.defineProperties( this ,
    {
        factory : { value : (factory instanceof ObjectFactory) ? factory : null , writable : true } ,
        separator : { value : "." , writable : true } ,
        undefineable : { value : null , writable : true } ,
        throwError :
        {
            get : function() { return this._propEvaluator.throwError ; } ,
            set : function( flag ) { this._propEvaluator.throwError = flag ; }
        },
        _propEvaluator : { value : new PropertyEvaluator() , writable : true }
    }) ;
}
ReferenceEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    constructor : { value : ReferenceEvaluator } ,
    eval : { value : function( o )
    {
        if ( (this.factory instanceof ObjectFactory) && (o instanceof String || typeof(o) === 'string' ) )
        {
            var exp = String(o);
            if ( exp.length > 0 )
            {
                var root;
                try
                {
                    root = this.factory.config.root ;
                }
                catch (e)
                {
                }
                switch( exp )
                {
                    case MagicReference.CONFIG :
                    {
                        return this.factory.config.config ;
                    }
                    case MagicReference.LOCALE :
                    {
                        return this.factory.config.locale ;
                    }
                    case MagicReference.PARAMS :
                    {
                        return this.factory.config.parameters ;
                    }
                    case MagicReference.THIS :
                    {
                        return this.factory ;
                    }
                    case MagicReference.ROOT :
                    {
                        return root ;
                    }
                    case MagicReference.STAGE :
                    {
                        var stage = this.factory.config.stage;
                        if ( stage !== null )
                        {
                            return stage ;
                        }
                        else if ( root && ( "stage" in root ) && ( root.stage !== null ) )
                        {
                             return root.stage ;
                        }
                        else
                        {
                            return this.undefineable ;
                        }
                        break ;
                    }
                    default :
                    {
                        let members = exp.split( this.separator );
                        if ( members.length > 0 )
                        {
                            let ref   = members.shift();
                            let value = this.factory.getObject( ref );
                            if ( value && members.length > 0 )
                            {
                                this._propEvaluator.target = value ;
                                value = this._propEvaluator.eval( members.join(".") ) ;
                                this._propEvaluator.target = null ;
                            }
                            return value ;
                        }
                    }
                }
            }
        }
        return this.undefineable ;
    }}
});

function getDefinitionByName( name , domain = null )
{
    if( ( name instanceof String ) || typeof(name) === 'string' )
    {
        name = name.split('.') ;
        if( name.length > 0 )
        {
            try
            {
                var o = domain || global;
                name.forEach( ( element ) =>
                {
                    if(o.hasOwnProperty(element) )
                    {
                        o = o[element] ;
                    }
                    else
                    {
                        return undefined ;
                    }
                });
                return o ;
            }
            catch( e )
            {
            }
        }
    }
    return undefined ;
}

var TypePolicy = Object.defineProperties( {} ,
{
    ALIAS : { value : "alias" , enumerable : true },
    ALL : { value : "all" , enumerable : true },
    EXPRESSION : { value : "expression" , enumerable : true },
    NONE : { value : "none" , enumerable : true }
});

function TypeEvaluator( config = null )
{
    Object.defineProperties( this ,
    {
        config : { value : (config instanceof ObjectConfig) ? config : null , writable : true } ,
        throwError : { value : false , writable : true }
    }) ;
}
TypeEvaluator.prototype = Object.create( Evaluable.prototype ,
{
    constructor : { value : TypeEvaluator } ,
    eval : { value : function( o )
    {
        if ( o instanceof Function )
        {
            return o ;
        }
        else if ( o instanceof String || typeof(o) === 'string' )
        {
            var type   = String(o);
            var config = this.config;
            if ( config && config instanceof ObjectConfig )
            {
                var policy = config.typePolicy;
                if ( policy !== TypePolicy.NONE )
                {
                    if ( policy === TypePolicy.ALL || policy === TypePolicy.ALIAS )
                    {
                        var aliases = config.typeAliases;
                        if ( (aliases instanceof ArrayMap) && aliases.has(type) )
                        {
                            type = aliases.get(type) ;
                        }
                    }
                    if ( policy === TypePolicy.ALL || policy === TypePolicy.EXPRESSION )
                    {
                       if ( config.typeExpression instanceof ExpressionFormatter )
                       {
                           type = config.typeExpression.format(type) ;
                       }
                    }
                }
            }
            try
            {
                var func = getDefinitionByName( type , config.domain );
                if( func instanceof Function )
                {
                    return func ;
                }
            }
            catch( e)
            {
                if ( this.throwError )
                {
                    throw new EvalError( this + " eval failed : " + e.toString() ) ;
                }
            }
        }
        return null ;
    }}
});

function ObjectConfig( init = null )
{
    Object.defineProperties( this ,
    {
        defaultDestroyMethod : { value : null , writable : true , enumerable : true } ,
        defaultInitMethod : { value : null , writable : true , enumerable : true } ,
        domain : { value : null , writable : true , enumerable : true } ,
        identify : { value : false , writable : true , enumerable : true } ,
        lazyInit : { value : false , writable : true , enumerable : true } ,
        lock : { value : false , writable : true , enumerable : true } ,
        parameters : { value : null , writable : true , enumerable : true } ,
        root : { value : null , writable : true , enumerable : true } ,
        stage : { value : null , writable : true , enumerable : true } ,
        useLogger : { value : false , writable : true , enumerable : true } ,
        _config             : { value : {} , writable : true } ,
        _configEvaluator    : { value : new ConfigEvaluator( this ) , writable : true } ,
        _locale             : { value : {} , writable : true } ,
        _localeEvaluator    : { value : new LocaleEvaluator( this ) , writable : true } ,
        _referenceEvaluator : { value : new ReferenceEvaluator() , writable : true } ,
        _typeAliases        : { value : new ArrayMap() , writable : true } ,
        _typeEvaluator      : { value : new TypeEvaluator( this ) , writable : true } ,
        _typeExpression     : { value : new ExpressionFormatter() , writable : true } ,
        _typePolicy         : { value : TypePolicy.NONE , writable : true }
    });
    this.throwError = false ;
    if( init )
    {
        this.initialize( init ) ;
    }
}
Object.defineProperties( ObjectConfig ,
{
    TYPE_ALIAS : { value : 'alias' , enumerable : true }
});
ObjectConfig.prototype = Object.create( Object.prototype ,
{
    constructor : { value : ObjectConfig } ,
    config :
    {
        get : function() { return this._config ; } ,
        set : function( init )
        {
            for( let prop in init )
            {
                this._config[prop] = init[prop] ;
            }
        }
    },
    configEvaluator :
    {
        get : function() { return this._configEvaluator ; }
    },
    locale :
    {
        get : function() { return this._locale ; } ,
        set : function( init )
        {
            for( let prop in init )
            {
                this._locale[prop] = init[prop] ;
            }
        }
    },
    localeEvaluator :
    {
        get : function() { return this._localeEvaluator ; }
    },
    referenceEvaluator :
    {
        get : function() { return this._referenceEvaluator ; }
    },
    throwError :
    {
        get : function() { return this._configEvaluator.throwError && this._localeEvaluator.throwError && this._typeEvaluator.throwError && this._referenceEvaluator.throwError ; } ,
        set : function( flag )
        {
            this._configEvaluator.throwError    = flag ;
            this._localeEvaluator.throwError    = flag ;
            this._referenceEvaluator.throwError = flag ;
            this._typeEvaluator.throwError      = flag ;
        }
    },
    typeAliases :
    {
        get : function() { return this._typeAliases ; } ,
        set : function( aliases )
        {
            if ( aliases instanceof ArrayMap )
            {
                let it = aliases.iterator();
                while( it.hasNext() )
                {
                    let next = it.next();
                    let key  = it.key();
                    this._typeAliases.set(key, next) ;
                }
            }
            else if ( aliases instanceof Array )
            {
                let len = aliases.length;
                if ( len > 0 )
                {
                   while ( --len > -1 )
                   {
                        let item = aliases[len];
                        if ( item !== null && ( ObjectConfig.TYPE_ALIAS in item ) && ( ObjectAttribute.TYPE in item ) )
                        {
                            this._typeAliases.set( String(item[ObjectConfig.TYPE_ALIAS]) , String(item[ObjectAttribute.TYPE]) ) ;
                        }
                   }
                }
            }
        }
    },
    typeEvaluator :
    {
        get : function() { return this._typeEvaluator ; }
    },
    typeExpression :
    {
        get : function() { return this._typeExpression ; } ,
        set : function( expressions                               )
        {
            if ( expressions instanceof ExpressionFormatter )
            {
                this._typeExpression = expressions ;
            }
            else if ( expressions instanceof Array )
            {
                if ( this._typeExpression === null )
                {
                    this._typeExpression = new ExpressionFormatter() ;
                }
                let len = expressions.length;
                if ( len > 0 )
                {
                   while ( --len > -1 )
                   {
                        let item = expressions[len];
                        if ( item !== null && ( ObjectAttribute.NAME in item ) && ( ObjectAttribute.VALUE in item ) )
                        {
                            this._typeExpression.set( String(item[ObjectAttribute.NAME]) , String(item[ObjectAttribute.VALUE]) ) ;
                        }
                   }
                }
            }
            else
            {
                this._typeExpression = new ExpressionFormatter() ;
            }
        }
    },
    typePolicy :
    {
        get : function() { return this._typePolicy ; } ,
        set : function( policy )
        {
            switch( policy )
            {
                case TypePolicy.ALIAS      :
                case TypePolicy.EXPRESSION :
                case TypePolicy.ALL        :
                {
                    this._typePolicy = policy ;
                    break ;
                }
                default :
                {
                    this._typePolicy = TypePolicy.NONE ;
                }
            }
        }
    },
    initialize : { value : function( init )
    {
        if ( init === null )
        {
            return ;
        }
        for (let prop in init)
        {
            if ( prop in this )
            {
                this[prop] = init[prop] ;
            }
        }
    }},
    setConfigTarget : { value : function( o = null )
    {
        this._config = o || {} ;
    }},
    setLocaleTarget : { value : function( o = null )
    {
        this._locale = o || {} ;
    }},
    toString : { value : function() { return '[ObjectConfig]' ; } }
});

function ObjectDefinitionContainer()
{
    Task.call(this) ;
    Object.defineProperties( this ,
    {
        _map : { writable : true , value : new ArrayMap() }
    });
}
ObjectDefinitionContainer.prototype = Object.create( Task.prototype ,
{
    constructor : { configurable : true , writable : true , value : ObjectDefinitionContainer } ,
    numObjectDefinition : { get : function() { return this._map.length ; } } ,
    addObjectDefinition : { value : function( definition )
    {
        if ( definition instanceof ObjectDefinition )
        {
            this._map.set( definition.id , definition ) ;
        }
        else
        {
            throw new ReferenceError( this + " addObjectDefinition failed, the specified object definition must be an ObjectDefinition object." ) ;
        }
    }},
    clearObjectDefinition : { value : function()
    {
        this._map.clear() ;
    }},
    clone : { value : function()
    {
        return new ObjectDefinitionContainer() ;
    }},
    getObjectDefinition : { value : function( id )
    {
        if ( this._map.has( id ) )
        {
            return this._map.get( id ) ;
        }
        else
        {
            throw new ReferenceError( this + " getObjectDefinition failed, the specified object definition don't exist : " + id ) ;
        }
    }},
    hasObjectDefinition : { value : function( id )
    {
        return this._map.has( id ) ;
    }},
    removeObjectDefinition : { value : function( id )
    {
        if ( this._map.has( id ) )
        {
            this._map.delete( id ) ;
        }
        else
        {
            throw new ReferenceError( this + " removeObjectDefinition failed, the specified object definition don't exist : " + id ) ;
        }
    }}
});

function ObjectFactory( config = null , objects = null )
{
    ObjectDefinitionContainer.call(this) ;
    Object.defineProperties( this ,
    {
        objects : { value : (objects instanceof Array) ? objects : null , writable : true } ,
        bufferSingletons : { value : [] , writable : true } ,
        _config : { value : null , writable : true } ,
        _evaluator : { value : new MultiEvaluator() } ,
        _singletons : { value : new ArrayMap() }
    }) ;
    this.config = config ;
}
ObjectFactory.prototype = Object.create( ObjectDefinitionContainer.prototype ,
{
    constructor : { value :  ObjectFactory },
    config :
    {
        get : function() { return this._config } ,
        set : function( config )
        {
            if ( this._config )
            {
                this._config.referenceEvaluator.factory = null ;
            }
            this._config = (config instanceof ObjectConfig) ? config : new ObjectConfig() ;
            this._config.referenceEvaluator.factory = this ;
        }
    },
    singletons : { get : function() { return this._singletons ; } } ,
    clone : { value : function()
    {
        return new ObjectFactory( this.config , [].concat( this.objects ) ) ;
    }},
    hasSingleton : { value : function( id )
    {
        return this._singletons.has(id) ;
    }},
    getObject : { value : function( id )
    {
        if ( !(id instanceof String || typeof(id) === 'string') )
        {
           return null ;
        }
        let instance = null;
        try
        {
            let definition;
            try
            {
                definition = this.getObjectDefinition( id ) ;
            }
            catch (e)
            {
            }
            if ( !(definition instanceof ObjectDefinition) )
            {
                throw new Error( "the definition is not register in the factory") ;
            }
            if ( definition.singleton )
            {
                instance = this._singletons.get(id) || null ;
            }
            if ( !instance )
            {
                if( !(definition.type instanceof Function) )
                {
                    if( definition.type instanceof String || typeof(definition.type) === 'string' )
                    {
                        definition.type = this.config.typeEvaluator.eval( definition.type )  ;
                    }
                }
                if( definition.type instanceof Function )
                {
                    if ( definition.strategy )
                    {
                        instance = this.createObjectWithStrategy( definition.strategy ) ;
                    }
                    else
                    {
                        try
                        {
                            instance = invoke( definition.type , this.createArguments( definition.constructorArguments , definition.id ) ) ;
                        }
                        catch( e )
                        {
                            throw new Error( "can't create the instance with the specified definition type " + definition.type + ". The arguments limit exceeded, you can pass a maximum of 32 arguments" ) ;
                        }
                    }
                    if ( instance )
                    {
                        if( !definition.lazyType )
                        {
                            let check = false;
                            if( instance instanceof definition.type )
                            {
                                check = true ;
                            }
                            else if( definition.type === String )
                            {
                                check = (instance instanceof String) || (typeof(instance) === 'string') ;
                            }
                            else if( definition.type === Number )
                            {
                                check = (instance instanceof Number) || (typeof(instance) === 'number') ;
                            }
                            else if( definition.type === Boolean )
                            {
                                check = (instance instanceof Boolean) || (typeof(instance) === 'boolean') ;
                            }
                            if( !check )
                            {
                                instance = null ;
                                throw new Error( "the new object is not an instance of the [" + definition.type.name + "] constructor" ) ;
                            }
                        }
                        if ( definition.singleton )
                        {
                            this._singletons.set( id , instance ) ;
                        }
                        this.dependsOn( definition ) ;
                        this.populateIdentifiable ( instance , definition ) ;
                        let flag = isLockable( instance ) && ( ( definition.lock === true ) || ( this.config.lock === true && definition.lock !== false ) );
                        if ( flag )
                        {
                            instance.lock() ;
                        }
                        if( (definition.beforeListeners instanceof Array) && (definition.beforeListeners.length > 0) )
                        {
                            this.registerListeners( instance , definition.beforeListeners ) ;
                        }
                        if( (definition.beforeReceivers instanceof Array) && (definition.beforeReceivers.length > 0) )
                        {
                            this.registerReceivers( instance , definition.beforeReceivers ) ;
                        }
                        this.populateProperties( instance , definition ) ;
                        if( (definition.afterListeners instanceof Array) && (definition.afterListeners.length > 0) )
                        {
                            this.registerListeners( instance , definition.afterListeners ) ;
                        }
                        if( (definition.afterReceivers instanceof Array) && (definition.afterReceivers.length > 0) )
                        {
                            this.registerReceivers( instance , definition.afterReceivers ) ;
                        }
                        if ( flag )
                        {
                            instance.unlock() ;
                        }
                        this.invokeInitMethod( instance , definition ) ;
                        this.generates( definition ) ;
                    }
                }
                else
                {
                    throw new Error( "the definition.type property is not a valid constructor" ) ;
                }
            }
        }
        catch( er )
        {
            this.warn( this + " getObject('" + id + "') failed, " + er.message + "." ) ;
        }
        return instance || null ;
    }},
    isDirty : { value : function()
    {
        return this.bufferSingletons && (this.bufferSingletons instanceof Array) && this.bufferSingletons.length > 0 ;
    }},
    isLazyInit : { value : function( id )
    {
        if ( this.hasObjectDefinition( id ) )
        {
            return this.getObjectDefinition(id).lazyInit ;
        }
        else
        {
            return false ;
        }
    }},
    isSingleton : { value : function( id )
    {
        if ( this.hasObjectDefinition( id ) )
        {
            return this.getObjectDefinition(id).singleton ;
        }
        else
        {
            return false ;
        }
    }},
    removeSingleton : { value : function( id )
    {
        if ( this.isSingleton(id) && this._singletons.has(id) )
        {
            this.invokeDestroyMethod( id ) ;
            this._singletons.delete( id ) ;
        }
    }},
    run : { value : function( ...args )
    {
        if ( this.running )
        {
            return ;
        }
        this.notifyStarted() ;
        if ( args.length > 0 && (args[0] instanceof Array) )
        {
            this.objects = args[0] ;
        }
        if ( this.bufferSingletons === null )
        {
            this.bufferSingletons = [] ;
        }
        if ( (this.objects instanceof Array) && this.objects.length > 0)
        {
            while ( this.objects.length > 0 )
            {
                let init = this.objects.shift();
                if ( init !== null )
                {
                    let definition = createObjectDefinition( init );
                    this.addObjectDefinition( definition ) ;
                    if ( definition.singleton && !definition.lazyInit )
                    {
                        if ( this.hasObjectDefinition( definition.id ) )
                        {
                            this.bufferSingletons.push( String( definition.id ) ) ;
                        }
                    }
                }
                else
                {
                    this.warn( this + " create new object definition failed with a 'null' or 'undefined' object." ) ;
                }
            }
        }
        if ( (this.bufferSingletons instanceof Array) && this.bufferSingletons.length > 0 && !this._config.lazyInit && !this.isLocked() )
        {
            let len = this.bufferSingletons.length;
            for ( let i = 0 ; i < len ; i++ )
            {
                this.getObject( this.bufferSingletons[i] ) ;
            }
            this.bufferSingletons = null ;
        }
        this.notifyFinished() ;
    }},
    warn : { value : function( ...args )
    {
        if ( this.config.useLogger )
        {
            logger$2.warning.apply( logger$2 , args ) ;
        }
    }},
    createArguments : { value : function( args = null , id = null )
    {
        if ( args === null || !(args instanceof Array) || args.length === 0 )
        {
            return null ;
        }
        let stack = [];
        let len = args.length;
        for ( let i = 0 ; i < len ; i++ )
        {
            let item = args[i];
            if( item instanceof ObjectArgument )
            {
                let value = item.value;
                try
                {
                    let alert = null;
                    if ( item.policy === ObjectAttribute.CALLBACK )
                    {
                        let callback = value;
                        if( value instanceof String || typeof(value) === 'string' )
                        {
                            callback = this._config.referenceEvaluator.eval( value ) ;
                        }
                        if( callback instanceof Function )
                        {
                            if( item.scope )
                            {
                                if( item.args instanceof Array )
                                {
                                    callback = value.bind.apply( item.scope , [item.scope].concat( this.createArguments( item.args , id ) ) ) ;
                                }
                                else
                                {
                                    callback = value.bind( item.scope ) ;
                                }
                            }
                            value = callback  ;
                        }
                        else
                        {
                            alert = ObjectAttribute.CALLBACK ;
                            value = null ;
                        }
                    }
                    if ( item.policy === ObjectAttribute.REFERENCE )
                    {
                        value = this._config.referenceEvaluator.eval( value ) ;
                        if( value === null )
                        {
                            alert = ObjectAttribute.FACTORY ;
                        }
                    }
                    else if ( item.policy === ObjectAttribute.CONFIG )
                    {
                        value = this._config.configEvaluator.eval( value ) ;
                        if( value === null )
                        {
                            alert = ObjectAttribute.LOCALE ;
                        }
                    }
                    else if ( item.policy === ObjectAttribute.LOCALE )
                    {
                        value = this._config.localeEvaluator.eval( value ) ;
                        if( value === null )
                        {
                            alert = ObjectAttribute.LOCALE ;
                        }
                    }
                    if( alert !== null )
                    {
                        this.warn( this + " createArguments failed at the index '" + i + "' and return a 'null' " + alert + " reference, see the object definition with the id : " + id ) ;
                    }
                    if ( item.evaluators !== null && item.evaluators.length > 0 )
                    {
                        value = this.eval( value , item.evaluators  ) ;
                    }
                    stack.push( value ) ;
                }
                catch( er )
                {
                    this.warn( this + " createArguments failed in the object definition with the id : " + id + ", " + er.toString() ) ;
                }
            }
        }
        return stack ;
    }},
    createObjectWithStrategy : { value : function( strategy , id = null )
    {
        if ( !(strategy instanceof ObjectStrategy) )
        {
            return null ;
        }
        let name = strategy.name;
        let instance = null;
        let object;
        let ref;
        if ( strategy instanceof ObjectMethod )
        {
            if ( strategy instanceof ObjectStaticFactoryMethod )
            {
                object = strategy.type ;
                if( object instanceof String || typeof(object) === 'string' )
                {
                    object = this.config.typeEvaluator.eval( object ) ;
                }
                if ( object && name && (name in object) && (object[name] instanceof Function) )
                {
                    instance = object[name].apply( object , this.createArguments( strategy.args , id ) ) ;
                }
            }
            else if ( strategy instanceof ObjectFactoryMethod )
            {
                ref = this.getObject( strategy.factory ) ;
                if ( ref && name && (name in ref) && (ref[name] instanceof Function) )
                {
                    instance = ref[name].apply( ref , this.createArguments( strategy.args , id ) ) ;
                }
            }
        }
        else if ( strategy instanceof ObjectProperty )
        {
            if ( strategy instanceof ObjectStaticFactoryProperty )
            {
                object = strategy.type ;
                if( object instanceof String || typeof(object) === 'string' )
                {
                    object = this.config.typeEvaluator.eval( object ) ;
                }
                if ( object && name && (name in object) )
                {
                    instance = object[name] ;
                }
            }
            else if ( strategy instanceof ObjectFactoryProperty )
            {
                ref = this.getObject( strategy.factory ) ;
                if ( ref && name && (name in ref) )
                {
                    instance = ref[name] ;
                }
            }
        }
        else if ( strategy instanceof ObjectValue )
        {
            instance = strategy.value ;
        }
        else if ( strategy instanceof ObjectReference )
        {
            instance = this._config.referenceEvaluator.eval( strategy.ref ) ;
        }
        return instance ;
    }},
    dependsOn : { value : function( definition )
    {
        if ( (definition instanceof ObjectDefinition) && (definition.dependsOn instanceof Array) && (definition.dependsOn.length > 0 ) )
        {
            let id;
            let len = definition.dependsOn.length;
            for ( let i = 0 ; i<len ; i++ )
            {
                id = definition.dependsOn[i] ;
                if ( this.hasObjectDefinition(id) )
                {
                    this.getObject(id) ;
                }
            }
        }
    }} ,
    eval : { value : function( value , evaluators = null )
    {
        if ( !(evaluators instanceof Array) || (evaluators.length === 0) )
        {
            return value ;
        }
        this._evaluator.clear() ;
        let o;
        let s = evaluators.length;
        let a = [];
        for ( let i = 0 ; i < s ; i++ )
        {
            o = evaluators[i] ;
            if ( o === null )
            {
                continue ;
            }
            if ( o instanceof String || typeof(o) === 'string' )
            {
                o = this.getObject( o ) ;
            }
            if ( o instanceof Evaluable )
            {
                a.push( o ) ;
            }
        }
        if ( a.length > 0 )
        {
            this._evaluator.add( a ) ;
            value = this._evaluator.eval( value ) ;
            this._evaluator.clear() ;
        }
        return value ;
    }},
    generates : { value : function( definition )
    {
        if ( (definition instanceof ObjectDefinition) && ( definition.generates instanceof Array ) )
        {
            let ar = definition.generates;
            let len = ar.length;
            if ( len > 0 )
            {
                for ( let i = 0 ; i<len ; i++ )
                {
                   let id = ar[i];
                   if ( this.hasObjectDefinition(id) )
                   {
                       this.getObject(id) ;
                   }
                }
            }
        }
    }},
    invokeDestroyMethod : { value : function( id )
    {
        if( this.hasObjectDefinition(id) && this._singletons.has(id) )
        {
            let definition = this.getObjectDefinition(id);
            let o = this._singletons.get(id);
            let name = definition.destroyMethodName || null;
            if ( name === null && this.config !== null )
            {
                name = this.config.defaultDestroyMethod ;
            }
            if( name && (name in o) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},
    invokeInitMethod : { value : function( o , definition = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            let name = definition.initMethodName || null;
            if ( (name === null) && this.config )
            {
                name = this.config.defaultInitMethod || null ;
            }
            if( name && (name in o) && (o[name] instanceof Function) )
            {
                o[name].call(o) ;
            }
        }
    }},
    populateIdentifiable : { value : function( o , definition = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            if ( definition.singleton && isIdentifiable(o) )
            {
                if ( ( definition.identify === true ) || ( this.config.identify === true && definition.identify !== false ) )
                {
                    o.id = definition.id ;
                }
            }
        }
    }},
    populateProperties : { value : function( o , definition                      = null )
    {
        if( definition && (definition instanceof ObjectDefinition) )
        {
            let properties = definition.properties;
            if ( properties && (properties instanceof Array) && properties.length > 0 )
            {
                let id  = definition.id;
                let len = properties.length;
                for( let i = 0 ; i < len ; i++ )
                {
                    this.populateProperty( o , properties[i] , id ) ;
                }
            }
        }
    }},
    populateProperty : { value : function( o , prop , id )
    {
        if ( o === null )
        {
            this.warn( this + " populate a new property failed, the object not must be 'null' or 'undefined', see the factory with the object definition '" + id + "'." ) ;
            return ;
        }
        let name  = prop.name;
        let value = prop.value;
        if( name === MagicReference.INIT )
        {
            if ( (prop.policy === ObjectAttribute.REFERENCE) && (value instanceof String || typeof(value) === 'string' ))
            {
                value = this._config.referenceEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.CONFIG )
            {
                value = this.config.configEvaluator.eval( value ) ;
            }
            else if ( prop.policy === ObjectAttribute.LOCALE )
            {
                value = this.config.localeEvaluator.eval( value) ;
            }
            if ( prop.evaluators && prop.evaluators.length > 0 )
            {
                value = this.eval( value , prop.evaluators ) ;
            }
            if ( value )
            {
                for( var member in value )
                {
                    if( member in o )
                    {
                        o[member] = value[member] ;
                    }
                    else
                    {
                        this.warn( this + " populateProperty failed with the magic #init name, the " + member + " attribute is not declared on the object with the object definition '" + id + "'." ) ;
                    }
                }
            }
            else
            {
                this.warn( this + " populate a new property failed with the magic #init name, the object to enumerate not must be null, see the factory with the object definition '" + id + "'." ) ;
            }
            return ;
        }
        if ( !( name in o ) )
        {
            this.warn( this + " populate a new property failed with the " + name + " attribute, this property is not registered in the object, see the object definition '" + id + "'." ) ;
            return ;
        }
        try
        {
            if ( prop.policy === ObjectAttribute.CALLBACK )
            {
                if( value instanceof String || typeof(value) === 'string' )
                {
                    value = this._config.referenceEvaluator.eval( value ) ;
                    if( value === null )
                    {
                        this.warn( this + " populateProperty with the name '" + name + "' return a null callback reference, see the object definition with the id : " + id ) ;
                    }
                }
                if( value instanceof Function )
                {
                    if( prop.scope )
                    {
                        if( prop.args instanceof Array )
                        {
                            value = value.bind.apply( prop.scope , [prop.scope].concat( this.createArguments( prop.args , id ) ) ) ;
                        }
                        else
                        {
                            value = value.bind( prop.scope ) ;
                        }
                    }
                    value = value  ;
                }
                else
                {
                    value = null ;
                }
            }
            else if( prop.policy === ObjectAttribute.REFERENCE )
            {
                value = this._config.referenceEvaluator.eval( value ) ;
                if( value === null )
                {
                    this.warn( this + " populateProperty with the name '" + name + "' return a 'null' factory reference, see the object definition with the id : " + id ) ;
                }
            }
            else if( prop.policy === ObjectAttribute.CONFIG )
            {
                value = this.config.configEvaluator.eval( value ) ;
                if( value === null )
                {
                    this.warn( this + " populateProperty with the name '" + name + "' return a 'null' config reference, see the object definition with the id : " + id ) ;
                }
            }
            else if( prop.policy === ObjectAttribute.LOCALE )
            {
                value = this.config.localeEvaluator.eval( value ) ;
                if( value === null )
                {
                    this.warn( this + " populateProperty with the name '" + name + "' return a null locale reference, see the object definition with the id : " + id ) ;
                }
            }
            else if( o[name] instanceof Function )
            {
                if( prop.policy === ObjectAttribute.ARGUMENTS )
                {
                    o[name].apply( o , this.createArguments( value , id ) ) ;
                    return ;
                }
                else
                {
                    o[name]() ;
                    return ;
                }
            }
            if ( prop.evaluators && prop.evaluators.length > 0 )
            {
                value = this.eval( value , prop.evaluators ) ;
            }
            o[ name ] = value ;
        }
        catch( e )
        {
            this.warn( this + " populateProperty failed with the name '" + name + ", see the object definition '" + id + "', error: " + e.toString() ) ;
        }
    }},
    registerListeners : { value : function( o , listeners )
    {
        if ( o === null || listeners === null || !(listeners instanceof Array) )
        {
            return ;
        }
        let len = listeners.length;
        if ( len > 0 )
        {
            for ( let i = 0 ; i<len ; i++ )
            {
                try
                {
                    let entry = listeners[i];
                    let dispatcher = this._config.referenceEvaluator.eval( entry.dispatcher );
                    if( dispatcher && entry.type !== null )
                    {
                        let listener;
                        if ( dispatcher instanceof IEventDispatcher )
                        {
                            if ( entry.method && (entry.method in o) && (o[entry.method] instanceof Function))
                            {
                                listener = o[entry.method].bind(o) ;
                            }
                            else if( o instanceof EventListener )
                            {
                                listener = o ;
                            }
                            dispatcher.addEventListener( entry.type , listener , entry.useCapture , entry.priority ) ;
                        }
                        else if ( ("addEventListener" in dispatcher) && (dispatcher.addEventListener instanceof Function) )
                        {
                            if ( entry.method && (entry.method in o) && (o[entry.method] instanceof Function))
                            {
                                listener = o[entry.method].bind(o) ;
                            }
                            else if( o instanceof EventListener )
                            {
                                listener = o.handleEvent.bind(o) ;
                            }
                            dispatcher.addEventListener( entry.type , listener , entry.useCapture ) ;
                        }
                    }
                }
                catch( e )
                {
                    this.warn( this + " registerListeners failed with the target '" + o + "' , in the collection of this listeners at {" + i + "} : " + e.toString() ) ;
                }
            }
        }
    }},
    registerReceivers : { value : function( o , receivers  = null )
    {
        if ( !(receivers instanceof Array) || (receivers.length === 0) )
        {
            return ;
        }
        let len = receivers.length;
        for( let i = 0 ; i<len ; i++ )
        {
            try
            {
                let receiver = receivers[i];
                let signaler = this._config.referenceEvaluator.eval( receiver.signal );
                let slot     = null;
                if ( signaler instanceof Signaler )
                {
                    if ( (receiver.slot instanceof String || typeof(receiver.slot) === 'string') && (receiver.slot in o) && ( o[receiver.slot] instanceof Function ) )
                    {
                        slot = o[receiver.slot] ;
                    }
                    else if ( o instanceof Receiver )
                    {
                        slot = o ;
                    }
                    if ( (slot instanceof Receiver) || (slot instanceof Function) )
                    {
                        signaler.connect( slot , receiver.priority, receiver.autoDisconnect ) ;
                    }
                }
            }
            catch( e )
            {
                this.warn( this + " registerReceivers failed with the target '" + o + "' , in the collection of this receivers at {" + i + "} : " + e.toString() ) ;
            }
        }
    }}
}) ;

function Call ( func = null , scope = null )
{
    Action.call( this ) ;
    Object.defineProperties( this ,
    {
        func : { value : func instanceof Function ? func : null , writable : true } ,
        scope : { value : scope , writable : true }
    }) ;
}
Call.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : Call },
    clone : { writable : true , value : function()
    {
        return new Call( this.func , this.scope ) ;
    }},
    run : { writable : true , value : function( ...args )
    {
        this.notifyStarted() ;
        if( this.func instanceof Function )
        {
            if( args && args.length > 0 )
            {
                this.func.apply( this.scope , args ) ;
            }
            else
            {
                this.func.call( this.scope ) ;
            }
        }
        else
        {
            throw new TypeError( '[Call] run failed, the \'func\' property must be a Function.' ) ;
        }
        this.notifyFinished() ;
    }}
});

function StateTask( state = null , factory = null )
{
    Object.defineProperties( this ,
    {
        factory : { writable : true , value : factory } ,
        state : { writable : true , value : state }
    });
    Task.call( this ) ;
}
StateTask.prototype = Object.create( Task.prototype ,
{
    constructor : { writable : true , value : StateTask }
}) ;

function View( init = null )
{
    Object.defineProperties( this ,
    {
        _closeAfter  : { writable : true , value : null } ,
        _closeBefore : { writable : true , value : null } ,
        _openAfter   : { writable : true , value : null } ,
        _openBefore  : { writable : true , value : null }
    });
    ValueObject.call( this , init ) ;
}
View.prototype = Object.create( ValueObject.prototype ,
{
    constructor : { value : View , writable : true } ,
    closeAfter :
    {
        get : function() { return this._closeAfter ; },
        set : function( action ) { this._closeAfter = action instanceof Action ? action : null ; }
    },
    closeBefore :
    {
        get : function() { return this._closeBefore ; },
        set : function( action ) { this._closeBefore = action instanceof Action ? action : null ; }
    },
    openAfter :
    {
        get : function() { return this._openAfter ; },
        set : function( action ) { this._openAfter = (action instanceof Action) ? action : null ; }
    },
    openBefore :
    {
        get : function() { return this._openBefore ; },
        set : function( action ) { this._openBefore = action instanceof Action ? action : null ; }
    },
    attach : { writable : true , value : function ()
    {
    }},
    close : { writable : true , value : function ()
    {
    }},
    detach : { writable : true , value : function ()
    {
    }},
    dispose : { writable : true , value : function ()
    {
    }},
    initialize : { writable : true , value :function ()
    {
    }},
    open : { writable : true , value : function ()
    {
    }},
    update : { writable : true , value :function ()
    {
    }}
}) ;

function CloseState( state = null , factory = null )
{
    StateTask.call( this , state , factory ) ;
    Object.defineProperties( this ,
    {
        _chain : { value : new Chain() }
    });
    this._chain.mode = TaskGroup.TRANSIENT ;
    this._chain.finishIt.connect( this.notifyFinished.bind(this) ) ;
}
CloseState.prototype = Object.create( StateTask.prototype ,
{
    constructor : { writable : true , value : CloseState } ,
    run : { value : function( )
    {
        logger$1.debug( this + " run " + this.state ) ;
        this.notifyStarted() ;
        if ( !(this.state instanceof State) )
        {
            logger$1.warning(this + " failed, the State reference of this process not must be 'null'.") ;
            this.notifyFinished() ;
            return ;
        }
        let view = this.state.view;
        if ( view instanceof String || (typeof(view) === 'string') && (this.factory instanceof ObjectFactory) )
        {
            view = this.factory.getObject( view ) ;
        }
        else
        {
            logger$1.warning( this + " run failed, the display of the state:" + this.state + " isn't register in the ioc factory with the view id : " + view ) ;
        }
        if ( view instanceof View )
        {
            if ( view.closeBefore )
            {
                this._chain.add( view.closeBefore ) ;
            }
            this._chain.add( new Call( view.close , view ) ) ;
            if ( view.closeAfter )
            {
                this._chain.add( view.closeAfter ) ;
            }
        }
        else
        {
            logger$1.warning( this + " failed, we can't find no View with the State : " + this.state ) ;
        }
        if ( ( this._chain.length > 0 ) && !this._chain.running )
        {
            this._chain.run() ;
        }
        else
        {
            this.notifyFinished() ;
        }
    }}
}) ;

function BeforeChangeState( chain = null , factory = null )
{
    Object.defineProperties( this ,
    {
        chain : { writable : true , value : chain instanceof Chain ? chain : null } ,
        factory : { writable : true , value : factory }
    });
}
BeforeChangeState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : BeforeChangeState } ,
    receive : { value : function ( state , model )
    {
        logger$1.info( this + " receive " + state ) ;
        if ( this.chain && state )
        {
            this.chain.add( new CloseState( state , this.factory ) , 0 , true ) ;
            if( model && model.current === null && !this.chain.running )
            {
                this.chain.run() ;
            }
        }
        else
        {
            logger$1.warning( this + " failed with the state:" + state + " and the chain:" + this.chain ) ;
        }
    }}
});

function OpenState( state = null , factory = null )
{
    Object.defineProperties( this ,
    {
        _chain : { value : new Chain() }
    });
    StateTask.call( this , state , factory ) ;
    this._chain.mode = TaskGroup.TRANSIENT ;
    this._chain.finishIt.connect( this.notifyFinished.bind(this) ) ;
}
OpenState.prototype = Object.create( StateTask.prototype ,
{
    constructor : { writable : true , value : OpenState } ,
    run : { value : function( )
    {
        logger$1.debug( this + " run " + this.state ) ;
        this.notifyStarted() ;
        if ( !(this.state instanceof State) )
        {
            logger$1.warning(this + " failed, the State reference of this process not must be 'null'.") ;
            this.notifyFinished() ;
            return ;
        }
        let view = this.state.view;
        if ( view instanceof String || (typeof(view) === 'string') && (this.factory instanceof ObjectFactory) )
        {
            view = this.factory.getObject( view ) ;
        }
        else
        {
            logger$1.warning( this + " run failed, the display of the state:" + this.state + " isn't register in the ioc factory with the view id : " + view  ) ;
        }
        if ( view instanceof View )
        {
            if ( view.openBefore )
            {
                this._chain.add( view.openBefore ) ;
            }
            this._chain.add( new Call( view.open , view ) ) ;
            if ( view.openAfter )
            {
                this._chain.add( view.openAfter ) ;
            }
        }
        else
        {
            logger$1.warning( this + " failed, we can't find no View in the State : " + this.state ) ;
        }
        if ( ( this._chain.length > 0 ) && !this._chain.running )
        {
            this._chain.run() ;
        }
        else
        {
            this.notifyFinished() ;
        }
    }}
}) ;

function ChangeState( chain = null , factory = null )
{
    Object.defineProperties( this ,
    {
        chain : { writable : true , value : (chain instanceof Chain) ? chain : null } ,
        factory : { writable : true , value : factory }
    });
}
ChangeState.prototype = Object.create( Receiver.prototype ,
{
    constructor : { value : ChangeState } ,
    receive : { value : function ( state )
    {
        logger$1.info( this + " receive " + state ) ;
        if ( this.chain && state )
        {
            this.chain.add( new OpenState( state , this.factory ) , 0 , true ) ;
            if( !this.chain.running )
            {
                this.chain.run() ;
            }
        }
        else
        {
            logger$1.warning( this + " failed with the state:" + state + " and the chain:" + this.chain ) ;
        }
    }}
});

function Model()
{
    Lockable.call( this );
}
Model.prototype = Object.create( Lockable.prototype ,
{
    constructor : { writable : true , value : Model } ,
    supports : { writable : true , value : function( value )
    {
        return value === value ;
    }} ,
    toString : { writable : true , value : function()
    {
        return '[' + this.constructor.name + ']' ;
    }},
    validate : { writable : true , value : function ( value )
    {
        if ( !this.supports( value ) )
        {
            throw new Error( this + " validate(" + value + ") is mismatch." ) ;
        }
    }}
}) ;

function ChangeModel()
{
    Model.call( this );
    Object.defineProperties( this ,
    {
        beforeChanged : { value : new Signal() } ,
        changed : { value : new Signal() } ,
        cleared : { value : new Signal() } ,
        security : { value : true , writable : true } ,
        _current : { value : null , writable : true }
    });
}
ChangeModel.prototype = Object.create( Model.prototype ,
{
    constructor : { writable : true , value : ChangeModel } ,
    current :
    {
        get : function()
        {
            return this._current ;
        },
        set : function( o )
        {
            if ( o === this._current && this.security )
            {
                return ;
            }
            if( o )
            {
                this.validate( o ) ;
            }
            if ( this._current )
            {
                this.notifyBeforeChange( this._current ) ;
            }
            this._current = o ;
            if( this._current )
            {
                this.notifyChange( this._current );
            }
        }
    },
    clear : { writable : true , value : function()
    {
        this._current = null;
        this.notifyClear() ;
    }},
    notifyBeforeChange : { value : function( value )
    {
        if ( !this.isLocked() )
        {
            this.beforeChanged.emit( value , this ) ;
        }
    }},
    notifyChange : { value : function( value )
    {
        if ( !this.isLocked() )
        {
            this.changed.emit( value , this ) ;
        }
    }},
    notifyClear : { value : function()
    {
        if ( !this.isLocked() )
        {
            this.cleared.emit( this ) ;
        }
    }}
}) ;

function MapModel( factory = null , key = "id" )
{
    ChangeModel.call( this ) ;
    Object.defineProperties( this ,
    {
        added : { value : new Signal() } ,
        removed : { value : new Signal() } ,
        updated : { value : new Signal() } ,
        _map : { writable : true , value : (factory instanceof KeyValuePair) ? factory : new ArrayMap() } ,
        _primaryKey :
        {
            value    : ( !(key instanceof String || typeof(key) === 'string') || key === "" ) ? MapModel.DEFAULT_PRIMARY_KEY : key ,
            writable : true
        }
    });
}
Object.defineProperty( MapModel , 'DEFAULT_PRIMARY_KEY' , { value : "id" } ) ;
MapModel.prototype = Object.create( ChangeModel.prototype ,
{
    constructor : { writable : true , value : MapModel } ,
    length : { get : function() { return this._map.length ; } },
    primaryKey :
    {
        get : function()
        {
            return this._primaryKey ;
        },
        set : function( key )
        {
            if( key === this._primaryKey )
            {
                return ;
            }
            this._primaryKey = ( !(key instanceof String || typeof(key) === 'string') || key === "" ) ? MapModel.DEFAULT_PRIMARY_KEY : key ;
            if ( this._map.length > 0 )
            {
                this._map.clear() ;
            }
        }
    },
    add : { value : function ( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " add method failed, the passed-in argument not must be 'null'.") ;
        }
        this.validate( entry ) ;
        if ( this._primaryKey in entry )
        {
            if ( !this._map.has( entry[ this._primaryKey ] ) )
            {
                this._map.set( entry[this._primaryKey] , entry ) ;
                this.notifyAdd( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " add method failed, the passed-in entry is already register in the model with the specified primary key, you must remove this entry before add a new entry.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " add method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},
    clear : { value : function()
    {
        this._map.clear() ;
        ChangeModel.prototype.clear.call(this) ;
    }},
    get : { value : function( key )
    {
        return this._map.get( key );
    }},
    getByProperty : { value : function( propName , value )
    {
        if ( propName === null || !(propName instanceof String || typeof(propName) === 'string') )
        {
            return null ;
        }
        var datas = this._map.values();
        var size  = datas.length;
        try
        {
            if (size > 0)
            {
                while ( --size > -1 )
                {
                    if ( datas[size][propName] === value )
                    {
                        return datas[size] ;
                    }
                }
            }
        }
        catch( er )
        {
        }
        return null ;
    }},
    has : { value : function( entry )
    {
        return this._map.hasValue( entry ) ;
    }},
    hasByProperty : { value : function( propName , value )
    {
        if ( propName === null || !(propName instanceof String || typeof(propName) === 'string') )
        {
            return false ;
        }
        var datas = this._map.values();
        var size  = datas.length;
        if (size > 0)
        {
            while ( --size > -1 )
            {
                if ( datas[size][propName] === value )
                {
                    return true ;
                }
            }
        }
        return false ;
    }},
    hasKey : { value : function( key )
    {
        return this._map.has( key ) ;
    }},
    isEmpty : { value : function()
    {
        return this._map.isEmpty() ;
    }},
    iterator : { value : function()
    {
        return this._map.iterator() ;
    }},
    keyIterator : { value : function()
    {
        return this._map.keyIterator() ;
    }},
    notifyAdd : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.added.emit( entry , this ) ;
        }
    }},
    notifyRemove : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.removed.emit( entry , this ) ;
        }
    }},
    notifyUpdate : { value : function( entry )
    {
        if ( !this.isLocked() )
        {
            this.updated.emit( entry , this ) ;
        }
    }},
    remove : { value : function( entry )
    {
        if ( entry === null || entry === undefined )
        {
            throw new ReferenceError( this + " remove method failed, the entry passed in argument not must be null.") ;
        }
        if ( this._primaryKey in entry )
        {
            if ( this._map.has( entry[this._primaryKey] ) )
            {
                this._map.delete( entry[this._primaryKey] ) ;
                this.notifyRemove( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " remove method failed, no entry register in the model with the specified primary key.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " remove method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},
    setMap : { value : function( map )
    {
        this._map = (map instanceof KeyValuePair) ? map : new ArrayMap() ;
    }},
    update : { value : function( entry )
    {
        if ( this._primaryKey in entry )
        {
            if ( this._map.has( entry[this._primaryKey] ) )
            {
                this._map.set( entry[this._primaryKey] , entry ) ;
                this.notifyUpdate( entry ) ;
            }
            else
            {
                throw new ReferenceError( this + " update method failed, no entry register in the model with the specified primary key.") ;
            }
        }
        else
        {
            throw new ReferenceError( this + " update method failed, the entry is not identifiable and don't contains a primary key with the name '" + this._primaryKey + "'.") ;
        }
    }},
    toMap : { value : function()
    {
        return this._map ;
    }}
}) ;

function InitMapModel ( model = null , datas = null  , autoClear = false , autoSelect = false , autoDequeue = false , cleanFirst = false )
{
    Action.call( this ) ;
    Object.defineProperties( this ,
    {
        autoClear : { value : autoClear === true , writable : true } ,
        autoDequeue : { value : autoDequeue === true , writable : true } ,
        autoSelect : { value : autoSelect === true , writable : true } ,
        cleanFirst : { value : cleanFirst === true , writable : true } ,
        datas : { value : (datas instanceof Array) ? datas : null , writable : true } ,
        first : { value : null , writable : true } ,
        model : { value : (model instanceof MapModel) ? model : null , writable : true }
    }) ;
}
InitMapModel.prototype = Object.create( Action.prototype ,
{
    constructor : { writable : true , value : InitMapModel },
    clone : { writable : true , value : function()
    {
        return new InitMapModel( this.models , this.datas , this.autoClear , this.autoSelect , this.autoDequeue , this.cleanFirst ) ;
    }},
    filterEntry : { writable : true , value : function( value )
    {
        return value ;
    }},
    reset : { writable : true , value : function()
    {
        this.datas = null ;
    }},
    run : { writable : true , value : function( ...args )
    {
        this.notifyStarted() ;
        if( !(this.model instanceof MapModel) )
        {
            this.notifyFinished() ;
            return ;
        }
        if( (this.autoClear === true) && !(this.model.isEmpty()) )
        {
            this.model.clear() ;
        }
        if ( args.length > 0 )
        {
            this.datas = args[0] instanceof Array ? args[0] : null ;
        }
        if( !(this.datas instanceof Array) || this.datas.length === 0 )
        {
            this.notifyFinished() ;
            return ;
        }
        let entry;
        let size = this.datas.length;
        for( let i = 0 ; i < size ; i++ )
        {
            entry = this.filterEntry( this.datas[i] ) ;
            this.model.add( entry ) ;
            if ( this.first === null && entry !== null )
            {
                this.first = entry ;
            }
        }
        if( this.datas && (this.datas instanceof Array) && (this.autoDequeue === true) )
        {
            this.datas.length = 0 ;
        }
        if ( this.first !== null && (this.autoSelect === true) )
        {
            if ( this.model.has( this.first ) )
            {
                this.model.current = this.model.get( this.first ) ;
            }
            else
            {
                this.model.current = this.first ;
            }
            if ( this.cleanFirst === true )
            {
                this.first = null ;
            }
        }
        this.notifyFinished() ;
    }}
});

function InitStates( model = null , datas = null  , autoClear = false , autoSelect = false , autoDequeue = false , cleanFirst = false )
{
    InitMapModel.call( this , model , datas , autoClear , autoSelect , autoDequeue , cleanFirst ) ;
}
InitStates.prototype = Object.create( InitMapModel.prototype ,
{
    constructor : { writable : true , value : InitStates } ,
    filterEntry : { value : function ( value )
    {
        return (value instanceof State) ? value : null ;
    }}
}) ;

function StateModel()
{
    MapModel.call( this ) ;
}
StateModel.prototype = Object.create( MapModel.prototype ,
{
    constructor : { writable : true , value : StateModel } ,
    supports : { writable : true , value : function( value )
    {
        return value instanceof State ;
    }}
}) ;

var states$1 = [{
    id: "body_states_model",
    type: StateModel,
    dependsOn: ["body_states_add", "body_states_before_change", "body_states_change"],
    singleton: true,
    lazyInit: true,
    properties: [{ name: "security", value: false }]
}, {
    id: "body_states_init",
    type: InitStates,
    properties: [{ name: "autoDequeue", value: true }, { name: "datas", config: "states" }, { name: "model", ref: "body_states_model" }]
}, {
    id: "body_states_add",
    type: AddState,
    receivers: [{ signal: "body_states_model.added" }]
}, {
    id: "body_states_before_change",
    type: BeforeChangeState,
    receivers: [{ signal: "body_states_model.beforeChanged" }],
    args: [{ ref: "states_chain" }, { ref: "#this" }]
}, {
    id: "body_states_change",
    type: ChangeState,
    receivers: [{ signal: "body_states_model.changed" }],
    args: [{ ref: "states_chain" }, { ref: "#this" }]
}];

var models = [].concat(states$1);

function SceneView() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    Object.defineProperties(this, {
        container: { writable: true, value: null },
        scene: { writable: true, value: null }
    });
    View.call(this, init);
}
SceneView.prototype = Object.create(View.prototype, {
    constructor: { value: SceneView, writable: true },
    close: { writable: true, value: function value() {
            try {
                if (!this.scene) {
                    throw new Error('scene');
                }
                if (!this.container) {
                    throw new Error('container');
                }
            } catch (er) {
                logger.warning(fastformat(this + " close failed, the {0} reference not must be null.", er.message));
                return;
            }
            logger.debug(this + " close");
            if (this.scene.contains(this.container)) {
                this.scene.removeChild(this.container);
            }
        } },
    open: { writable: true, value: function value() {
            try {
                if (!this.scene) {
                    throw new Error('scene');
                }
                if (!this.container) {
                    throw new Error('container');
                }
            } catch (er) {
                logger.warning(fastformat(this + " open failed, the {0} reference not must be null.", er.message));
                return;
            }
            logger.debug(this + " open");
            if (!this.scene.contains(this.container)) {
                this.scene.addChild(this.container);
            }
        } }
});

function Text( init = null )
{
    AEntity.call( this , init , 'a-text' ) ;
}
Text.prototype = Object.create( AEntity.prototype ,
{
    constructor : { value : Text , writable : true } ,
    align :
    {
        get : function() { return this.getAttribute( 'align' ) ; },
        set : function( value ) { this.setAttribute( 'align' , value ) ; }
    },
    alphaTest :
    {
        get : function() { return this.getAttribute( 'alphaTest' ) ; },
        set : function( value ) { this.setAttribute( 'alphaTest' , value ) ; }
    },
    anchor :
    {
        get : function() { return this.getAttribute( 'anchor' ) ; },
        set : function( value ) { this.setAttribute( 'anchor' , value ) ; }
    },
    baseline :
    {
        get : function() { return this.getAttribute( 'baseline' ) ; },
        set : function( value ) { this.setAttribute( 'baseline' , value ) ; }
    },
    color :
    {
        get : function() { return this.getAttribute( 'color' ) ; },
        set : function( value ) { this.setAttribute( 'color' , value ) ; }
    },
    font :
    {
        get : function() { return this.getAttribute( 'font' ) ; },
        set : function( value ) { this.setAttribute( 'font' , value ) ; }
    },
    fontImage :
    {
        get : function() { return this.getAttribute( 'fontImage' ) ; },
        set : function( value ) { this.setAttribute( 'fontImage' , value ) ; }
    },
    height :
    {
        get : function() { return this.getAttribute( 'height' ) ; } ,
        set : function( value ) { this.setAttribute( 'height' , value ) ; }
    },
    letterSpacing :
    {
        get : function() { return this.getAttribute( 'letterSpacing' ) ; } ,
        set : function( value ) { this.setAttribute( 'letterSpacing' , value ) ; }
    },
    letterHeight :
    {
        get : function() { return this.getAttribute( 'letterHeight' ) ; } ,
        set : function( value ) { this.setAttribute( 'letterHeight' , value ) ; }
    },
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },
    tabSize :
    {
        get : function() { return this.getAttribute( 'tabSize' ) ; } ,
        set : function( value ) { this.setAttribute( 'tabSize' , value ) ; }
    },
    value :
    {
        get : function() { return this.getAttribute( 'value' ) ; } ,
        set : function( value ) { this.setAttribute( 'value' , value ) ; }
    },
    whitespace :
    {
        get : function() { return this.getAttribute( 'whitespace' ) ; } ,
        set : function( value ) { this.setAttribute( 'whitespace' , value ) ; }
    },
    width :
    {
        get : function() { return this.getAttribute( 'width' ) ; } ,
        set : function( value ) { this.setAttribute( 'width' , value ) ; }
    },
    wrapCount :
    {
        get : function() { return this.getAttribute( 'wrapCount' ) ; } ,
        set : function( value ) { this.setAttribute( 'wrapCount' , value ) ; }
    },
    wrapPixels :
    {
        get : function() { return this.getAttribute( 'wrapPixels' ) ; } ,
        set : function( value ) { this.setAttribute( 'wrapPixels' , value ) ; }
    },
    zOffset :
    {
        get : function() { return this.getAttribute( 'zOffset' ) ; },
        set : function( value ) { this.setAttribute( 'zOffset' , value ) ; }
    }
}) ;

function Button( init = null )
{
    Object.defineProperties( this ,
    {
        backgroundColor : { writable : true , value : "#00FFFF" } ,
        height : { writable : true , value : 1 } ,
        radius : { writable : true , value : 0 } ,
        width : { writable : true , value : 1 } ,
         _geometry : { writable : true , value : null } ,
         _loaded   : { writable : true , value : null } ,
         _material : { writable : true , value : null } ,
         _mesh     : { writable : true , value : null } ,
         _text     : { writable : true , value : null }
    }) ;
    Material.call( this , init , 'a-entity' ) ;
    this._text = new Text() ;
    this.addChild( this._text ) ;
    this._loaded = this.loaded.bind( this ) ;
    this._element.addEventListener( "loaded" , this._loaded ) ;
}
Button.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Button , writable : true } ,
    align :
    {
        get : function() { return this._text.align ; },
        set : function( value ) { this._text.align = value ; }
    },
    alphaTest :
    {
        get : function() { return this._text.alphaTest ; },
        set : function( value ) { this._text.alphaTest = value ; }
    },
    anchor :
    {
        get : function() { return this._text.anchor ; },
        set : function( value ) { this._text.anchor = value ; }
    },
    baseline :
    {
        get : function() { return this._text.baseline ; },
        set : function( value ) { this._text.baseline = value ; }
    },
    color :
    {
        get : function() { return this._text.color ; },
        set : function( value ) { this._text.color = value ; }
    },
    font :
    {
        get : function() { return this._text.font ; },
        set : function( value ) { this._text.font = value ; }
    },
    fontImage :
    {
        get : function() { return this._text.fontImage ; },
        set : function( value ) { this._text.fontImage = value ; }
    },
    letterSpacing :
    {
        get : function() { return this._text.letterSpacing ; } ,
        set : function( value ) { this._text.letterSpacing = value ; }
    },
    letterHeight :
    {
        get : function() { return this._text.letterHeight ; } ,
        set : function( value ) { this._text.letterHeight = value ; }
    },
    shader :
    {
        get : function() { return this.getAttribute( 'shader' ) ; } ,
        set : function( value ) { this.setAttribute( 'shader' , value ) ; }
    },
    side :
    {
        get : function() { return this.getAttribute( 'side' ) ; } ,
        set : function( value ) { this.setAttribute( 'side' , value ) ; }
    },
    tabSize :
    {
        get : function() { return this._text.tabSize ; } ,
        set : function( value ) { this._text.tabSize = value ; }
    },
    value :
    {
        get : function() { return this._text.value ; } ,
        set : function( value ) { this._text.value = value ; }
    },
    whitespace :
    {
        get : function() { return this._text.whitespace ; } ,
        set : function( value ) { this._text.whitespace = value ; }
    },
    wrapCount :
    {
        get : function() { return this._text.wrapCount ; } ,
        set : function( value ) { this._text.wrapCount = value ; }
    },
    wrapPixels :
    {
        get : function() { return this._text.wrapPixels ; } ,
        set : function( value ) { this._text.wrapPixels = value ; }
    },
    zOffset :
    {
        get : function() { return this._text.zOffset ; },
        set : function( value ) { this._text.zOffset = value ; }
    },
    loaded : { value : function()
    {
        this._element.removeEventListener( 'loaded' , this._loaded ) ;
        this._loaded = null ;
        this.render() ;
    }},
    render : { value : function()
    {
        let h      = this.height;
        let radius = this.radius;
        let w      = this.width;
        let x      = 0;
        let y      = 0;
        let round = new THREE.Shape();
        round.moveTo( x, y + radius );
        round.lineTo( x, y + h - radius );
        round.quadraticCurveTo( x, y + h, x + radius, y + h );
        round.lineTo( x + w - radius, y + h );
        round.quadraticCurveTo( x + w, y + h, x + w, y + h - radius );
        round.lineTo( x + w, y + radius );
        round.quadraticCurveTo( x + w, y, x + w - radius, y );
        round.lineTo( x + radius, y );
        round.quadraticCurveTo( x, y, x, y + radius );
        this._geometry = new THREE.ShapeGeometry( round );
        this._material = new THREE.MeshBasicMaterial( { color : this.backgroundColor ,shading: THREE.FlatShading } ) ;
        this._mesh = new THREE.Mesh( this._geometry , this._material ) ;
        this._mesh.position.x = -(w / 2);
        this._mesh.position.y = -(h / 2);
        this._element.setObject3D( 'mesh' , this._mesh ) ;
        this._geometry = null ;
        this._material = null ;
        this._mesh     = null ;
    }}
}) ;

function SelectState() {
    EventListener.call(this);
    Object.defineProperties(this, {
        current: { writable: true, value: null },
        states: { writable: true, value: null }
    });
}
SelectState.prototype = Object.create(EventListener.prototype, {
    constructor: { value: SelectState, writable: true },
    handleEvent: { value: function value() {
            try {
                if (!this.current) throw new Error('current');
                if (!this.states) throw new Error('states');
            } catch (er) {
                logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
                return;
            }
            if (this.states.current.id !== this.current) {
                this.states.current = this.states.get(this.current);
            }
        } }
});

var home_button = [{
    id: "home_button_back",
    type: Button,
    singleton: true,
    lazyInit: true,
    dependsOn: ["home_button_click"],
    properties: [{ name: "#init", config: "home_button" }, { name: "#init", config: "home_button_back" }]
}, {
    id: "home_button_front",
    type: Button,
    singleton: true,
    lazyInit: true,
    dependsOn: ["home_button_click"],
    properties: [{ name: "#init", config: "home_button" }, { name: "#init", config: "home_button_front" }]
}, {
    id: "home_button_click",
    type: SelectState,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "current", value: StateList.DOLPHINS }, { name: "states", ref: "body_states_model" }],
    listeners: [{ dispatcher: "home_button_back.element", type: "click" }, { dispatcher: "home_button_front.element", type: "click" }]
}];

var home_container = [{
    id: 'home_container',
    type: AEntity,
    singleton: true,
    lazyInit: true,
    properties: [{ name: 'addChild', args: [{ ref: 'home_sound' }] }, { name: 'addChild', args: [{ ref: 'home_title_back' }] }, { name: 'addChild', args: [{ ref: 'home_title_front' }] }, { name: 'addChild', args: [{ ref: 'home_subtitle_back' }] }, { name: 'addChild', args: [{ ref: 'home_subtitle_front' }] }]
}];

function Image( init = null )
{
    Material.call( this , init , 'a-image' ) ;
}
Image.prototype = Object.create( Material.prototype ,
{
    constructor : { value : Image , writable : true } ,
    height :
    {
        get : function() { return this.getAttribute( 'geometry' ).height ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'height' , value ) ; }
    },
    width :
    {
        get : function() { return this.getAttribute( 'geometry' ).width ; } ,
        set : function( value ) { this.setAttribute( 'geometry' , 'width' , value ) ; }
    }
}) ;

var home_image = [{
    id: "home_image_front",
    type: Image,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_image" }, { name: "#init", config: "home_image_front" }]
}, {
    id: "home_image_back",
    type: Image,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_image" }, { name: "#init", config: "home_image_back" }]
}];

function HomeSoundEnded() {
    Receiver.call(this);
    Object.defineProperties(this, {
        sound: { writable: true, value: null }
    });
}
HomeSoundEnded.prototype = Object.create(Receiver.prototype, {
    constructor: { value: HomeSoundEnded, writable: true },
    receive: { value: function value() {
            try {
                if (!this.sound) throw new Error('sound');
            } catch (er) {
                logger.warning(fastformat(this + " run failed, the {0} reference not must be null.", er.message));
                return;
            }
            this.sound.play();
        } }
});

var home_sound = [{
    id: 'home_sound',
    type: Sound,
    singleton: true,
    lazyInit: true,
    generates: ['home_sound_ended'],
    properties: [{ name: '#init', config: 'home_sound' }]
}, {
    id: 'home_sound_ended',
    type: HomeSoundEnded,
    singleton: true,
    lazyInit: true,
    receivers: [{ signal: 'home_sound.finishIt' }],
    properties: [{ name: 'sound', ref: 'home_sound' }]
}];

var home_subtitle = [{
    id: "home_subtitle_front",
    type: Text,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_subtitle" }, { name: "#init", locale: "home_subtitle" }, { name: "#init", config: "home_subtitle_front" }]
}, {
    id: "home_subtitle_back",
    type: Text,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_subtitle" }, { name: "#init", config: "home_subtitle_back" }]
}];

var home_title = [{
    id: "home_title_front",
    type: Text,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_title" }, { name: "#init", locale: "home_title" }, { name: "#init", config: "home_title_front" }]
}, {
    id: "home_title_back",
    type: Text,
    singleton: true,
    lazyInit: true,
    properties: [{ name: "#init", config: "home_title" }, { name: "#init", config: "home_title_back" }]
}];

function HomeOpenAfter() {
    Task.call(this);
    Object.defineProperties(this, {
        image: { writable: true, value: null },
        sky: { writable: true, value: null },
        sound: { writable: true, value: null }
    });
}
HomeOpenAfter.prototype = Object.create(Task.prototype, {
    constructor: { value: HomeOpenAfter, writable: true },
    run: { value: function value() {
            this.notifyStarted();
            try {
                if (!this.sky) throw new Error('sky');
                if (!this.sound) throw new Error('sound');
            } catch (er) {
                logger.warning(fastformat(this + ' run failed, the {0} reference not must be null.', er.message));
                this.notifyFinished();
                return;
            }
            logger.debug(this + ' run');
            this.sky.color = '';
            this.sky.src = './images/image.min.jpg';
            logger.info(this.sound);
            this.sound.play();
            this.notifyFinished();
        } }
});

var home_close = [{
    id: "home_close_after",
    type: HomeOpenAfter,
    properties: [
    ]
}];

var home_open = [{
    id: 'home_open_after',
    type: HomeOpenAfter,
    singleton: true,
    lazyInit: true,
    properties: [{ name: 'image', config: 'home_sky' }, { name: 'sky', ref: 'sky' }, { name: 'sound', ref: 'home_sound' }]
}];

var home_view = [{
    id: 'home_view',
    type: SceneView,
    singleton: true,
    lazyInit: true,
    properties: [{ name: 'openAfter', ref: 'home_open_after' }, { name: 'container', ref: 'home_container' }, { name: 'scene', ref: 'scene' }]
}].concat(
home_button, home_container, home_image, home_sound, home_subtitle, home_title,
home_close, home_open);

var views = [].concat(home_view);

var definitions = [].concat(display, tasks, controllers, models, views);

var i18n = {
    home_title: { value: 'TALE' },
    home_subtitle: { value: 'Each story is a Journey' }
};

var factory = new ObjectFactory();
factory.config.useLogger = true;
factory.config.setConfigTarget(config);
factory.config.setLocaleTarget(i18n);

function Application() {
    Stage.call(this);
}
Application.prototype = Object.create(Stage.prototype, {
    constructor: { value: Application },
    init: { value: function value() {
            if (config.debug) {
                logger.debug(this + " init");
            }
            factory.finishIt.connect(this.ready.bind(this), 0, true);
            factory.run(definitions);
        } },
    ready: { value: function value() {
            if (config.debug) {
                logger.debug(this + " ready");
            }
            factory.getObject("run");
        } }
});

var metas = Object.defineProperties({}, {
    name: { enumerable: true, value: ucFirst('vegas-aframe') },
    description: { enumerable: true, value: "The VEGAS JS + AFrame prototype" },
    version: { enumerable: true, value: '1.0.0' },
    license: { enumerable: true, value: "MPL-1.1 OR GPL-2.0+ OR GPL-3.0+" },
    url: { enumerable: true, value: 'https://github.com/ekameleoon/vegas-aframe' }
});
try {
    if (window) {
        window.addEventListener('load', function load() {
            window.removeEventListener("load", load, false);
            sayHello(metas.name, metas.version, metas.url);
            var application = new Application();
            application.init();
        }, false);
    }
} catch (error) {
    if (console) {
        console.warn(error);
    }
}

exports.metas = metas;
exports.sayHello = sayHello;
exports.skipHello = skipHello;

Object.defineProperty(exports, '__esModule', { value: true });

})));
