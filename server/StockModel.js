const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  nameOfStock: { type: String, required: true },
  smallDescription: { type: String, required: true },
  currentDate: { type: Date, required: true },
  price: { type: Number, required: true },
  yesterdaysPrice: { type: Number, required: true },
  percentagePossibilityOfLossIfYouInvest: { type: Number, required: true },
  percentagePossibilityOfProfitIfYouInvest: { type: Number, required: true },
  shouldInvest: { type: String, required: true }
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
