var svgWidth = 960;
var svgHeight = 660;

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
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var scatterGroup = svg.append("g")
  .attr("transform",`translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(censusData){
  censusData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    });
    console.log(censusData,d=>d.poverty)
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(censusData, d=> d.poverty)])
    .range([10, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(censusData,d => d.healthcare)])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  scatterGroup.append("g")
    .attr("transform",`translate(0, ${chartHeight})`)
    .call(bottomAxis);

  scatterGroup.append("g")
    .call(leftAxis)

  var circlesGroup = scatterGroup.selectAll("circle")
    .data(censusData)
    .enter();
  
    circlesGroup.append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r","12")
    .attr("fill","pink")
    .attr("opacity","1");
    
    circlesGroup.append("text")
    .attr("x", d=> xLinearScale(d.poverty))
    .attr("y", d=> yLinearScale(d.healthcare))
    .attr("dy","5px")
    .attr("class","stateText")
    .text(function(d){
      return d.abbr;
    });

  scatterGroup.append("text")
    .attr("transform","rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("In Poverty (%)");

  scatterGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");
  });
