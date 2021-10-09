// import moment from 'moment';
const moment = require('moment');
const stripAccessLetters = (arr) => {
  
  // STORE INDIVIDUAL RESTAURANTS TIMINGS HERE
  const individualRestaurant = []
  const matchLetters = /\Mon|Tues|Weds|Thurs|Fri|Sat|Sun\b/g ;
  const matchTime = /%[0-12]/g ;
  const matchOnlyTime = /^[0-12]:[0-12]am$/g ;
  // const regex = /[A-Z]/g; 

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
    // console.log('ohours --> ', oHours);
    const splitOpeningHoursToArr = allOpeningHours.split('/');
    singleRestOpeningTime.name = restName;
    singleRestOpeningTime.openingTimes = splitOpeningHoursToArr;
    openingHoursSplit.push(singleRestOpeningTime)
  });  

  // SPLIT INDIVIDUAL OPENINGHOURS BY DAYS AND TIME [mon, tues, wed]
  openingHoursSplit.forEach(opening => {
    // console.log('opening -> ', opening);
    // const singleRestaurant = []
    const singleRestaurant = {
      name: opening.name,
      openingHours: []
    };
    // console.log('##################OPENING -> ', opening);
    opening.openingTimes.forEach((open, openIndex) => {
      // console.log('OPEN -> ', open);
      
      const splitByDay = open.match(matchLetters).toString(); 
      const removeDay = open.split(matchTime);
      let splitByTime = removeDay.toString().split(matchLetters).join('').replace(/[\;'",' ')]/gi, '');
   

      // REMOVE FIRST INSTANCE OF '-'
      while(splitByTime.charAt(0) === '-') {
        splitByTime = splitByTime.substring(1);
      };
      const openingAndClosingTimes = splitByTime.split('-')
         
      //  ADD TO OBJECT
      
      // IF SPLITBYDAY LENGTH > 1
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
    individualRestaurant.push(singleRestaurant)

  })

  return individualRestaurant;
};

// export default stripAccessLetters;
exports.stripAccessLetters = stripAccessLetters;