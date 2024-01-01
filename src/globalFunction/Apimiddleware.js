import axios from "axios";
import base_url from "base_url";

const APImiddleware = async(reqInstance,endpoint,method,headers,body=null,params=null)=>{
    const access = localStorage.getItem('accessToken')    
    headers['Authorization'] = `Bearer ${access}`
    let response_obj
    console.log(params);
    if(method === 'get'){
        try{
            console.log(1);
            const response = await reqInstance.get(`${base_url}${endpoint}`,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'post'){
        try{
            console.log(2);
            const response = await reqInstance.post(`${base_url}${endpoint}`,body,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'delete'){
        try{

            console.log(params);
            console.log(3);
            const response = await reqInstance.delete(`${base_url}${endpoint}`,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'put'){
        try{
            console.log(4);
            const response =await reqInstance.put(`${base_url}${endpoint}`,body,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    return response_obj
}

export {APImiddleware}