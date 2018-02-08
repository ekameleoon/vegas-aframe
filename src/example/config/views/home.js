'use strict' ;

export var home =
{
    // assets

    home_sky   : './images/image.min.jpg' ,

    // audio

    home_sound :
    {
        src    : 'url(./sounds/CA01GN02_sound.mp3)' ,
        volume : 1
    },

    // subtitle

    home_subtitle :
    {
        align : 'center' ,
        color : '#FFFFFF'
    },
    home_subtitle_front :
    {
        x : 0 ,
        y : -0.5 ,
        z : -4
    },
    home_subtitle_back :
    {
        side  : 'double' ,
        rotationY : 180 ,
        x : 0 ,
        y : -0.5 ,
        z : 4
    },

    // title

    home_title :
    {
        align : 'center' ,
        color : '#FFFFFF' ,
        font  : 'kelsonsans' ,
    },
    home_title_front :
    {
        x : 0 ,
        y : 0 ,
        z : -2
    },
    home_title_back :
    {
        side  : 'double' ,
        rotationY : 180 ,
        x : 0 ,
        y : 0 ,
        z : 2
    }
};
