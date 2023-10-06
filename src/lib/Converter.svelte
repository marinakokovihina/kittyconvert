<script>
  import {getRateFromApi} from "./getApiKey.ts";
  import {onMount} from "svelte";

  const abbreviation = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG",
    "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB",
    "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP",
    "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD",
    "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
    "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND",
    "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW",
    "ZWL"
  ]
  let defaultBaseCode = "CNY";
  let defaultTargetCode = "RUB";
  let defaultBaseValue = "0";
  let defaultTargetValue = "0";
  let conversion = 1;

  function roundingValue(num) {
    const rounded = Math.round(num * 100) / 100;
    return rounded === Math.floor(rounded)?rounded.toFixed(0):rounded.toFixed(2);
  }
  async function getRate() {
      conversion = await getRateFromApi(defaultBaseCode, defaultTargetCode);
  }

  function convert() {
    if (defaultBaseValue !== "") {
      const result = +defaultBaseValue * conversion;
      defaultTargetValue = Number.isNaN(result) ? "" : roundingValue(result).toString();
    }
  }
  function convertBack() {
    if (defaultTargetValue !== "") {
      defaultBaseValue = roundingValue(+defaultTargetValue / conversion).toString();
    } else {
      defaultBaseValue = ""; } }
  onMount(async () => {
    await getRate();
    convert();
  });
  $: getRate(), defaultBaseCode, defaultTargetCode;
  $: convert(), defaultBaseValue, conversion;
  $: convertBack(), defaultTargetValue, conversion;
</script>
<body>
<div id = "main">
  <div id="wrapper">
    <h1>Конвертер валют</h1>
    <form id="formConv">
      <select
              bind:value={defaultBaseCode}>
              {#each abbreviation as abbreviation}
              <option value={abbreviation}>{abbreviation}</option>
        {/each}
      </select>
      <input
              type="number"
              bind:value={defaultBaseValue}
              on:input={() => convert()}
              placeholder="Введите число"
      />

      <select bind:value={defaultTargetCode}>
        {#each abbreviation as abbreviation}
          <option value={abbreviation}>{abbreviation}</option>
        {/each}
      </select>
      <input
              type="number"
              bind:value={defaultTargetValue}
              on:input={() => convertBack()}
              placeholder="Введите число"
      />
    </form>
</div>
</div>
</body>
