function drawGraph(id) {
    // let id="example-1";
    let svg = d3.select("svg[id="+id+"]"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(40,0)");

    let tree = d3.tree()
        .size([height, width - 160]);

    let stratify = d3.stratify()
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });

    d3.csv("/data/"+id+".csv", function (error, data) {
        if (error) throw error;

        let root = stratify(data)
            .sort(function (a, b) {
                return (a.height - b.height) || a.id.localeCompare(b.id);
            });

        let link = g.selectAll(".link")
            .data(tree(root).links())
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", "rgb(155,152,161)")
            .attr("d", d3.linkHorizontal()
                .x(function (d) {
                    return d.y;
                })
                .y(function (d) {
                    return d.x;
                }));

        let node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", function (d) {
                return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            })

        node.append("circle")
            .attr("r", function(d){
                if (d.data.value === "3") { return 5 }
                else  { return 5}})
            .style("stroke", "rgb(255,255,255)")
            .style("fill", function(d) {
                if (d.data.value === "3") { return "rgb(217,158,246)" }
                else  { return "rgb(157,157,157)"}});

        node.append("text")
            .attr("dy", function (d) {
                return d.children ? 3 : 3;
            })
            .attr("x", function (d) {
                return d.children ? d.id.substring(d.id.lastIndexOf(".") + 1).length * 5.5 + 8 : 8;
            })
            .style("text-anchor", function (d) {
                return d.children ? "end" : "start";
            })
            .text(function (d) {
                return d.id.substring(d.id.lastIndexOf(".") + 1);
            });
    });
}