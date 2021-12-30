# 2D-raycasting
This is a 2D raycasting visualization built in JavaScript with the p5.js library. Raycasting is a rendering technique that determines the perspective at a given position. A ray is cast at a particiular angle from a source, it calculates the closest intersection to an opaque object. Many perspective games use this technique to render from the character/camera's position what can be seen.

Project inspired by The Coding Train, <https://www.youtube.com/watch?v=TOEi6T2mtHo>

## Raycasting Algorithm
Given two end points of a ray and two end points of a wall, whether a ray and a wall are intersected and their intersection point are determined by the following pseudocode code.

    # (x1, y1) = first end point of the wall
    # (x2, y2) = second end point of the wall
    # (x3, y3) = first end point of the ray
    # (x4, y4) = second end point of the ray
    
    let intersection;
    let intersection_pt;
    let D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);          # Denominator
    let nT = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);         # Numerator of T
    let nU = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);         # Numerator of U
    let t = nT / D; 
    let u = -nU / D;                                                # Determine the value of t and u

    if (t > 0 && t < 1 && u > 0) {                                  # If t is between 0 and 1 & u is larger than 0, two lines are intersected
      intersection = true; 
      intersection_pt = [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];   # Intersection point coordinate is ( x1+t*(x2-x1), y1+t*(y2-y1) )
    } else {
      intersection = false;
      intersection_pts = null;
    }
