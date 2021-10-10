const chai = require('chai');
const describe = require('mocha').describe;
const getRawData = require('./utils/general-utils/get-file.js')
const getData = getRawData.getData;

const file = './datafile/restaurant_with_menu.json';
const userfile = './datafile/users_with_purchase_history.json';

const expect = chai.expect;

describe('GETS FILE FROM GIVEN JSON FILE AND TRANSFORMS IT INTO SEED READY FORMAT WITH NECESSARY DETAILS -> ', () => {

  describe('RESTAURANT DETAILS', () => {
    it('Each RESTAURANT object has required properties to seed data', async () => {
      
      const results = await getData(file,'restaurant');
  
      for (let i = 0; i < results.length; i += 1) {
        // console.log(results[i]);
        expect(results[i]).to.have.keys('name', 'cash_balance', 'created_at', 'updated_at')
      }
    })
  });

  // USER SEED FILE
  describe('USER DETAILS', () => {
    it('Each User object has required properties to seed data', async () => {
      
      const results = await getData(userfile,'users');
  
      for (let i = 0; i < results.length; i += 1) {
        // console.log(results[i]);
        expect(results[i]).to.have.keys('name', 'cash_balance', 'created_at', 'updated_at')
      }
    })
  });

  // PURCHASES SEED FILE
  describe('PURCHASES DETAILS', () => {
    it('Each Purchase object has required properties to seed data', async () => {
       // purchases list for all users 
      const results = await getData(userfile,'purchases');
  
      for (let i = 0; i < results.length; i += 1) {
        // purchase list for one user
        const purchasesList = results[i];
  
        for (let j = 0; j < purchasesList.length; j += 1) {
  
          expect(purchasesList[j]).to.have.keys('dish', 'restaurant_name', 'transaction_amt', 'transaction_date', 'created_at', 'updated_at')
        }
      }
    })
  });


  // OPENING HOURS SEED
  describe('OPENING HOURS DETAILS', () => {
    it('Each Opening Time object has required properties to seed data', async () => {
      const results = await getData(file, 'time');
  
      // represents single restaurant ( has up to 7 opening days)
      for (let i = 0; i < results.length; i += 1) {
        const currentRestaurantTiming = results[i];
  
        // represents individual days
        for (let j = 0; j < currentRestaurantTiming.length; j += 1) {
          expect(currentRestaurantTiming[j]).to.have.keys('day', 'open_hours', 'opening_time', 'closing_time', 'created_at', 'updated_at')
  
        }
      }
    })
  });


  // MENU SEED FILE
  describe('MENU DETAILS', () => {
    it('Each Menu object has required properties to seed data', async () => {
      const results = await getData(file, 'menu');
  
      // represents single restaurant menu
      for (let i = 0; i < results.length; i += 1) {
        const currentRestaurantTiming = results[i];
  
        // represents each menu item
        for (let j = 0; j < currentRestaurantTiming.length; j += 1) {
          expect(currentRestaurantTiming[j]).to.have.keys('dish', 'price', 'created_at', 'updated_at')
  
        }
      }
    })
  });

});






