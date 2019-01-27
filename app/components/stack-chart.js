import Component from '@ember/component';
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale';
import {max} from 'd3-array';
import {stack} from 'd3-shape';
import {computed} from '@ember/object';
import {select} from 'd3-selection';
import {transition} from 'd3-transition';
import {axisBottom, axisLeft} from 'd3-axis';

export default Component.extend({
  t: computed(function () {
    return transition().duration(200);
  }),
  sortedData: computed('data', function () {
    let data = this.get('data');
    data.sort(function (a, b) {
      return b.total - a.total;
    });
    return data;
  }),
  didUpdate() {
    this._super(...arguments);
    const svg = select("svg");
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const data = this.get('sortedData');
    let keys = data.columns.slice(1);

    let x = scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

    let y = scaleLinear()
      .rangeRound([height, 0]);

    let z = scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    x.domain(data.map(function (d) {
      return d.State;
    }));
    y.domain([0, max(data, function (d) {
      return d.total;
    })]).nice();
    z.domain(keys);

    svg
      .selectAll(".stack")
      .data(stack().keys(keys)(data))
      .attr("fill", function (d) {
        return z(d.key);
      })
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .transition(this.t)
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

    svg
      .select(".axis--x")
      .call(axisBottom(x));

    var legend = svg.select('#legend')
      .attr("id", "legend")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.selectAll("rect")
      .data(keys.slice().reverse())
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.selectAll("text")
      .data(keys.slice().reverse())
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d;
      });
  },
  didInsertElement() {
    this._super(...arguments);
    let data = this.get('sortedData');
    let keys = data.columns.slice(1);

    let svg = select("svg"),
      margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      },
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
      .attr('class', 'stack')
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
      .attr("class", "axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    g.append("g")
      .attr("class", "axis--y")
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
      .attr("id", "legend")
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
  },

});
