import React, { useState, useContext, useEffect } from 'react';
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
    useColorModeValue,
    Select,
    Textarea,

} from '@chakra-ui/react'
import axios from 'axios';
import { APImiddleware } from 'globalFunction/Apimiddleware';
import { Store } from 'globalStore/store';
const ProductUpdate = ({ isOpen, onOpen, onClose, product, product_list, set_product_list }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { category_list_global, accessToken } = state
    const [ProductName, setProductName] = useState("");
    const [ProductCategory, setProductCategory] = useState("");
    const [ProductQuentity, setProductQuentity] = useState("");
    const [ProductPrice, setProductPrice] = useState("");
    const [ProductDescription, setProductDescription] = useState("");
    const [ProductImage, setProductImage] = useState(null);
      const handleOnUpdate = async()=>{
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
        const params = {
          productId:product._id
        }
        const axiosInstance = axios.create()
        const endpoint = "api/products/updateItem"
        const method = "put"
        try{
          const response_obj  = await APImiddleware(axiosInstance,endpoint,method,header,formData,params)
          if(response_obj.error === false)
          {
            const response = response_obj.response
            set_product_list(prevArray => prevArray.map((item,key)=>{
                if(item._id === product._id){
                  return {...item,...response.data.data}
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
      useEffect(() => {
        if(product){
            setProductName(product.productName)
            setProductDescription(product.productDescription)
            setProductCategory(product.categoryId.category_name)
            setProductPrice(product.productPrice)
            setProductQuentity(product.productQuentity)
            console.log("hello",ProductCategory);
        }
      }, [product]);
    return (
        <>
            {
                product != null ? (
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
                                <DrawerHeader>Update Product</DrawerHeader>

                                <DrawerBody>
                                    <FormControl marginBottom={'7px'}>
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
                                            placeholder='Category Name'
                                            fontWeight='500'
                                            size='md'
                                            defaultValue={product.productName}
                                            onChange={e=>{setProductName(e.target.value)}}
                                        ></Input>
                                    </FormControl>
                                    <FormControl marginBottom={'7px'}>
                                        <FormLabel
                                            ms='4px'
                                            fontSize='md'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'
                                        >
                                            Product Category
                                        </FormLabel>
                                        <Select placeholder='Selcet Category' onChange={e=>{setProductCategory(e.target.value)}}>
                                            {
                                                category_list_global.length > 0 ? category_list_global.map((item, key) => 
                                                    (
                                                        <option value={item.category_name} selected={item._id === product.categoryId._id ? true : false}>{item.category_name}</option>
                                                    )
                                                ) : null
                                            }

                                        </Select>
                                    </FormControl>
                                    <FormControl marginBottom={'7px'}>
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
                                            placeholder='Base Price'
                                            fontWeight='500'
                                            size='md'
                                            defaultValue={product.productPrice}
                                            onChange={e=>{setProductPrice(e.target.value)}}
                                        ></Input>
                                    </FormControl>
                                    <FormControl marginBottom={'7px'}>
                                        <FormLabel
                                            ms='4px'
                                            fontSize='md'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'
                                        >
                                            Produt Quentity
                                        </FormLabel>
                                        <Input type="number"
                                            isRequired={true}
                                            fontSize='md'
                                            ms={{ base: "0px", md: "0px" }}
                                            placeholder='Category Name'
                                            fontWeight='500'
                                            size='md'
                                            defaultValue={product.productQuentity}
                                            onChange={e=>setProductQuentity(e.target.value)}
                                        ></Input>
                                    </FormControl>
                                    <FormControl marginBottom={'7px'}>
                                        <FormLabel
                                            ms='4px'
                                            fontSize='md'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'
                                        >
                                            Product Picture
                                        </FormLabel>
                                        <Input type="file" paddingTop={'8px'}
                                            isRequired={true}

                                            fontSize='md'
                                            ms={{ base: "0px", md: "0px" }}
                                            placeholder='Category Name'
                                            fontWeight='500'
                                            size='md'
                                            onChange={e=>{setProductImage(e.target.files[0])}}
                                        ></Input>
                                    </FormControl>
                                    <FormControl marginBottom={'7px'}>
                                        <FormLabel
                                            ms='4px'
                                            fontSize='md'
                                            fontWeight='500'
                                            color={textColor}
                                            mb='8px'
                                        >
                                            Product Description
                                        </FormLabel>
                                        <Textarea onChange={e=>setProductDescription(e.target.value)}></Textarea>
                                    </FormControl>
                                </DrawerBody>

                                <DrawerFooter>
                                    <Button variant='outline' mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='blue' onClick={e=>{handleOnUpdate()}}>Update</Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </>
                ) : null
            }


        </>
    );
}

export default ProductUpdate;
