"use strict" ;

import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync' ;
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license' ;
import minify from 'rollup-plugin-babel-minify';
import path from 'path' ;
import replace from 'rollup-plugin-replace';

import pkg from './package.json' ;

var build = false ;
let mode = 'dev' ;

try
{
    switch( process.env.MODE )
    {
        case 'prod' :
        {
            mode = 'prod' ;
            break ;
        }
        default :
        {
            mode = 'dev' ;
        }
    }
}
catch (e) {}

try
{
    build = !(!process.env.build) ;
}
catch (e) {}

let app   = './src/example/' ;
let vegas = './node_modules/vegas-js/src/' ;
let setting ;

try
{
    setting = require('./user.json') ;
}
catch (e)
{
    setting = require('./config.json') ;
}

let header =
`/**
 * ${setting.header} - version: ${pkg.version}
 */` ;

let libraries =
{
    '@app'     : path.resolve( __dirname, app ) ,
    'core'     : path.resolve( __dirname, vegas + 'core/' ) ,
    'graphics' : path.resolve( __dirname, vegas + 'graphics/' ) ,
    'molecule' : path.resolve( __dirname, vegas + 'molecule/' ) ,
    'polyfill' : path.resolve( __dirname, vegas + 'polyfill/' ) ,
    'screens'  : path.resolve( __dirname, vegas + 'screens/' ) ,
    'system'   : path.resolve( __dirname, vegas + 'system/' ) ,
    '@vegas'   : path.resolve( __dirname, vegas )
};

let metas =
{
    DEBUG       : setting.debug ,
    VERBOSE     : setting.verbose ,
    NAME        : pkg.name ,
    DESCRIPTION : pkg.description ,
    HOMEPAGE    : pkg.homepage ,
    LICENSE     : pkg.license ,
    VERSION     : pkg.version
};

let plugins =
[
    alias( libraries ),
    babel
    ({
        exclude : 'node_modules/**' ,
        babelrc : false ,
        presets : [ [ "env" , { "modules" : false } ] ]
    }),
    replace({ delimiters : [ '<@' , '@>' ] , values : metas }),
    cleanup()
] ;

let file = setting.output + setting.file ;

if( mode === 'prod' )
{
    file += '.min'
    plugins.push( minify( { banner : header }) );
}
else
{
    plugins.push( license( { banner : header } ) ) ;
    if( setting.browserSync && !build )
    {
        plugins.push( browsersync
        ({
            notify    : false ,
            logPrefix : setting.bundle ,
            server    : setting.server ,
            port      : 4000
        })) ;
    }
}

file += '.js' ;

export default
{
    input  : setting.entry ,
    output :
    {
        name   : setting.bundle ,
        file   : file ,
        format : 'umd' ,
        sourcemap : setting.sourcemap && (mode === 'dev') ,
        strict : true
    },
    plugins : plugins ,
    watch   : { exclude : 'node_modules/**' }
};