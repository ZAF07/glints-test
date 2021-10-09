const getRawData = require('./utils/general-utils/get-file.js')
const file = './datafile/restaurant_with_menu.json';
const userfile = './datafile/users_with_purchase_history.json';
const getData = getRawData.getData;
// console.log(getData.getData());
//  MOCK SEADER FILE
const seederFileEnv = async () => {
  const menuSeed = [];
  const timeSeed = [];

  const timeFile = await getData(file, 'time');
  const restaurantFile = await getData(file, 'restaurant');
  const menuFile = await getData(file, 'menu');
  const userFile = await getData(userfile, 'users')
  const purchaseFile = await getData(userfile, 'purchases');
  console.log('FILE -> ', timeFile[0]);
};
seederFileEnv();