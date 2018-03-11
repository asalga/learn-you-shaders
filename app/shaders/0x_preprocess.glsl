/*
    Preprocessor

    The Preprocessor in GLSL has syntax similar to the one in C.

    We have the typical directives:
    
    #define
    #undef
    #if
    #ifdef
    #else
    #elif
    #endif
*/

// Any directive without an actual preprocessor can be use, 
// but it will be ignored.
// The following are all valid
#  /* */
#  //
#

// We can define simple macros that just serve to exist their presence
// to test with #if defined or #ifdef
#define DO_TEST

// We can define macros which will be replaced in our shader
#define COLOR vec4(0.0, 0.0, 0.7, 1.0)

// We can also create macros has take arguments
#define NORMALIZE(color) color/255.0

// Any macro with two or more consecutive underscores is reserved
// and will therefore be compiled.
// This line below will break our code
//#define __THIS_WILL_NOT_WORK 42.0

// Also, any macro with GL_ at the start of the macro will not work
// since those are reserved as well.
//#define GL_

// This however is okay
#define _GL_


void main()// out vec4 fragColor, in vec2 fragCoord )
{
    gl_FragColor = COLOR;
    gl_FragColor.b = NORMALIZE(199.);
    

//#undef TEST

// Note the preprocessor is freeform
// This draws a vertical sprite on the left side
# if defined(_GL_) && 1
    if(gl_FragCoord.x < 10.0)
    {
        gl_FragColor = vec4(0, 0, 0, 1);
    }
# endif

    
// We can use conditionals
#ifdef TEST
    gl_FragColor.r = float(__LINE__)/40.;
#endif
}