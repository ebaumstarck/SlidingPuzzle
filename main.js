// when the page is ready
$(document).ready(function() {
  console.log("FOO!");
  
  //automatically create div based on the random number
  var 
    //number of slices of the picture
    numSlices = 100,
    //row or columns of the picture n * n 
    rows  = Math.sqrt(numSlices),
    //left, top position of the slice
    leftPos  = 0,
    topPos = 0,
    // size of the slice
    size = Math.round(500 / rows);
  for(var i = 0 ; i < numSlices; i++){
    topPos = Math.floor(i/rows) * size;
    leftPos = Math.floor(i % rows) * size;
    var str;
    $("#puzzle").append(str = '<div class="puzzle-piece" '
      +'style = "top:' + topPos  + 'px; '
      +'left:' + leftPos + 'px; '
      +'background-position: -' + leftPos + 'px -' + topPos +'px;">' + i + '</div>');
    console.log(str);
  }
  $('.puzzle-piece').width(size).height(size);//css('width: ' + size + 'px; height:' +  size +'px;');
  // jquery drag slices of picture
  $(function() {
    $( ".puzzle-piece" ).draggable();
  });
});