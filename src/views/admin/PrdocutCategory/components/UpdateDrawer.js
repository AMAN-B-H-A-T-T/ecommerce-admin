import React, { useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    useColorModeValue
  } from '@chakra-ui/react'
import axios from 'axios';
import { APImiddleware } from 'globalFunction/Apimiddleware';
const UpdateDrawer = ({isOpen , onOpen , onClose , ProductCategoryId , category , set_product_category}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [category_name, set_category_name] = useState("");

  const handelOnUpdate = async()=>{
    const header = {
      'Content-Type':'application/json'
    }
    const body = {
      'category_name':category_name
    }
    const params = {
      categoryId:category._id
    }
    const axiosInstance = axios.create()
    const endpoint = "api/category/updateCategory"
    const method = "put"
    try{
      const response_obj  = await APImiddleware(axiosInstance,endpoint,method,header,body,params)
      if(response_obj.error === false)
      {
        const response = response_obj.response
        set_product_category(prevArray => prevArray.map((item,key)=>{
            if(item._id === category._id){
              return {...item,category_name:category_name}
            }
            else{
              return item
            }
        }))
        onClose()
      }
    }
    catch(error){
      alert(error.message)
    }
  }
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Category</DrawerHeader>

          <DrawerBody>
          <FormControl>
          <FormLabel
           ms='4px'
           fontSize='md'
           fontWeight='500'
           color={textColor}
           mb='8px'
          >
            Category Name
          </FormLabel>
          <Input type="Text"
          isRequired={true}
          variant='auth'
          fontSize='md'
          ms={{ base: "0px", md: "0px" }}
          placeholder='Category Name'
          fontWeight='500'
          size='lg'
          defaultValue={category.category_name}
          onChange={e=>{set_category_name(e.target.value)}}
          ></Input>
          </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={(e)=>{handelOnUpdate()}}>Update</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  );
}

export default UpdateDrawer;
