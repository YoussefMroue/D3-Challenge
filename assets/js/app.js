var svgWidth = 1000;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .append("width", svgWidth)
  .append("height", svgHeight);

var scatterGroup = svg.append("g")
  .attr("transform",`translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(censusData){
  censusData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });

  var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(censusData, d=> d.poverty)])
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(censusData,d => d.healthcare)])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  scatterGroup.append("g")
    .attr("transform",`translate(0, ${chartHeight})`)
    .call(bottomAxis);

  scatterGroup.append("g")
    .call(leftAxis)

  var circlesGroup = scatterGroup . selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r","5")
    .attr("fill","pink")
    .attr("opacity","1")
  });
