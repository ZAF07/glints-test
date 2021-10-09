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