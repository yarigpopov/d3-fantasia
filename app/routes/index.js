import Route from '@ember/routing/route';
import {csv} from 'd3-request';

export default Route.extend({
  model(){
    return new Promise(function(resolve, reject) {
      csv('data.csv', (d, i, columns) => {
        let t = 0;
        for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
      }, (error, data) =>{
        if (error) reject(error);
        resolve(data);
      })
    });
  }
});
