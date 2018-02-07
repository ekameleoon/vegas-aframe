"use strict" ;

import { Sound } from 'molecule/render/aframe/display/Sound.js' ;

import { HomeSoundEnded } from '../../../../views/home/controllers/HomeSoundEnded.js' ;

export const home_sounds =
[
    {
        id         : "home_sound" ,
        type       : Sound ,
        singleton  : true ,
        lazyInit   : true ,
        generates  : [ "home_sound_ended" ] ,
        properties :
        [
            { name : "#init" , config : "home_sound" }
        ]
    },
    {
        id         : "home_sound_ended" ,
        type       : HomeSoundEnded ,
        singleton  : true ,
        lazyInit   : true ,
        receivers  : [ { signal : "home_sound.finishIt" } ] ,
        properties :
        [
            { name : "sound" , ref : "home_sound2" }
        ]
    }
];
