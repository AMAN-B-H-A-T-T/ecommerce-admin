import React, { useState } from 'react';
import { Button, Flex, Link, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useColorModeValue, Grid, Textarea, Select } from "@chakra-ui/react";
import axios from 'axios';
import { APImiddleware } from 'globalFunction/Apimiddleware';
const CategoryForm = ({set_product_category}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [category_name, set_category_name] = useState("");
   
    const onCategorySubmitHandel = async (e)=>{
      e.preventDefault()
      const body = {
        'category_name':category_name
      }
      const header = {
        'Content-Type':'application/json'
      }
      const reqInstance = axios.create()
      const endpoint = "api/category/createCategory"
      const method = "post"
      const res_obj = await APImiddleware(reqInstance,endpoint,method,{heders:header},body,null)
      if(res_obj.error === false){
        const response = res_obj.response.data
        set_product_category(prevArray => [...prevArray, response.data])
      }
    }
  return (
    <>
      <Flex
      direction='column'
      bgColor={'#ffffff'}
      bgSize='cover'
      marginBottom={'20px'}
      >
      <Flex flexDirection='row' bgColor={'#F7FAFC'}>
        <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700' padding={'10px'}>
          Product Category
        </Text>
      </Flex>
      <Grid templateColumns='repeat(1, 1fr)' gap={6} padding={'20px'}>
        <FormControl>
          <FormLabel
           ms='4px'
           fontSize='md'
           fontWeight='500'
           color={textColor}
           mb='8px'
          >
            Product Name
          </FormLabel>
          <Input type="Text"
          isRequired={true}
          variant='auth'
          fontSize='md'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Product Name'
          fontWeight='500'
          size='lg'
          onChange={(e)=>{set_category_name(e.target.value)}}
          ></Input>
        </FormControl>
      </Grid>
      
      <Button
       mb='20px'
       marginLeft={'20px'}
       marginRight={'20px'}
       mt={{ base: "20px", "2xl": "auto" }}
       variant='brand'
       fontWeight='500'
       onClick={(e)=>{onCategorySubmitHandel(e)}}
      >Add Product</Button>
      
    </Flex>
    </>
  );
}

export default CategoryForm;
