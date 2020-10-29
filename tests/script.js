import http from 'k6/http';
import { check, sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const csvData = papaparse.parse(open('../urls.csv'), { header: false }).data;

export let options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '10s', target: 200 },
    { duration: '2m', target: 400 },
    { duration: '10s', target: 400 },
    { duration: '2m', target: 600 },
    { duration: '10s', target: 600 },
    { duration: '2m', target: 800 },
    { duration: '10s', target: 800 },
    { duration: '1m', target: 0}
  ],
};


export default function () {
  const before = new Date().getTime();
  const T = 1;

  let x = Math.floor(Math.random() * (csvData.length - 1));
  let randomProductUrl = csvData[x];
  var url = randomProductUrl[0];
  let res = http.get(url);
  check(res, { 'status was 200': (r) => r.status == 200 });

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }
}
