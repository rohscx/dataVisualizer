import React, {Component} from 'react';
import * as d3 from "d3";


export default class DoughnutChart extends React.Component {
     constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
     }
     componentDidMount() {
        this.createBarChart()
     }
     componentDidUpdate() {
        this.createBarChart()
     }

     createBarChart() {
       // simulated data
       const dataJson = this.props.data;
        // creates d3 data from a JSON object
        const d3Data = dataJson

        const statusCheck = (tempObj) => {
          if (tempObj.name == "incompleteness") {
            return "#fff";
          } else if (tempObj.name != "incompleteness" ) {
            if (tempObj.value1 >= 100) { // if incompleteness 100 or more make it green. you're done
              return "#5cb85c";;
            }else if(tempObj.value1 >= 10) { // if incompleteness 90 or less make it yellow, you're getting there
                return "#f0ad4e";
            } else {
              return color(tempObj.name); // defualt incompleteness, one of several shades of blue, you have not even started yet
            }
          } else {
              return color(tempObj.name); // defualt one of several shades of blue, you have not even started yet
        }
      }
        // margin
        const margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = this.props.config.width - margin.right - margin.left,
            height = this.props.config.height - margin.top - margin.bottom,
            radius = width/2;


        // color range
        const color = d3.scaleOrdinal()
            .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
        // donut chart arc
        const arc = d3.arc()
            .outerRadius(radius - this.props.config.arc.outerRadius)
            .innerRadius(radius - this.props.config.arc.innerRadius);

        // arc for the labels position
        const labelArc = d3.arc()
            .outerRadius(radius - this.props.config.labelArc.outerRadius)
            .innerRadius(radius - this.props.config.labelArc.innerRadius);

        // generate pie chart and donut chart
        const pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.value; });



        // define the svg donut chart
        const svg = d3.select(this.node).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // import data
        d3Data.map((dataD) =>{
          // "g element is a container used to group other SVG elements"

          const g = svg.selectAll(".arc")
              .data(pie(d3Data))
            .enter().append("g")
              .attr("class", "arc");

           // append path
          g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return statusCheck(d.data)})
            .transition()
              .ease(d3.easeLinear)
              .duration(2000)
              .attrTween("d", tweenDonut);

           // append text
          g.append("text")
            .transition()
              .ease(d3.easeLinear)
              .duration(2000)
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .text(function(d) {
                if (d.data.name != "incompleteness") {
                  return d.data.name;
                }
              });

          // append text cener
         g.append("text")
           .transition()
             .ease(d3.easeLinear)
             .duration(2000)
           .attr("text-anchor","middle")
             .attr("dy", ".35em")
             .text(function(d) {
               if (d.data.name != "incompleteness") {
                 return "Site Name";
               }
             });
        });

        // Helper function for animation of pie chart and donut chart
        function tweenDonut(b) {
          b.innerRadius = 0;
          const i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
          return function(t) { return arc(i(t)); };
        }
    }

  render() {

  return (
      <svg style={{width:this.props.config.width+"px",height:this.props.config.height+"px"}} className="chart" ref={node => this.node = node} />
  )}
}
