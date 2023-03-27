import axios from "axios";

const COINMARKETCAP_BASE_URL = "https://pro-api.coinmarketcap.com";

/** Returns price data
 *
 * @param coinId The HH AMM Program.
 * @returns price of 1 unit coinId in USD
 */
export const fetchPrice = async (coinId: number) => {
  try {
    const resp = await axios(
      `https://cors-anywhere.herokuapp.com/${COINMARKETCAP_BASE_URL}/v2/cryptocurrency/quotes/latest?id=${coinId}`,
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
