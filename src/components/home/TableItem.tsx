import { Th, Tr } from "@chakra-ui/react";

interface TableItemProps {
  item: {
    num: number;
    fromAddress: string;
    toAddress: string;
    value: string;
  };
}

const TableItem = ({ item }: TableItemProps) => {
  return (
    <Tr>
      <Th>{item.num}</Th>
      <Th textAlign='center'>{item.fromAddress}</Th>
      <Th textAlign='center'>{item.toAddress}</Th>
      <Th textAlign='center'>{item.value}</Th>
    </Tr>
  );
};

export default TableItem;
