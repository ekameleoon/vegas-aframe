"use strict" ;

import { ConsoleTarget } from 'system/logging/targets/ConsoleTarget.js' ;
import { LoggerLevel }   from 'system/logging/LoggerLevel.js' ;

var target = new ConsoleTarget
({
    includeChannel      : true  ,
    includeDate         : false ,
    includeLevel        : true  ,
    includeLines        : true  ,
    includeMilliseconds : true  ,
    includeTime         : true
}) ;

target.filters = ['*'] ;
target.level = LoggerLevel.ALL ;

