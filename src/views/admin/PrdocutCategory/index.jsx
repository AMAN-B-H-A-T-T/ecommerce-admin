import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Grid,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    useDisclosure,
    useColorModeValue,
    Text,
    Tr,
    Button,
    
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import CategoryForm from './components/CategoryForm';
import Card from "components/card/Card.js";
import { APImiddleware } from 'globalFunction/Apimiddleware';
import axios from 'axios';
import UpdateDrawer from './components/UpdateDrawer';
const Index = () => {
    const [product_category, set_product_category] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category, set_category] = useState("");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const getCategory = async () => {
        const axiosInstance = axios.create()
        const header = {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': true
        }
        const endpoint = "api/category/allCategory"
        const method = "get"
        const response_obj = await APImiddleware(axiosInstance, endpoint, method, header, null, null)
        if (response_obj.error === false) {
            let response = response_obj.response
            set_product_category(response.data.data)
        }
    }
    try {

        useEffect(() => {
            getCategory()
        }, []);
    }
    catch (error) {
        alert(error)
    }
    const onUpdateHandel = ()=>{
        
        onOpen()
      }

      const onHandelDelete =  async(id) =>{
            const axioInstance = axios.create()
            const header = {
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': true
            }
            const params = {
                'categoryId':id
            }
            console.log(params);
            const endpoint = `api/category/deleteCategory`
            const method = "delete"
            const response_obj = await APImiddleware(axioInstance,endpoint,method,header,null,params)
            console.log(response_obj);
            if(response_obj.error === false){
                const response = response_obj.response
                const newArray = product_category.filter(item => item._id !== id)
                console.log(newArray);
                set_product_category(newArray)
                console.log(response.data);
            }
      }
    return (
        <>
            <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
                {/* Main Fields */}
                <CategoryForm set_product_category={set_product_category}></CategoryForm>
                <UpdateDrawer onOpen={onOpen} onClose={onClose} isOpen={isOpen} category={category} set_product_category={set_product_category}></UpdateDrawer>
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
                                            <Th textAlign={'center'}>Category Name</Th>
                                            <Th textAlign={'center'}>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            product_category.length > 0 ? product_category.map((item, key) => (
                                                <Tr key={key}>
                                                    <Td textAlign={'center'}>{item.category_name}</Td>
                                                    <Flex justifyContent={'center'}>
                                                        <Button
                                                            colorScheme='red'
                                                            margin={'4px'}
                                                            
                                                            onClick={(e) => {
                                                                onHandelDelete(item._id)
                                                                }}>
                                                            <MdDelete size={25}></MdDelete>
                                                        </Button>
                                                        <Button
                                                            variant='brand'
                                                            margin={'4px'}
                                                            onClick={(e) => {
                                                                set_category(item)
                                                                onUpdateHandel();
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
        </>
    );
}

export default Index;
