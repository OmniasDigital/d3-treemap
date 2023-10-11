var data = {
    "name": "SDGs",
    "children": [
        {"name": "SDG 1", "value": 165.55},
        {"name": "SDG 2", "value": 142.49},
        {"name": "SDG 3", "value": 238.74},
        {"name": "SDG 4", "value": 176.41},
        {"name": "SDG 5", "value": 242.60}
    ]
};

var width = 500,
    height = 500;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var root = d3.hierarchy(data)
    .sum(function(d) { return d.value; });

d3.treemap()
    .size([width, height])
    .padding(2)
    (root);

var node = svg.selectAll(".node")
    .data(root.leaves())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

node.append("rect")
    .attr("width", function(d) { return d.x1 - d.x0; })
    .attr("height", function(d) { return d.y1 - d.y0; })
    .attr("fill", "steelblue");

node.append("text")
    .attr("x", 5)
    .attr("y", 20)
    .text(function(d) { return d.data.name + ": $" + d.data.value; });
