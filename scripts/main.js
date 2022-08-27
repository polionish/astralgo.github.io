let slides = document.getElementsByClassName('slide');
let slide_roots = document.getElementsByClassName('slide_root')
for (let i = 0; i < slides.length; ++i) {
    slide_roots[i].onclick = function () {
        let child = this.parentNode.childNodes;
        for (let cI in child) {
            console.log(child[cI])
            if (child[cI].className == 'content') {
                if (child[cI].style.display === 'block'){
                    child[cI].style.display = 'none';
                    this.parentNode.parentNode.style.borderColor = 'rgb(255,255,255)';
                    this.parentNode.parentNode.style.backgroundColor = 'rgb(255,255,255)';
                } else {
                    child[cI].style.display = 'block';
                    this.parentNode.parentNode.style.borderColor = 'rgb(187,100,230)';
                    this.parentNode.parentNode.style.backgroundColor = 'rgba(239,237,255,0.53)';
                }
            }
        }
    }
}


var canvas = document.getElementById("cnvs");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(136, 206, 130)";

var box1 = document.getElementById("lol");
let xyz = box1.getBoundingClientRect();
ctx.fillRect(xyz.x - 240, xyz.y - 50, 30, 5);

var canvas2= document.createElement("canvas");
canvas2.setAttribute("id", "canvas1");
var c = document.getElementById('canvas1');
var ctx = c.getContext('2d');


function copyButton() {
    navigator.clipboard.writeText("https://carbon.now.sh/?bg=rgba%28255%2C255%2C255%2C1%29&t=base16-light&wt=none&l=auto&width=545.75&ds=true&dsyoff=0px&dsblur=24px&wc=false&wa=false&pv=56px&ph=56px&ln=true&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=momma%2520mia");
    alert("Copied the text: " + copyText.value);
}


var g = new Dracula.Graph();

g.addEdge("strawberry", "cherry");
g.addEdge("strawberry", "apple");
g.addEdge("strawberry", "tomato");

g.addEdge("tomato", "apple");
g.addEdge("tomato", "kiwi");

g.addEdge("cherry", "apple");
g.addEdge("cherry", "kiwi");

var layouter = new Dracula.Layout.Spring(g);
layouter.layout();

var renderer = new Dracula.Renderer.Raphael('canvas', g, 400, 300);
renderer.draw();

