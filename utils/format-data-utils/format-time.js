const moment = require('moment');
/**
 * 
 * @param {Array} arr parsed data from json file 
 * @returns abstracted data specific to filename (stripped and formatted time data only)
 * @returns -> openingHours, openingTime, closingTime, day
 */
const stripAccessLetters = (arr) => {
  
  // STORE INDIVIDUAL RESTAURANTS TIMINGS HERE
  const individualRestaurants = []
  const matchLetters = /\Mon|Tues|Weds|Thurs|Fri|Sat|Sun\b/g ;
  const matchTime = /%[0-12]/g ;

  //  ARRAY OF OPENING HOURS SPLIT BY '/'
  const openingHoursSplit = [];

  // ARRAY OF OBJECTS FROM JSON
  const dataFromJson = arr;
  // SPLIT EACH OPENINGHOURS BY '/' AND PUSH TO INTEMIDIATE ARR ['mon 1-2pm, fri 12-4pm]
  dataFromJson.forEach(obj => {
    //  STORE RESTAURANT SPECIFIC OPENING TIMES
    const singleRestOpeningTime =  {}; 

    const allOpeningHours = obj.openingHours;
    const restName = obj.restaurantName;
;
    const splitOpeningHoursToArr = allOpeningHours.split('/');
    singleRestOpeningTime.name = restName;
    singleRestOpeningTime.openingTimes = splitOpeningHoursToArr;
    openingHoursSplit.push(singleRestOpeningTime)
  });  

  // SPLIT INDIVIDUAL OPENINGHOURS BY DAYS AND TIME [mon, tues, wed]
  openingHoursSplit.forEach(opening => {

    const singleRestaurant = {
      name: opening.name,
      openingHours: []
    };

    opening.openingTimes.forEach((open, openIndex) => {
      
      const splitByDay = open.match(matchLetters).toString(); 
      const removeDay = open.split(matchTime);
      let splitByTime = removeDay.toString().split(matchLetters).join('').replace(/[\;'",' ')]/gi, '');

      // REMOVE FIRST INSTANCE OF '-'
      while(splitByTime.charAt(0) === '-') {
        splitByTime = splitByTime.substring(1);
      };
      const openingAndClosingTimes = splitByTime.split('-')
         
      //  ADD TO OBJECT

      if (splitByDay.split(',').length > 1) {
        const sameOpeningDays = []
        
        //  push all to array, and loop through individually and add to object
        const joinedDays = splitByDay.split(',');
        joinedDays.forEach(day => {
          sameOpeningDays.push(day);
        });

        sameOpeningDays.forEach(day => {
          const dateTime2 = {};
          dateTime2.day = day;
          dateTime2.openHours = splitByTime

          openingAndClosingTimes.forEach((time, index) => {
            const convertTo24Hours = moment(time, 'hh:mm A').format('HH:mm')
            if (index == 0) {
              dateTime2.openingTime = convertTo24Hours
              
            } else {

              dateTime2.closingTime = convertTo24Hours
            }
          })

          singleRestaurant.openingHours.push(dateTime2)
        })

      } else {
        const dateTime = {}
        dateTime.day = splitByDay;
        dateTime.openHours = splitByTime;

        openingAndClosingTimes.forEach((time, index) => {
          const convertTo24Hours = moment(time, 'hh:mm A').format('HH:mm')
          
          if (index == 0) {
            dateTime.openingTime = convertTo24Hours
          } else {

            dateTime.closingTime = convertTo24Hours
          }
        })

        singleRestaurant.openingHours.push(dateTime)
      }

    })
    individualRestaurants.push(singleRestaurant)

  })

  return individualRestaurants;
};

exports.stripAccessLetters = stripAccessLetters;