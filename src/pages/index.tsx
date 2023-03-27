import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Web3 from "web3";
import { Transaction } from "web3-core";
import { BlockHeader } from "web3-eth";
import TableList from "@/components/home/TableList";
import { Flex, Spinner } from "@chakra-ui/react";

const web3 = new Web3(
  Web3.givenProvider ||
    "wss://eth-mainnet.alchemyapi.io/v2/GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W"
);

export default function Home() {
  const [blockHeader, setBlockHeader] = useState<BlockHeader>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hideZeroValue, setHideZeroValue] = useState(true);

  console.log("TRANSACTIONS", transactions);
  useEffect(() => {
    const subscription = web3.eth
      .subscribe("newBlockHeaders", function (error, result) {
        if (!error) {
          console.log(result);

          return;
        }

        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", function (blockHeader) {
        setIsLoading(true);
        console.log("BLOCK HEADER", blockHeader);
        setBlockHeader(blockHeader);
        web3.eth.getBlock(blockHeader.hash).then((blockData) => {
          console.log("blockData", blockData);
          console.log("count", blockData.transactions.length);
          Promise.all(
            blockData.transactions.map((txnHash) => {
              return web3.eth.getTransaction(txnHash);
            })
          )
            .then((transactions) => setTransactions(transactions))
            .finally(() => setIsLoading(false));
        });
      })
      .on("error", console.error);
    // unsubscribes the subscription
    return () => {
      subscription.unsubscribe(function (error, success) {
        if (success) {
          console.log("Successfully unsubscribed!");
        }
      });
    };
  }, []);

  return (
    <section className={styles.main}>
      <Flex w='100%' justifyContent='space-between'>
        <p>Block Height: {blockHeader?.number ?? " - "}</p>
        {isLoading && (
          <Spinner m='auto' mx='10px' w='20px' h='20px' size='lg' />
        )}
      </Flex>
      <TableList
        transactions={transactions}
        hideZeroValue={hideZeroValue}
        toggleZeroValue={() => setHideZeroValue((prevState) => !prevState)}
      />
    </section>
  );
}
