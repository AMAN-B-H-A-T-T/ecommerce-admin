import {
  Avatar,
  Box,
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TopCreatorTable(props) {


  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Product List
          </Text>
        </Flex>
        <Table variant='simple' color='gray.500'>
          <Thead>
            <Tr>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Product
                </Flex>
              </Th>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Category
                </Flex>
              </Th>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Quentity
                </Flex>
              </Th>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Price
                </Flex>
              </Th>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Image
                </Flex>
              </Th>
              <Th
                pe='10px'
                borderColor='transparent'>
                <Flex
                  justify='space-between'
                  align='center'
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color='gray.400'>
                  Actions
                </Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody >
            <Tr>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Flex>
                <Button variant="brand">update</Button>
                <Button variant="brand">update</Button>
              </Flex>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
              <Td>1</Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default TopCreatorTable;
