import React, {Component} from 'react';
import * as d3 from "d3";
import DoughnutChart from "./DataVisualizer/DoughnutChart.js";


export default class DataVisualizer extends React.Component {
     constructor(){
        super()
        this.state = {
          parentD3Config:{
            width:300,
            height:300,
            arc:{
              outerRadius:5,
              innerRadius:40
            },
            labelArc:{
              outerRadius:20,
              innerRadius:25
            }
          },
          childD3Config:{
            width:200,
            height:200,
            arc:{
              outerRadius:2,
              innerRadius:38
            },
            labelArc:{
              outerRadius:22,
              innerRadius:20
            }
          },
          parentCycle:[
            {name: "Phase1", value:35, incompleteness:0},
            {name: "Phase2", value:65, incompleteness:50},
            {name: "Phase3", value:35, incompleteness:100},
            ],
          childCycle:[
            [
            {name: "Phase1", value:35, incompleteness:50},
            {name: "Phase2", value:65, incompleteness:100},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:75},
            {name: "Phase2", value:65, incompleteness:100},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:100},
            {name: "Phase2", value:65, incompleteness:100},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:0},
            {name: "Phase2", value:65, incompleteness:0},
            {name: "Phase3", value:35, incompleteness:0},
            ],
            [
            {name: "Phase1", value:35, incompleteness:0},
            {name: "Phase2", value:65, incompleteness:0},
            {name: "Phase3", value:35, incompleteness:0},
            ],
            [
            {name: "Phase1", value:35, incompleteness:90},
            {name: "Phase2", value:65, incompleteness:100},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:0},
            {name: "Phase2", value:65, incompleteness:40},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:0},
            {name: "Phase2", value:65, incompleteness:0},
            {name: "Phase3", value:35, incompleteness:100},
            ],
            [
            {name: "Phase1", value:35, incompleteness:100},
            {name: "Phase2", value:65, incompleteness:100},
            {name: "Phase3", value:35, incompleteness:100},
            ],
          ]
        }
    }
     makeGraphData(arrayObj) {
       const magnify = (incompleteness, value) => { // num is the value and num2 is incompleteness
         const newValue =
         incompleteness < 89 ? newValue = value * 4 : value;
         return newValue;
       }
       return arrayObj.reduce((phase,line)=>{
         phase.push({
           name:line.name,
           value:magnify(line.incompleteness,line.value),
           value1: 100 - line.incompleteness
         })
        phase.push({
          name:"incompleteness",
          value:line.incompleteness
        })
        return phase
      },[])
     }

     makeChildGraph(arrayObj) {
       return arrayObj.map((data) => {
         // change math randome to dbId or something in the future
         return (
           <DoughnutChart key={Math.random()} data={this.makeGraphData(data)} config={this.state.childD3Config}/>
         )
       })
     }

  render() {
    //console.log(this)
  return (
      <div>
        <div style={{width:this.state.parentD3Config.width+"px",height:this.state.parentD3Config.height+"px"}}>
          <DoughnutChart data={this.makeGraphData(this.state.parentCycle)} config={this.state.parentD3Config}/>
        </div>
        <div style={{width:"100%",height:"100%"}}>
          {this.makeChildGraph(this.state.childCycle)}
        </div>
      </div>
  )}
}
