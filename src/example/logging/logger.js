"use strict" ;

import { config } from '../config/config.js' ;
import { Log } from 'system/logging/Log.js' ;

import './target.js' ;

export var logger = Log.getLogger( config.name ) ;