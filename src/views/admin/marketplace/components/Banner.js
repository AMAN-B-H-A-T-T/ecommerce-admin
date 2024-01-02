import React, { useEffect, useState , useContext } from "react";

// Chakra imports
import { Button, Flex, Link, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useColorModeValue, Grid, Textarea, Select } from "@chakra-ui/react";
import axios from "axios";
import { APImiddleware } from "globalFunction/Apimiddleware";
import { Store } from "globalStore/store";

export default function Banner({set_product_list}) {
  // Chakra Color Mode
  
  const [ProductName, setProductName] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductQuentity, setProductQuentity] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const [category_list, set_category_list] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {category_list_global} = state
  const loadCategory = async()=>{
    const header = {
      'Content-Type':'application/json'
    }
    const axiosInstance = axios.create()
    const endpoint = "api/category/allCategory"
    const method = "get"
    const requenst_obj = await APImiddleware(axiosInstance,endpoint,method,header)
    if(requenst_obj.error === false){
      const response = requenst_obj.response
      set_category_list(response.data.data)
      ctxDispatch({ type: 'SET_CATEGORY_LIST', payload: response.data.data })
    }
  }

  const handleOnProductSubmit = async()=>{
    const header = {
      'Content-Type':'multipart/form-data'
    }
    const formData = new FormData()
    formData.append('file',ProductImage)
    formData.append('productName',ProductName)
    formData.append('category_name',ProductCategory)
    formData.append('productDescription',ProductDescription)
    formData.append('productPrice',ProductPrice)
    formData.append('productQuentity',ProductQuentity)
    
    const endpoint = "api/products/addItem"
    const axiosInstance = axios.create()
    const method = "post"

    const response_obj = await APImiddleware(axiosInstance,endpoint,method,header,formData)
    if(response_obj.error === false){
      const response = response_obj.response
      console.log(response.data.data);
      set_category_list(preArray => [...preArray,response.data.data])
    }
  }


  useEffect(() => {
    loadCategory()
  }, []);
  return (
    <Flex
      direction='column'
      bgColor={'#ffffff'}
      bgSize='cover'
      marginBottom={'20px'}
      >
      <Flex flexDirection='row' bgColor={'#F7FAFC'}>
        <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700' padding={'10px'}>
          Add Product Details
        </Text>
      </Flex>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} paddingTop={'20px'} padding={'20px'}>
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
          
          fontSize='md'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Product Name'
          mb='24px'
          fontWeight='500'
          size='md'
          onChange={e=>{setProductName(e.target.value)}}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
          ms='4px'
          fontSize='md'
          fontWeight='500'
          color={textColor}
          mb='8px'
          >
            Product Category
          </FormLabel>
          <Select placeholder="Select Product Category" onChange={e=>{setProductCategory(e.target.value)}}>
            {
              category_list.length > 0 ? category_list.map((item, key) => (
                <option key={key} value={item.category_name}>{item.category_name}</option>
              )) : null
              
            }
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='md'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Base Price
          </FormLabel>
          <Input type="number"
          isRequired={true}
          
          fontSize='md'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Product Price'
          mb='24px'
          fontWeight='500'
          size='md'
          onChange={e=>{setProductPrice(e.target.value)}}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='md'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Quentity
          </FormLabel>
          <Input type="number"
            isRequired={true}
            
            fontSize='md'
            ms={{ base: "0px", md: "0px" }}
            placeholder='Product Quentity'
            mb='24px'
            fontWeight='500'
            size='md'
            onChange={e=>{setProductQuentity(e.target.value)}}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='md'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Product Picture
          </FormLabel>
          <Input type="file" padding={'5px'}
            isRequired={true}
            
            fontSize='md'
            ms={{ base: "0px", md: "0px" }}
            placeholder='Product Picture'
            mb='24px'
            fontWeight='500'
            size='md'
            onChange={e=>{setProductImage(e.target.files[0])}}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='md'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Product Description
          </FormLabel>
          <Textarea
          isRequired={true}
          onChange={e=>{setProductDescription(e.target.value)}}
          ></Textarea>
        </FormControl>
      </Grid>
      
      <Button
       mb='20px'
       marginLeft={'20px'}
       marginRight={'20px'}
       mt={{ base: "20px", "2xl": "auto" }}
       variant='brand'
       fontWeight='500'
       onClick={e=>{handleOnProductSubmit(e)}}
      >Add Product</Button>
      
    </Flex>
  );
}
