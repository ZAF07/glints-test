const readFile = require('fs').readFile;
const getTimeData = require('../format-data-utils/format-time.js');
const getRestaurantData = require('../format-data-utils/format-restaurants.js');
const getFormattedDishes = require('../format-data-utils/format-menus.js');
const getUserData = require('../format-data-utils/format-users');
const getPurchaseData = require('../format-data-utils/format-purchases');

const convertMenuData = require('../convert-to-seed-utils/convert-menu-seed.js');
const convertTimeData = require('../convert-to-seed-utils/convert-time-seed.js');
const convertRestaurantData = require('../convert-to-seed-utils/convert-restaurant-seed.js');
const convertUserData = require('../convert-to-seed-utils/convert-user-seed');


const convertTimeSeed = convertTimeData.convertTimeSeed;
const convertMenuSeed = convertMenuData.convertMenuSeed;
const convertRestaurantSeed = convertRestaurantData.convertRestaurantSeed;
const convertUserDetailsSeed = convertUserData.convertUserSeed;

const stripAccessLetters = getTimeData.stripAccessLetters;
const getNameAndCashBalance = getRestaurantData.getNameAndCashBalance;
const getDishes = getFormattedDishes.getDishes;
const getUserDetails = getUserData.getUserDetails;
const getPurchaseDetails = getPurchaseData.getPurchaseDetails;

const getData = async (file, dataType) => {
  return new Promise((resolve, reject) => {
    let formattedData;
    let seedReadyData;
    // GET RAW DATA
    const a = readFile(file, 'utf-8', async(err, result) => {
      if (err) {
        console.log('ERROR -> ', err);
        reject(err)
      }

      const data = JSON.parse(result);
      
      //  FORMAT DATA BASED ON DATA TYPE (TIME, RESTAURANT, MENU, USER)
      switch (dataType) {
        case 'time':
          // PROCESS DATA
          formattedData = stripAccessLetters(data);
          // TURN DATA INTO SEED FORMAT
          seedReadyData = convertTimeSeed(formattedData)
          break;
        case 'restaurant':
          formattedData = getNameAndCashBalance(data)
          seedReadyData = convertRestaurantSeed(formattedData);
          break;
        case 'menu':
          formattedData = getDishes(data);
          seedReadyData = convertMenuSeed(formattedData);
          break;
        case 'users':
          formattedData = getUserDetails(data);
          seedReadyData = convertUserDetailsSeed(formattedData);
          break;
        default:
        case 'purchases':
          seedReadyData = getPurchaseDetails(data);
          break;
      }
      resolve(seedReadyData);
    })
  })
};
// export default getData;
exports.getData = getData;