var moment = require('moment')

// Jan 1st 1970 00:00:00 am
// time 0

// var date = new Date()
// var months = ['Jan', 'Feb', 'Mar', ]
// console.log(date.getMonth());

new Date().getTime()
var someTimeStamp = moment().valueOf()
console.log(someTimeStamp);


var createdAt = 1234;
var date = moment(createdAt)
date.add(1, 'year').subtract(9,'months')
console.log(date.format('MMM Do YYYY HH:mm:ss a'));
console.log('............');
console.log(date.format('h:mm a'));


// 10:35 am