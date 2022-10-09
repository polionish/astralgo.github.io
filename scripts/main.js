let slides = document.getElementsByClassName('slide');
let slide_roots = document.getElementsByClassName('slide_root')
for (let i = 0; i < slides.length; ++i) {
    slide_roots[i].onclick = function () {
        let child = this.parentNode.childNodes;
        for (let cI in child) {
            console.log(child[cI])
            if (child[cI].className === 'content') {
                if (child[cI].style.display === 'block'){
                    child[cI].style.display = 'none';
                    this.parentNode.parentNode.style.borderColor = 'rgb(255,255,255)';
                    this.parentNode.parentNode.style.backgroundColor = 'rgba(255,255,255,0)';
                } else {
                    child[cI].style.display = 'block';
                    this.parentNode.parentNode.style.borderColor = 'rgb(187,100,230)';
                    this.parentNode.parentNode.style.backgroundColor = 'rgb(239,237,255)';
                }
            }
        }
    }
}

