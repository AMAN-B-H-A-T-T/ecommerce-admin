import React, { useState } from "react";

// Chakra imports
import { Button, Flex, Link, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useColorModeValue, Grid, Textarea, Select } from "@chakra-ui/react";


export default function Banner() {
  // Chakra Color Mode
  
  const [ProductName, setProductName] = useState("");
  const [ProductCategory, setProductCategory] = useState("");
  const [ProductQuentity, setProductQuentity] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductImage, setProductImage] = useState(null);
  const textColor = useColorModeValue("secondaryGray.900", "white");
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
           fontSize='sm'
           fontWeight='500'
           color={textColor}
           mb='8px'
          >
            Product Name
          </FormLabel>
          <Input type="Text"
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Product Name'
          mb='24px'
          fontWeight='500'
          size='lg'
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
          ms='4px'
          fontSize='sm'
          fontWeight='500'
          color={textColor}
          mb='8px'
          >
            Product Category
          </FormLabel>
          <Select placeholder="Select Product Category">
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Base Price
          </FormLabel>
          <Input type="number"
          isRequired={true}
          variant='auth'
          fontSize='sm'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Product Price'
          mb='24px'
          fontWeight='500'
          size='lg'
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Quentity
          </FormLabel>
          <Input type="number"
            isRequired={true}
            variant='auth'
            fontSize='sm'
            ms={{ base: "0px", md: "0px" }}
            placeholder='Product Quentity'
            mb='24px'
            fontWeight='500'
            size='lg'
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Product Picture
          </FormLabel>
          <Input type="file" padding={'5px'}
            isRequired={true}
            variant='auth'
            fontSize='sm'
            ms={{ base: "0px", md: "0px" }}
            placeholder='Product Picture'
            mb='24px'
            fontWeight='500'
            size='lg'
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'
          >
            Product Description
          </FormLabel>
          <Textarea
          isRequired={true}
          
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
      >Add Product</Button>
      
    </Flex>
  );
}
