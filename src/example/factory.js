"use strict" ;

import { ObjectFactory } from 'system/ioc/ObjectFactory.js' ;

import { config as setting } from './config/config.js' ;
import { i18n   as fr      } from './locale/fr.js' ;

export var factory = new ObjectFactory();

factory.config.useLogger = true ;
factory.config.setConfigTarget( setting );
factory.config.setLocaleTarget( fr );