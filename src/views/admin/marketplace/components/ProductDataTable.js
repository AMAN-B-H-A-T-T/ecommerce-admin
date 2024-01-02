import React , { useEffect, useMemo , useState } from 'react';
import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import Card from "components/card/Card";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ProductDataTable = (props) => {
    const { columnsData, tableData} = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

   const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );    
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;
  console.log(tableInstance);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const onUpdateHandel = (e)=>{
    e.preventDefault()
    
  }
  
  useEffect(() => {
    console.log("object");
    console.log(tableInstance);
  }, [tableData]);
  return (
    <>
      <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          Check Table
        </Text>
      </Flex>
      {
  tableData.length > 0 ? (
    <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
      <Thead>
        {headerGroups.map((headerGroup, index) => (
          <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                pe='10px'
                key={index}
                borderColor={borderColor}>
                <Flex
                  justify='space-between'
                  align='center'
                  fontSize={'md'}
                  color='gray.400'>
                  {column.render("Header")}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                let data = "";
                if (cell.column.Header === "PRODUCT NAME") {
                  data = (
                    <Flex align='center'>
                      <Text
                        me='10px'
                        color={textColor}
                        fontSize='md'
                        fontWeight='700'>
                        {cell.value}
                      </Text>
                    </Flex>
                  );
                  
                } 
                else if (cell.column.Header === "CATEGORY") {
                  data = (
                    <Flex align='center'>
                      <Text
                        me='10px'
                        color={textColor}
                        fontSize='md'
                        fontWeight='700'>
                        {cell.value}
                      </Text>
                    </Flex>
                  );
                }
                else if (cell.column.Header === "PRICE") {
                  data = (
                    <Flex align='center'>
                      <Text
                        me='10px'
                        color={textColor}
                        fontSize='md'
                        fontWeight='700'>
                        {cell.value}
                      </Text>
                    </Flex>
                  );
                }
                else if (cell.column.Header === "QUENTITY") {
                  data = (
                    <Flex align='center'>
                      <Text
                        me='10px'
                        color={textColor}
                        fontSize='md'
                        fontWeight='700'>
                        {cell.value}
                      </Text>
                    </Flex>
                  );
                }
                else if (cell.column.Header === "ACTION") {
                  data = (
                    <Flex>
                      <Button
                        colorScheme='red'
                        margin={'4px'}
                        value={cell.value}
                        onClick={(e) => console.log(e.target.value)}>
                        <MdDelete size={25}></MdDelete>
                      </Button>
                      <Button
                        variant='brand'
                        margin={'4px'}
                        value={cell.value}
                        onClick={(e) => {
                          console.log(e.target.value);
                          onUpdateHandel(e);
                        }}>
                        <MdEdit size={25}></MdEdit>
                      </Button>
                    </Flex>
                  );
                }
                return (
                  <Td
                    {...cell.getCellProps()}
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor='transparent'>
                    {data}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  ) : null
}

      
    </Card>
    </>
  );
}

export default ProductDataTable;
