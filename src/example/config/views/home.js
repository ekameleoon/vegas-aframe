"use strict" ;

export var home =
{
    // Audio

    home_audio :
    {
        src    : "url(sounds/home.mp3)" ,
        volume : 1
    },

    // buttons

    home_button :
    {
        align           : 'center' ,
        color           : '#FFFFFF' ,
        backgroundColor : '#ff6666' ,
        radius          : 0.08 ,
        value           : 'Start the experience' ,
        font            : "kelsonsans" ,
        raycasted       : true ,
        width           : 2.5 ,
        height          : 0.3
    },
    home_button_front :
    {
        x : 0 ,
        y : -1 ,
        z : -4
    },
    home_button_back :
    {
        side : 'double' ,
        rotationY : 180 ,
        x : 0 ,
        y : -1 ,
        z : 4
    },

    // images

    home_image :
    {
        width  : 3 ,
        height : 1.5 ,
        src    : "#home_image"
    },
    home_image_front :
    {
        x : 0 ,
        y : 0 ,
        z : -4
    },
    home_image_back :
    {
        side : 'double' ,
        rotationY : 180 ,
        x : 0 ,
        y : 0 ,
        z : 4
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
        font  : "kelsonsans" ,
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
