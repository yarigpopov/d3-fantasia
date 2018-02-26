import Route from '@ember/routing/route';
import {csv} from 'd3-request';
import {later} from '@ember/runloop'

export default Route.extend({
  model() {
    return new Promise(function (resolve, reject) {
      csv('data.csv', (d, i, columns) => {
        let t = 0;
        for (i = 1, t = 0; i < columns.length; ++i) d[columns[i]] = Math.round((Math.random() * 0.2 + 0.9) * d[columns[i]]);
        for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
      }, (error, data) => {
        if (error) reject(error);
        console.log(data);
        resolve(data);
      })
    });
  },
  scheduleRefresh() {
    this.refresh();
    later(this, function () {
      this.scheduleRefresh();
    }, 2000);
  },
  activate() {
    this._super(arguments);
    later(this, function () {
      this.scheduleRefresh();
    }, 2000);
  }
});
