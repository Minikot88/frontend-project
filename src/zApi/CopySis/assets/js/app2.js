function exportImg() {
    domtoimage.toBlob(document.getElementById('bigDiv'))
    .then(function (blob) {
        var milliseconds = new Date().getTime();
        window.saveAs(blob, 'myschedule' + milliseconds +'.png');
    });
    donate();
}

function setTimeHead(str) {
    var i;
    var elem = document.getElementsByClassName("sc_time");
    var elem1 = document.getElementsByClassName("sc_header_cell");
    for (i = 0; i < elem.length; i++) { 
        elem[i].style.backgroundColor = str;
        elem1[0].style.backgroundColor = str;
    }
}

function setTimeText(str) {
    var i;
    var elem = document.getElementsByClassName("sc_time");
    for (i = 0; i < elem.length; i++) { 
        elem[i].style.color = str;
    }
}

function firstload() {

    if (document.getElementById('schedday')) { 
        setColor();
        setDay();
    }

    document.getElementsByClassName("loading")[0].style.display = "none";
    //modal.style.display = "block";
}

function opendeco() { //#d6598b
    //alert('Under maintenance');
    decomodal.style.display = "block";
}

function setColor() {
    var i,j;
    var bar = document.getElementsByClassName("sc_Bar");
    var len = bar.length;

    for(i = 0; i < len ; i++) {
        var color = randomPastelColor();
        var bordercolor = darkenBorderColor(color);

        bar[i].style.backgroundColor = "rgb(" + color + ")";
        var subbar = bar[i].getElementsByClassName("head");
        var subcodespan = subbar[0].getElementsByClassName("time");
        var subcode = subcodespan[0].innerHTML;

        for(j = 0;j < len ; j++) {
            var nextbar = bar[j].getElementsByClassName("head");
            var nextsubcodespan = nextbar[0].getElementsByClassName("time");
            var nextsubcode = nextsubcodespan[0].innerHTML;

            if(subcode == nextsubcode) {
                bar[j].style.backgroundColor = "rgb(" + color + ")";
                bar[j].style.borderColor = "rgb(" + bordercolor + ")";;
            }
        }

    }
}

function randomPastelColor() {

    var red = getRandomArbitrary(0,256);
    var green = getRandomArbitrary(0, 256);
    var blue = getRandomArbitrary(0, 256);

    red = (red + 255) / 2;
    green = (green + 255) / 2;
    blue = (blue + 255) / 2;

    return Math.round(red) + ',' + Math.round(green) + ',' + Math.round(blue);

}

function darkenBorderColor(color) {

    var colors = color.split(",");
    var ncolor = shadeColor(colors[0],colors[1],colors[2],-3);

    var red = ncolor.split(",")[0];
    var green = ncolor.split(",")[1];
    var blue = ncolor.split(",")[2];
    
    return Math.round(red)*0.8 + ',' + Math.round(green)*0.8 + ',' + Math.round(blue)*0.8;

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function shadeColor(r, g, b , percent) {

    r = parseInt(r * (100 + percent) / 100);
    g = parseInt(g * (100 + percent) / 100);
    b = parseInt(b * (100 + percent) / 100);

    r = (r<255)?r:255;  
    g = (g<255)?g:255;  
    b = (b<255)?b:255;  

    var RR = ((r.toString(16).length==1)?"0"+r.toString(16):r.toString(16));
    var GG = ((g.toString(16).length==1)?"0"+g.toString(16):g.toString(16));
    var BB = ((b.toString(16).length==1)?"0"+b.toString(16):b.toString(16));

    return r+","+g+","+b;
}

function setLine() {

    var i;
    var elem = document.getElementsByClassName("tl");
    if (document.getElementById('schedline').checked) 
    {
        for(i = 0; i < elem.length; i++) {
            elem[i].style.borderRight = "solid 1px #DDD";
        }
    }
    else {
        for(i = 0; i < elem.length; i++) {
            elem[i].style.borderRight = "none";
        }
    }
}

function setDay() {

    var i;
    var elem = document.getElementsByClassName("timeline");

    if (document.getElementById('schedday').checked) 
    {
        for(i = 0; i < elem.length; i++) {
            if(elem[i].innerHTML == '<span>Monday</span>') {
                elem[i].style.color = "#ffc332";
                elem[i].style.backgroundColor = "#ffffb2";
            } else if(elem[i].innerHTML == '<span>Tuesday</span>') {
                elem[i].style.color = "#ff748c";
                elem[i].style.backgroundColor = "#ffd5dc";
            } else if(elem[i].innerHTML == '<span>Wednesday</span>') {
                elem[i].style.color = "#003400";
                elem[i].style.backgroundColor = "#b2c2b2";
            } else if(elem[i].innerHTML == '<span>Thursday</span>') {
                elem[i].style.color = "#ffa500";
                elem[i].style.backgroundColor = "#ffe4b2";
            } else if(elem[i].innerHTML == '<span>Friday</span>') {
                elem[i].style.color = "#0000b3";
                elem[i].style.backgroundColor = "#d4d4ff";
            } else if(elem[i].innerHTML == '<span>Saturday</span>') {
                elem[i].style.color = "#340034";
                elem[i].style.backgroundColor = "#c2b2c2";
            } else if(elem[i].innerHTML == '<span>Sunday</span>') {
                elem[i].style.color = "#b30000";
                elem[i].style.backgroundColor = "#e8b2b2";
            }
        }
    }
    else 
    {
        for(i = 0; i < elem.length; i++) {
            
            if(elem[i].innerHTML == '<span>Monday</span>') {
                elem[i].style.color = null;
            elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Tuesday</span>') {
                elem[i].style.color = null;
            elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Wednesday</span>') {
                elem[i].style.color = null;
                elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Thursday</span>') {
                elem[i].style.color = null;
                elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Friday</span>') {
                elem[i].style.color = null;
                elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Saturday</span>') {
                elem[i].style.color = null;
                elem[i].style.backgroundColor = "rgb(221,221,221)";
            } else if(elem[i].innerHTML == '<span>Sunday</span>') {
                elem[i].style.color = null;
                elem[i].style.backgroundColor = "rgb(221,221,221)";
            }
            
        }
    }

}

function readFile() {

    document.getElementsByClassName("loading")[0].style.display = "block";
  
    if (this.files && this.files[0]) {
      
      var FR= new FileReader();
      
      FR.addEventListener("load", function(e) {
        //document.getElementById("img").src = e.target.result;
        var elem = document.getElementsByClassName("sc_main_scroll");
        elem[0].style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("' + e.target.result + '")';
        document.getElementsByClassName("loading")[0].style.display = "none";
      }); 
      
      FR.readAsDataURL(this.files[0]);
    }
    
  }
  
  if (document.getElementById('inp')) { 
    document.getElementById("inp").addEventListener("change", readFile);
  }


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

var modal = document.getElementById("myModal");
var qrmodal = document.getElementById("qrModal");
var decomodal = document.getElementById("decomodal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var qrspan = document.getElementById("qrclose");
var decoclose = document.getElementById("decoclose");


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
qrspan.onclick = function() {
    qrmodal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == qrmodal) {
      qrmodal.style.display = "none";
    }
  }

  
  decoclose.onclick = function() {
    decomodal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == decomodal) {
        decomodal.style.display = "none";
    }
}