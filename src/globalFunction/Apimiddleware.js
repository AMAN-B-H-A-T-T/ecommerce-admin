import axios from "axios";
import base_url from "base_url";

const APImiddleware = async(reqInstance,endpoint,method,headers,body=null,params=null)=>{
    const access = localStorage.getItem('accessToken')    
    headers['Authorization'] = `Bearer ${access}`
    let response_obj
    
    if(method === 'get'){
        try{
            
            const response = await reqInstance.get(`${base_url}${endpoint}`,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'post'){
        try{
            
            const response = await reqInstance.post(`${base_url}${endpoint}`,body,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'delete'){
        try{

            
            const response = await reqInstance.delete(`${base_url}${endpoint}`,{headers,params})
            response_obj = {'error':false,'response':response}
        }
        catch(error){
            response_obj = {'error':true,'response':error}
        }
    }
    else if(method === 'put'){
        try{
            
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