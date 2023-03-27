import axios from "axios";

let COINMARKETCAP_BASE_URL = "https://pro-api.coinmarketcap.com";

if (process.env.NODE_ENV === "development") {
  COINMARKETCAP_BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com";
}

/** Returns price data
 *
 * @param coinId The HH AMM Program.
 * @returns price of 1 unit coinId in USD
 */
export const fetchPrice = async (coinId: number) => {
  try {
    const resp = await axios(
      `${COINMARKETCAP_BASE_URL}/v2/cryptocurrency/quotes/latest?id=${coinId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COINMARKETCAP_KEY,
        },
      }
    );

    return resp.data.data[coinId].quote.USD.price;
  } catch (error) {
    //TODO - handle error case
  }
};
