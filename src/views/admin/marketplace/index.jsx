

import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  useDisclosure
} from "@chakra-ui/react";

// Custom components
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Banner from "views/admin/marketplace/components/Banner";
import Card from "components/card/Card.js";
import axios from "axios";
import { APImiddleware } from "globalFunction/Apimiddleware";
import ProductUpdate from "./components/ProductUpdate";

export default function Marketplace() {
  // Chakra Color Mode
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [product_list, set_product_list] = useState([]);
  const [product, set_product] = useState(null);
  const handelOnDelete = async(id)=>{
    const axioInstance = axios.create()
    const header = {
      "Content-Type":"application/json"
    }
    const params = {
      "productId":id
    }
    const endpoint = 'api/products/deleteItem'
    const method = "delete"
    const response_obj = await APImiddleware(axioInstance,endpoint,method,header,null,params)
    if(response_obj.error === false)
    {
      const response = response_obj.response
      const newArray = product_list.filter(item => item._id !== id)
      set_product_list(newArray)
    }
  }

  const handelOnLoad = async()=>{
    const header = {
      'Content-Type':'application/json'
    }
    const axiosInstance = axios.create()
    const endpoint = "api/products/allProducts"
    const method = "get"

    const response_obj = await APImiddleware(axiosInstance,endpoint,method,header)
    if(response_obj.error === false){
      const response = response_obj.response 
      console.log(response.data.data); 
      set_product_list(response.data.data)
    }
  }

  const handelOnUpdate = () => {
    onOpen()
  }
  useEffect(() => {
    handelOnLoad()
  }, []);




  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Banner set_product_list = {set_product_list}></Banner>
      <ProductUpdate isOpen={isOpen} onOpen={onOpen} onClose={onClose} product={product} product_list={product_list} set_product_list={set_product_list}></ProductUpdate>
      <Grid
                    mb='20px'
                    gap={{ base: "20px", xl: "20px" }}
                    display={{ base: "block", xl: "grid" }}>
                    <Flex flexDirection='column'>
                        <Card direction='column'
                            w='100%'
                            px='0px'
                            overflowX={{ sm: "scroll", lg: "hidden" }}>
                            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                                <Text
                                    color={textColor}
                                    fontSize='22px'
                                    fontWeight='700'
                                    lineHeight='100%'>
                                    Category List
                                </Text>
                            </Flex>
                            <Flex justify={'center'}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th textAlign={'center'}>Product Name</Th>
                                            <Th textAlign={'center'}>Category Name</Th>
                                            <Th textAlign={'center'}>Price</Th>
                                            <Th textAlign={'center'}>Quentity</Th>
                                            <Th textAlign={'center'}>Product Image</Th>
                                            <Th textAlign={'center'}>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            product_list.length > 0 ? product_list.map((item, key) => (
                                                <Tr key={key}>
                                                    <Td textAlign={'center'}>{item.productName}</Td>
                                                    <Td textAlign={'center'}>{
                                                      item.categoryId.category_name
                                                    }</Td>
                                                    <Td textAlign={'center'}>{item.productPrice}</Td>
                                                    <Td textAlign={'center'}>{item.productQuentity}</Td>
                                                    <Td textAlign={'center'}>view</Td>
                                                    <Flex justifyContent={'center'}>
                                                        <Button
                                                            colorScheme='red'
                                                            margin={'4px'}
                                                            
                                                            onClick={(e) => {
                                                                handelOnDelete(item._id)
                                                                }}>
                                                            <MdDelete size={25}></MdDelete>
                                                        </Button>
                                                        <Button
                                                            variant='brand'
                                                            margin={'4px'}
                                                            onClick={(e) => {
                                                                set_product(item)
                                                                handelOnUpdate()
                                                            }}>
                                                            <MdEdit size={25}></MdEdit>
                                                        </Button>
                                                    </Flex>
                                                </Tr>
                                            )
                                            ) :
                                                null
                                        }

                                    </Tbody>
                                </Table>
                            </Flex>
                        </Card>
                    </Flex>
                </Grid>
      {/* Delete Product */}
      
    </Box>
  );
}
