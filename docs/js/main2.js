// Lekeitio Covid graph

// Health Tracking Graph

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 40, left: 60 },
  width = 900 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3
  .select("#graph2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv(
  "https://raw.githubusercontent.com/nabaroa/lekeitio-covid/main/docs/data/data.csv",

  // When reading the csv, I must format variables:
  function (d) {
    return {
      date: d3.timeParse("%Y-%m-%d")(d.date),
      positives: d.positives,
    };
  },

  // Now I can use this dataset:
  function (data) {
    // Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg2
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([0, 1000]).range([height, 0]);
    svg2.append("g").call(d3.axisLeft(y));

    // Add the positives line
    svg2
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#72c0e5")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.date);
          })
          .y(function (d) {
            return y(d.positives);
          })
      );

    // Top limit line
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("line")
      .attr("x1", "0")
      .attr("y1", "10.5%")
      .attr("x2", "100%")
      .attr("y2", "10.5%")
      .attr("fill", "none")
      .attr("stroke", "#bb2a5c")
      .attr("stroke-width", "1")
      .attr("stroke-dasharray", "4 10");
  }
);
