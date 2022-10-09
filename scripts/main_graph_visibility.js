let slide_root = document.getElementById('slide_root')
let content_txt = document.getElementById("contents_txt");
let content_graph = document.getElementById("contents_graph");
slide_root.onclick = function () {
    if (content_graph.style.display === 'block') {
        content_graph.style.display = 'none';
        content_txt.style.display = 'block';
    } else {
        content_graph.style.display = 'block';
        content_txt.style.display = 'none';
    }
}
