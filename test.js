const chai = require('chai');
const describe = require('mocha').describe;

const expect = chai.expect;


const getRawData = require('./utils/general-utils/get-file.js')
const file = './datafile/restaurant_with_menu.json';
const userfile = './datafile/users_with_purchase_history.json';
const getData = getRawData.getData;
// console.log(getData.getData());
//  MOCK SEADER FILE
const seederFileEnv = async (typeOfFile) => {
  let fileToTest;
  const timeFile = await getData(file, 'time');
  const menuFile = await getData(file, 'menu');
  const purchaseFile = await getData(userfile, 'purchases');
  // console.log('FILE -> ', timeFile[0]);
  
  if (typeOfFile == 'users' || 'purchases') {
    return fileToTest = await getData(userfile, `${typeOfFile}` )
  }
  fileToTest =  await getData(file, 'time')

  // STILL FIGURING THIS OUT 👇

  // switch (typeOfFile) {
  //   case 'users':
  //     return await getData(userfile, `${typeOfFile}`)
  //     break;
  //   case 'time':
  //     return await getData(file, `${typeOfFile}`)
  //   default:
  //     break;
  // }

  
return fileToTest  
};
// seederFileEnv();

describe('Gets file from given JSON file and transforms it into seed ready format with necessary USER information', () => {
  it('Each User object has required properties to seed data', async () => {
    const results = await seederFileEnv('users');

    for (let i = 0; i < results.length; i += 1) {
      // console.log(results[i]);
      expect(results[i]).to.have.keys('name', 'cash_balance', 'created_at', 'updated_at')
    }
  })
})

// describe('Gets file from given JSON file and transforms it into seed ready format with necessary  OPENING HOURS information', () => {
//   it('Each Opening Time object has required properties to seed data', async () => {
//     const results = await seederFileEnv('time');

//     // represents single restaurant ( has up to 7 opening days)
//     for (let i = 0; i < results.length; i += 1) {
//       const currentRestaurantTiming = results[i];

//       // represents individual days
//       for (let j = 0; j < currentRestaurantTiming.length; j += 1) {
//         expect(currentRestaurantTiming[j]).to.have.keys('day', 'open_hours', 'opening_time', 'closing_time', 'created_at', 'updated_at')

//       }
//     }
//   })
// })