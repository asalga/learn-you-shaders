// Andor Salga
// March 2014

// Simple Bouncing Ball

// To solve this problem, first think of the problem in 1-dimensions.
// We begin at an inital x position, increment by a certain time.

// Now to figure out what to do when x reaches the edge. 
// If you extend the screen x times, you'll see the animation
// is the same in the 0th,2nd,4,6 screen. That is the ball moves
// from left to right

// The same is true for the 1st,3rd,5th.The ball moves from right to left.

// So when we are at an even 'screen' we just have to use x % width
// This cycles from left to right. Now to solve for when we move right
// to left.

// In those cases, we'll need to start at w then subtract x
// res.x - x

#define res iResolution.xy
#define rad 10.0
#define pixelsPerSecond 300.0

void main(){	
	// pos = initialPos + velocity * time
	vec2 pos = vec2(17, 39) + vec2(iTime * pixelsPerSecond);
	
	// Even or odd 'screen'?
	vec2 screen = floor(mod(pos/res, vec2(2.0)));
	
	// remap 0..1 to -1 to 1 to avoid branching in next line.
	vec2 dir = vec2(screen * vec2(2.0) - vec2(1.0));
			
	vec2 finalPos = vec2(res * (vec2(1.0) - screen) + dir * mod(pos, res));
	
	gl_FragColor = step(distance(finalPos, fragCoord.xy), rad) * vec4(1.);	
}