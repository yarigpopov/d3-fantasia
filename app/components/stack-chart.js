import Component from '@ember/component';
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale';
import {max} from 'd3-array';
import {stack} from 'd3-shape';
import {computed} from '@ember/object';
// import $ from 'jquery';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from 'd3-axis';

// var x = d3.scaleBand()
//   .rangeRound([0, width])
//   .paddingInner(0.05)
//   .align(0.1);
//
// var y = d3.scaleLinear()
//   .rangeRound([height, 0]);
//
// var z = d3.scaleOrdinal()
//   .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

export default Component.extend({
  x: computed('data', (data) => {
    scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);
  }),
  // width: computed('svg', function () {
  //   return +this.get('svg').attr("width") - this.get('margin.left') - this.get('margin.right');
  // }),
  // height: computed('svg', function () {
  //   return +this.get('svg').attr("height") - this.get('margin.top') - this.get('margin.bottom');
  // }),
  // g: computed('svg', 'width', 'height', function () {
  //
  // }),

  init() {
    this._super(arguments);
    // this.set('margin', {top: 20, right: 20, bottom: 30, left: 40});
  },
  didInsertElement() {
    let data = this.get('data');
    let svg = select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

    let y = scaleLinear()
      .rangeRound([height, 0]);

    let z = scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    let keys = data.columns.slice(1);

    data.sort(function (a, b) {
      return b.total - a.total;
    });
    x.domain(data.map(function (d) {
      return d.State;
    }));
    y.domain([0, max(data, function (d) {
      return d.total;
    })]).nice();
    z.domain(keys);

    g.append("g")
      .selectAll("g")
      .data(stack().keys(keys)(data))
      .enter().append("g")
      .attr("fill", function (d) {
        return z(d.key);
      })
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter().append("rect")
      .attr("x", function (d) {
        return x(d.data.State);
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth());

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    g.append("g")
      .attr("class", "axis")
      .call(axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Population");

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d;
      });

    // let svg =  select("svg");
    // const margin = this.get('margin');
    // svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }

});
