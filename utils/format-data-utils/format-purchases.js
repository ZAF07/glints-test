const getPurchaseDetails = (arr) => {
  const purchases = arr;
  const purchaseDetails = [];

  purchases.forEach(purchase => {
    const purchaseHistories = purchase.purchaseHistory;

    const singleUser = []
    purchaseHistories.forEach(history => {
      const singlePurchase = {};
      singlePurchase.dish = history.dishName;
      singlePurchase.restaurant_name = history.restaurantName;
      singlePurchase.transaction_amt = history.transactionAmount;
      singlePurchase.transaction_date = new Date();
      singlePurchase.created_at = new Date();
      singlePurchase.updated_at = new Date();
      singleUser.push(singlePurchase);
    })
    purchaseDetails.push(singleUser);


  })
  return purchaseDetails;
};

exports.getPurchaseDetails = getPurchaseDetails;