import React, { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input';
import useCurrency from './hooks/usecurrency';

function App() {
  const [Amount, setAmount] = useState(0);
  const [from, setfrom] = useState('USD');
  const [to, setto] = useState('INR');
  const [convertedAmount, setconvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencyinfo = useCurrency(from);
  const Options = Object.keys(currencyinfo || {});

  const swap = () => {
    setAmount(convertedAmount);
    setconvertedAmount(Amount);
    setfrom(to);
    setto(from);
  };

  const convert = async () => {
    if (!Amount || Amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (currencyinfo[to]) {
      setconvertedAmount((Amount * currencyinfo[to]).toFixed(2));
    } else {
      setError('Currency conversion failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  // Auto-convert when amount or currencies change
  useEffect(() => {
    if (Amount > 0 && currencyinfo[to]) {
      setconvertedAmount((Amount * currencyinfo[to]).toFixed(2));
    }
  }, [Amount, from, to, currencyinfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg animate-float">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Currency Converter
            </h1>
            <p className="text-gray-400 text-lg">Real-time exchange rates</p>
          </div>

          {/* Input Cards */}
          <div className="space-y-6">
            <Input
              label="From"
              amount={Amount}
              onAmountChange={setAmount}
              currency={from}
              currencyOptions={Options}
              onCurrencyChange={setfrom}
              selectcurrencys={from}
            />

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swap}
                className="group relative p-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-500 border border-cyan-400/30 hover:border-cyan-300/50"
              >
                <svg className="w-7 h-7 text-white transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <Input
              label="To"
              amount={convertedAmount}
              onAmountChange={setconvertedAmount}
              currency={to}
              currencyOptions={Options}
              onCurrencyChange={setto}
              amountdisabled={true}
              selectcurrencys={to}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-slide-in">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={isLoading || !Amount}
            className="w-full mt-8 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-purple-500/30 hover:border-purple-400/50 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isLoading ? (
              <div className="flex items-center justify-center relative z-10">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-lg">Converting...</span>
              </div>
            ) : (
              <span className="text-lg relative z-10">Convert Currency</span>
            )}
          </button>

          {/* Exchange Rate Display */}
          {convertedAmount > 0 && (
            <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600/50 rounded-2xl backdrop-blur-sm animate-slide-in">
              <p className="text-gray-300 text-sm text-center font-medium">
                1 {from} = <span className="text-blue-400 font-bold">{(1 * currencyinfo[to]).toFixed(4)}</span> {to}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">Powered by ExchangeRate-API</p>
        </div>
      </div>
    </div>
  );
}

export default App;
