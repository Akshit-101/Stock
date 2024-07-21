import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchPage.css';

function SearchPage() {
  const [stock, setStock] = useState('');
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState([]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://stock-dpyk.onrender.com/news');
      setNews(response.data.data || []);
    } catch (error) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get('https://stock-dpyk.onrender.com/stocks');
      setStocks(response.data || []);
    } catch (error) {
      console.error('Failed to fetch stocks', error);
    }
  };

  const fetchStockDetails = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://stock-dpyk.onrender.com/stocks/${name}`);
      setStockData(response.data || null);
    } catch (error) {
      setError('Failed to fetch stock details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchStocks();
  }, []);

  return (
    <div className="search-page">
      <header>
        <h1>Enter the Stock World</h1>
        <p>Search the details about your stock</p>
      </header>
      
      <div className="search-bar">
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock Name"
        />
        <button onClick={() => fetchStockDetails(stock)}>Search</button>
        
        
      </div>

      <center><h5> {error && <p>{error}</p>}</h5></center>

      {stockData && (
        <div className="stock-details">
          <h2>{stockData.nameOfStock}</h2>
          <p>{stockData.smallDescription}</p>
          <p>Current Date: {new Date(stockData.currentDate).toLocaleDateString()}</p>
          <p>Current Price: ₹{stockData.price}</p>
          <p>Yesterday's Price: ₹{stockData.yesterdaysPrice}</p>
          <p>Loss Possibility: {stockData.percentagePossibilityOfLossIfYouInvest}%</p>
          <p>Profit Possibility: {stockData.percentagePossibilityOfProfitIfYouInvest}%</p>
          <p>Should Invest: {stockData.shouldInvest}</p>
        </div>
      )}

      <section className="stock-buttons">
        <h2>Stocks Available:  </h2> 
        {stocks.map((stock, index) => (
          <button key={index} onClick={() => fetchStockDetails(stock.nameOfStock)}>
            {stock.nameOfStock}
          </button>
        ))}
      </section>

      <section className="news-section">
        <h2>Latest News</h2>
        {loading && <p>Loading news...</p>}
        
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-box">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))
        ) : (
          !loading && <p>No news available</p>
        )}
      </section>

      <footer>
        <h2>
          App is on Continuous Update for new stocks.
          <br />
          STAY TUNED
        </h2>
      </footer>
    </div>
  );
}

export default SearchPage;
