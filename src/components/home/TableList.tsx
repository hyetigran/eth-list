import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import TableItem from "./TableItem";
import { Transaction } from "web3-core";
import { fromWei } from "web3-utils";
import { useMemo } from "react";

interface TableListProps {
  transactions: Transaction[];
  hideZeroValue: boolean;
  ethPrice: number;
  toggleZeroValue: () => void;
}

const TableList = ({
  transactions,
  hideZeroValue,
  ethPrice,
  toggleZeroValue,
}: TableListProps) => {
  const filteredTransactions = useMemo(() => {
    if (!hideZeroValue) {
      return transactions;
    }
    return transactions.filter((txn) => txn.value !== "0");
  }, [transactions, hideZeroValue]);
  return filteredTransactions.length ? (
    <TableContainer
      justifyContent='center'
      boxShadow='xl'
      minW='343px'
      maxW='1250px'
      w='100%'
    >
      <Table variant='striped' justifyContent='center'>
        <Thead>
          <Tr backgroundColor={"blue.100"}>
            <Th>#</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th display='flex'>
              Value{" "}
              <Tooltip label='Toggle zero value transactions'>
                <Text cursor='pointer' onClick={toggleZeroValue}>
                  {hideZeroValue ? "(show)" : "(hide)"}
                </Text>
              </Tooltip>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map((item, idx) => {
            // Display eth value if price is unavailable
            const ethAmount = Number(fromWei(item.value, "ether"));
            const amount = ethPrice ? ethAmount * ethPrice : ethAmount;

            const displayValue = ethPrice
              ? `${amount.toFixed(2)} USD`
              : `${amount.toFixed(6)} ETH`;

            return (
              <TableItem
                key={idx}
                item={{
                  num: idx + 1,
                  fromAddress: item.from,
                  toAddress: item.to ?? " - ",
                  value: displayValue,
                }}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Flex>
      <Text>Empty list</Text>
    </Flex>
  );
};

export default TableList;
