0. <canvas> is an HTML element which can be used to draw graphics via scripting (usually JavaScript). This can, for instance, be used to draw graphs, combine photos, or create simple (and not so simple) animations


1. First introduced in WebKit by Apple for the OS X Dashboard, <canvas> has since been implemented in browsers. Today, all major browsers support it.


2.A canvas is a rectangular area on an HTML page. By default, a canvas has no border and no content.A new canvas is empty, meaning it is entirely transparent and thus shows up as empty space in the document.
2.1 To add a border, use the style attribute.


3 The <canvas> tag is intended to allow different styles of drawing. To get access to an actual drawing interface, we first need to create a context, an object whose methods provide the drawing interface. There are currently two widely supported drawing styles: "2d" for two-dimensional graphics and "webgl" for three-dimensional graphics through the OpenGL interface.
3.1 After creating the context object, the example draws a red rectangle 100 pixels wide and 50 pixels high, with its top-left corner at coordinates (10,10).

4.In the canvas interface, a shape can be filled, meaning its area is given a certain color or pattern, or it can be stroked, which means a line is drawn along its edge.The fillRect method fills a rectangle. It takes first the x- and y-coordinates of the rectangle’s top-left corner, then its width, and then its height. A similar method, strokeRect, draws the outline of a rectangle.

Neither method takes any further parameters. The color of the fill, thickness of the stroke, and so on, are not determined by an argument to the method (as you might reasonably expect) but rather by properties of the context object.

The fillStyle property controls the way shapes are filled. It can be set to a string that specifies a color, using the color notation used by CSS.

The strokeStyle property works similarly but determines the color used for a stroked line. The width of that line is determined by the lineWidth property, which may contain any positive number.


4.1 Rectangles can be drawn with a single method call. The fillRect and strokeRect methods draw rectangles To create custom shapes, we must first build up a path.


5 Calling beginPath starts a new path. A number of other methods add lines and curves to the current path. For example, lineTo can add a straight line. When a path is finished, it can be filled with the fill method
5.1 or stroked with the stroke method.

5.2 A path may also contain curved lines. These are unfortunately a bit more involved to draw.
The quadraticCurveTo method draws a curve to a given point. To determine the curvature of the line, the method is given a control point as well as a destination point. Imagine this control point as attracting the line, giving it its curve. The line won’t go through the control point, but its direction at the start and end points will be such that a straight line in that direction would point toward the control point. The following example illustrates this:

6. A 2D canvas drawing context provides the methods fillText and strokeText. The latter can be useful for outlining letters, but usually fillText is what you need. It will fill the outline of the given text with the current fillStyle
You can specify the size, style, and font of the text with the font property. This example just gives a font size and family name. It is also possible to add italic or bold to the start of the string to select a style.

7. Moving pixels from an image or another canvas onto our canvas is done with the drawImage method. By default, this method draws the whole source image, but by giving it more parameters, you can copy a specific area of the image. Various images can be tiled, such as the walls in the old tank game.

8 Transformations allow you to draw a shape in multiple orientations. A 2D drawing context has a current transformation that can be changed with the translate, scale, and rotate methods. These will affect all subsequent drawing operations.
8.1 A transformation state can be saved with the save method and restored with the restore method.

9. When showing an animation on a canvas, the clearRect method can be used to clear part of the canvas before redrawing it.