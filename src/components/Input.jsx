import React, { useId } from "react";

// Currency flags mapping
const currencyFlags = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", 
  AUD: "🇦🇺", CAD: "🇨🇦", CHF: "🇨🇭", CNY: "🇨🇳",
  SEK: "🇸🇪", NZD: "🇳🇿", MXN: "🇲🇽", SGD: "🇸🇬",
  HKD: "🇭🇰", NOK: "🇳🇴", TRY: "🇹🇷", RUB: "🇷🇺",
  INR: "🇮🇳", BRL: "🇧🇷", ZAR: "🇿🇦", KRW: "🇰🇷",
  THB: "🇹🇭", PLN: "🇵🇱", ILS: "🇮🇱", DKK: "🇩🇰",
  CZK: "🇨🇿", HUF: "🇭🇺", CLP: "🇨🇱", PHP: "🇵🇭",
  AED: "🇦🇪", SAR: "🇸🇦", QAR: "🇶🇦", KWD: "🇰🇼",
  BHD: "🇧🇭", OMR: "🇴🇲", JOD: "🇯🇴", LBP: "🇱🇧",
  EGP: "🇪🇬", MAD: "🇲🇦", TND: "🇹🇳", DZD: "🇩🇿",
  LYD: "🇱🇾", SDG: "🇸🇩", ETB: "🇪🇹", KES: "🇰🇪",
  UGX: "🇺🇬", TZS: "🇹🇿", ZMW: "🇿🇲", BWP: "🇧🇼",
  SZL: "🇸🇿", LSL: "🇱🇸", MUR: "🇲🇺", SCR: "🇸🇨",
  MVR: "🇲🇻", LKR: "🇱🇰", BDT: "🇧🇩", NPR: "🇳🇵",
  PKR: "🇵🇰", AFN: "🇦🇫", IRR: "🇮🇷", IQD: "🇮🇶",
  SYP: "🇸🇾", YER: "🇾🇪", RSD: "🇷🇸", BGN: "🇧🇬",
  RON: "🇷🇴", UAH: "🇺🇦", BYN: "🇧🇾", MDL: "🇲🇩",
  GEL: "🇬🇪", AMD: "🇦🇲", AZN: "🇦🇿", KZT: "🇰🇿",
  UZS: "🇺🇿", KGS: "🇰🇬", TJK: "🇹🇯", TMT: "🇹🇲",
  MNT: "🇲🇳", KRW: "🇰🇷", VND: "🇻🇳", LAK: "🇱🇦",
  KHR: "🇰🇭", MMK: "🇲🇲", BND: "🇧🇳", MYR: "🇲🇾",
  IDR: "🇮🇩", FJD: "🇫🇯", PGK: "🇵🇬", SBD: "🇸🇧",
  VUV: "🇻🇺", WST: "🇼🇸", TOP: "🇹🇴", XPF: "🇵🇫",
  NCF: "🇳🇨", KID: "🇰🇮", TVD: "🇹🇻", BMD: "🇧🇲",
  BBD: "🇧🇧", BZD: "🇧🇿", GTQ: "🇬🇹", HNL: "🇭🇳",
  NIO: "🇳🇮", CRC: "🇨🇷", PAB: "🇵🇦", DOP: "🇩🇴",
  HTG: "🇭🇹", JMD: "🇯🇲", TTD: "🇹🇹", XCD: "🇦🇬",
  AWG: "🇦🇼", BOB: "🇧🇴", PYG: "🇵🇾", UYU: "🇺🇾",
  ARS: "🇦🇷", COP: "🇨🇴", VES: "🇻🇪", GYD: "🇬🇾",
  SRD: "🇸🇷", FKP: "🇫🇰", GIP: "🇬🇮", ISK: "🇮🇸",
  LRD: "🇱🇷", SLL: "🇸🇱", GMD: "🇬🇲", GNF: "🇬🇳",
  CVE: "🇨🇻", STN: "🇸🇹", AOA: "🇦🇴", ZWL: "🇿🇼",
  BIF: "🇧🇮", RWF: "🇷🇼", DJF: "🇩🇯", KMF: "🇰🇲",
  SOS: "🇸🇴", ERN: "🇪🇷", NAD: "🇳🇦", MZN: "🇲🇿",
  MWK: "🇲🇼", MGA: "🇲🇬", KMF: "🇰🇲", DJF: "🇩🇯",
  BIF: "🇧🇮", RWF: "🇷🇼", UGX: "🇺🇬", TZS: "🇹🇿",
  KES: "🇰🇪", ETB: "🇪🇹", SDG: "🇸🇩", LYD: "🇱🇾",
  DZD: "🇩🇿", TND: "🇹🇳", MAD: "🇲🇦", EGP: "🇪🇬",
  LBP: "🇱🇧", JOD: "🇯🇴", OMR: "🇴🇲", BHD: "🇧🇭",
  KWD: "🇰🇼", QAR: "🇶🇦", SAR: "🇸🇦", AED: "🇦🇪",
  PHP: "🇵🇭", CLP: "🇨🇱", HUF: "🇭🇺", CZK: "🇨🇿",
  DKK: "🇩🇰", ILS: "🇮🇱", PLN: "🇵🇱", THB: "🇹🇭",
  KRW: "🇰🇷", ZAR: "🇿🇦", BRL: "🇧🇷", INR: "🇮🇳",
  RUB: "🇷🇺", TRY: "🇹🇷", NOK: "🇳🇴", HKD: "🇭🇰",
  SGD: "🇸🇬", MXN: "🇲🇽", NZD: "🇳🇿", SEK: "🇸🇪",
  CNY: "🇨🇳", CHF: "🇨🇭", CAD: "🇨🇦", AUD: "🇦🇺",
  JPY: "🇯🇵", GBP: "🇬🇧", EUR: "🇪🇺", USD: "🇺🇸"
};

function Input({
    label,
    amount,
    onAmountChange,
    currency, 
    currencyOptions=[],
    onCurrencyChange,
    amountdisabled=false,
    currencydisabled=false,
    selectcurrencys
}){
    const amountid = useId();
    
    return(
        <div className="group">
            {/* Label */}
            <label htmlFor={amountid} className="block text-sm font-semibold text-gray-300 mb-3">
                {label}
            </label>
            
            {/* Input Container */}
            <div className="relative bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 transition-all duration-500 hover:border-gray-500/70 focus-within:border-blue-500/70 focus-within:shadow-lg focus-within:shadow-blue-500/20 group-hover:bg-gray-700/70">
                {/* Amount Input */}
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <input 
                            id={amountid}
                            type="number"
                            value={amount}
                            onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                            disabled={amountdisabled}
                            placeholder="0.00"
                            className="w-full bg-transparent text-white text-2xl font-bold placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>
                    
                    {/* Currency Selector */}
                    <div className="relative">
                        <select
                            value={selectcurrencys}
                            onChange={(e) => onCurrencyChange(e.target.value)}
                            disabled={currencydisabled}
                            className="appearance-none bg-gray-600/50 text-white font-semibold pr-12 pl-4 py-3 rounded-xl border border-gray-500/50 focus:outline-none focus:border-blue-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:bg-gray-600/70"
                        >
                            {currencyOptions.map((option) => (
                                <option key={option} value={option} className="bg-gray-700 text-white">
                                    {option}
                                </option>
                            ))}
                        </select>
                        
                        {/* Currency Flag */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <span className="text-xl">
                                {currencyFlags[selectcurrencys] || "💱"}
                            </span>
                        </div>
                        
                        {/* Dropdown Arrow */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                
                {/* Currency Name Display */}
                <div className="mt-4 text-xs text-gray-400 font-medium">
                    {selectcurrencys && (
                        <span className="inline-flex items-center space-x-2">
                            <span className="text-lg">{currencyFlags[selectcurrencys] || "💱"}</span>
                            <span className="text-blue-400">{selectcurrencys}</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Input;