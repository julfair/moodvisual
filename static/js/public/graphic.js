var something = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]);

var colorsEnergetic = new Array(
    [63, 229, 251],
    [226, 228, 107],
    [173, 192, 78],
    [252, 70, 107],
)

var colorsFrantic = new Array(
    [251, 63, 63],
    [155, 107, 228],
    [173, 192, 78],
    [252, 70, 107],
)

var colorsSad = new Array(
    [21, 254, 250],
    [11, 31, 119],
    [0, 147, 252],
    [3, 135, 251],
    [106, 101, 171],
    [160, 255, 253],
)

var colorsDepression = new Array(
    [11, 113, 149],
    [6, 6, 6],
    [5, 20, 29],
    [3, 135, 251],
    [17, 29, 41],
    [125, 132, 144],
    [0,0,0],
   
)

var colorsCalm = new Array(
    [72, 107, 8],
    [100, 156, 88],
    [205, 221, 113],
    [179, 211, 197],
    [196, 233, 148],
    
)

var colorsContent = new Array(
    [238, 174, 202],
    [148, 188, 233],
    [112, 152, 196],
    [242, 191, 213],
    
)

var colorsHappy = new Array(
    [255, 155, 155],
    [215, 232, 90],
    [224, 183, 246],
    [230, 189, 255],
    
)

var colors = new Array(
    [251, 191, 63],
    [221, 144, 217],
    [244, 7, 133],
    [248, 255, 151],
    [151, 255, 239],
    [106, 101, 171],
    [252, 70, 106],
    
)


    //AJAX GET to get new colors 
    // create a route for json -> GET on route -> Array of Arrays on backend (RGB)
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,10);
