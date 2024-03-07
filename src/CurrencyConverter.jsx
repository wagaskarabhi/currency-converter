import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./CurrencyConverter.css";
import { LuArrowDownUp } from "react-icons/lu";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [switchCurrencies, setSwitchCurrencies] = useState(false);

  useEffect(() => {
    // Fetch currencies from an API
    const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
    axios
      .get(apiUrl)
      .then((response) => {
        const options = Object.keys(response.data.rates).map((currency) => ({
          value: currency,
          label: `${currency} (${getCountryName(currency)})`,
        }));
        setCurrencies(options);
        // Set default currencies
        setFromCurrency(options[0]);
        setToCurrency(options[1]);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  // Helper function to get country name from currency code
  const getCountryName = (currencyCode) => {
    // Simplified mapping, replace it with a comprehensive dataset
    const countryMap = {
      AED: "United Arab Emirates",
      AFN: "Afghanistan",
      ALL: "Albania",
      AMD: "Armenia",
      ANG: "Netherlands Antilles",
      AOA: "Angola",
      ARS: "Argentina",
      AUD: "Australia",
      AWG: "Aruba",
      AZN: "Azerbaijan",
      BAM: "Bosnia and Herzegovina",
      BBD: "Barbados",
      BDT: "Bangladesh",
      BGN: "Bulgaria",
      BHD: "Bahrain",
      BIF: "Burundi",
      BMD: "Bermuda",
      BND: "Brunei",
      BOB: "Bolivia",
      BRL: "Brazil",
      BSD: "Bahamas",
      BTN: "Bhutan",
      BWP: "Botswana",
      BYN: "Belarus",
      BZD: "Belize",
      CAD: "Canada",
      CHF: "Switzerland",
      CLP: "Chile",
      CNY: "China",
      COP: "Colombia",
      CRC: "Costa Rica",
      CUP: "Cuba",
      CVE: "Cape Verde",
      CZK: "Czech Republic",
      DJF: "Djibouti",
      DKK: "Denmark",
      DOP: "Dominican Republic",
      DZD: "Algeria",
      EGP: "Egypt",
      ERN: "Eritrea",
      ETB: "Ethiopia",
      EUR: "Eurozone",
      FJD: "Fiji",
      FKP: "Falkland Islands",
      FOK: "Faroe Islands",
      GEL: "Georgia",
      GGP: "Guernsey",
      GHS: "Ghana",
      GIP: "Gibraltar",
      GMD: "Gambia",
      GNF: "Guinea",
      GTQ: "Guatemala",
      GYD: "Guyana",
      HKD: "Hong Kong",
      HNL: "Honduras",
      HRK: "Croatia",
      HTG: "Haiti",
      HUF: "Hungary",
      IDR: "Indonesia",
      ILS: "Israel",
      IMP: "Isle of Man",
      INR: "India",
      IQD: "Iraq",
      IRR: "Iran",
      ISK: "Iceland",
      JEP: "Jersey",
      JMD: "Jamaica",
      JOD: "Jordan",
      JPY: "Japan",
      KES: "Kenya",
      KGS: "Kyrgyzstan",
      KHR: "Cambodia",
      KID: "Kiribati",
      KRW: "South Korea",
      KWD: "Kuwait",
      KYD: "Cayman Islands",
      KZT: "Kazakhstan",
      LAK: "Laos",
      LBP: "Lebanon",
      LKR: "Sri Lanka",
      LRD: "Liberia",
      LSL: "Lesotho",
      LYD: "Libya",
      MAD: "Morocco",
      MDL: "Moldova",
      MGA: "Madagascar",
      MKD: "North Macedonia",
      MMK: "Myanmar",
      MNT: "Mongolia",
      MOP: "Macau",
      MRU: "Mauritania",
      MUR: "Mauritius",
      MVR: "Maldives",
      MWK: "Malawi",
      MXN: "Mexico",
      MYR: "Malaysia",
      MZN: "Mozambique",
      NAD: "Namibia",
      NGN: "Nigeria",
      NIO: "Nicaragua",
      NOK: "Norway",
      NPR: "Nepal",
      NZD: "New Zealand",
      OMR: "Oman",
      PAB: "Panama",
      PEN: "Peru",
      PGK: "Papua New Guinea",
      PHP: "Philippines",
      PKR: "Pakistan",
      PLN: "Poland",
      PYG: "Paraguay",
      QAR: "Qatar",
      RON: "Romania",
      RSD: "Serbia",
      RUB: "Russia",
      RWF: "Rwanda",
      SAR: "Saudi Arabia",
      SBD: "Solomon Islands",
      SCR: "Seychelles",
      SDG: "Sudan",
      SEK: "Sweden",
      SGD: "Singapore",
      SHP: "Saint Helena",
      SLL: "Sierra Leone",
      SOS: "Somalia",
      SRD: "Suriname",
      SSP: "South Sudan",
      STN: "Sao Tome and Principe",
      SYP: "Syria",
      SZL: "Eswatini",
      THB: "Thailand",
      TJS: "Tajikistan",
      TMT: "Turkmenistan",
      TND: "Tunisia",
      TOP: "Tonga",
      TRY: "Turkey",
      TTD: "Trinidad and Tobago",
      TWD: "Taiwan",
      TZS: "Tanzania",
      UAH: "Ukraine",
      UGX: "Uganda",
      USD: "United States",
      UYU: "Uruguay",
      UZS: "Uzbekistan",
      VES: "Venezuela",
      VND: "Vietnam",
      VUV: "Vanuatu",
      WST: "Samoa",
      XAF: "Central African CFA franc",
      XCD: "East Caribbean dollar",
      XDR: "Special Drawing Rights",
      XOF: "West African CFA franc",
      XPF: "CFP franc",
      YER: "Yemen",
      ZAR: "South Africa",
      ZMW: "Zambia",
      ZWL: "Zimbabwe",
    };

    return countryMap[currencyCode] || currencyCode;
  };

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
    convertCurrency(amount, selectedOption, toCurrency);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption);
    convertCurrency(amount, fromCurrency, selectedOption);
  };

  const handleSwitchCurrencies = () => {
    // Switch the "From" and "To" currencies
    setSwitchCurrencies(!switchCurrencies);
    // Swap the currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Convert with the new currencies
    convertCurrency(amount, toCurrency, fromCurrency);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
    convertCurrency(value, fromCurrency, toCurrency);
  };

  const convertCurrency = (value, fromCurrency, toCurrency) => {
    if (fromCurrency && toCurrency) {
      const baseCurrency = "USD"; // You can change this to another base currency if needed
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const fromRate = response.data.rates[fromCurrency.value];
          const toRate = response.data.rates[toCurrency.value];
          const result = (value * toRate) / fromRate;
          setConvertedAmount(result.toFixed(2));
        })
        .catch((error) => console.error("Error converting currency:", error));
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div className="input-container">
        <label>Amount :</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="amount-input"
        />
      </div>

      <div className="currency-selector">
        <label>From Currency :</label>
        <Select
          options={currencies}
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          isSearchable
          className="currency-select"
          placeholder="Search for a currency..."
        />
      </div>

      <div className="switch-icon">
        <LuArrowDownUp onClick={handleSwitchCurrencies} />
      </div>

      <div className="currency-selector">
        <label>To Currency :</label>
        <Select
          options={currencies}
          value={toCurrency}
          onChange={handleToCurrencyChange}
          isSearchable
          className="currency-select"
          placeholder="Search for a currency..."
        />
      </div>

      {convertedAmount !== null && (
        <div className="result">
          <h2>Converted Amount :</h2>
          <p>
            {convertedAmount} {toCurrency.value}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
