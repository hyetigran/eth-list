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
import { useMemo } from "react";

interface TableListProps {
  transactions: Transaction[];
  hideZeroValue: boolean;
  toggleZeroValue: () => void;
}

const TableList = ({
  transactions,
  hideZeroValue,
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
          {filteredTransactions.map((item, idx) => (
            <TableItem
              key={idx}
              item={{
                num: idx + 1,
                fromAddress: item.from,
                toAddress: item.to ?? " - ",
                value: item.value,
              }}
            />
          ))}
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
