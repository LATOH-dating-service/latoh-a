import axios from "axios";

const serverAddress = "192.168.0.128:8000";
export const wsBaseUrl = `ws://${serverAddress}`;
export const baseUrl = `http://${serverAddress}`;
const apiBaseUrl = `http://${serverAddress}/api`;

function fetchRequest(path,config,callBack,errorCallBack){
    fetch(path,config).then((response)=>response.json()).then((response)=>{
        callBack(response);
    }).catch((error)=>{
        if(error.response === undefined){
            errorCallBack({
                success: false,
                message: "Connection failed!",
                data: null
            });
        } else {
            errorCallBack(error.response.data);
        }
    })
}

function sendRequest(config,callBack,errorCallBack){
    axios(config).then((response)=>{
        callBack(response.data);
    }).catch((error)=>{
        if(error.response === undefined){
            errorCallBack({
                success: false,
                message: "Connection failed!",
                data: null
            });
        } else {
            errorCallBack(error.response.data);
        }
    });
}

export function loginUser(data,callBack,errorCallBack){
    sendRequest({
        url:`${baseUrl}/api-token-auth/`,
        method:"POST",
        data: data
    },callBack,errorCallBack);
}

export function getChatMessages(token,group_id,callBack,errorCallBack){
    sendRequest({
        url:`${apiBaseUrl}/chat/messages/get_group_messages/?group_id=${group_id}`,
        method:"GET",
        headers: {
            'Authorization':`Token ${token}`
        }
    },callBack,errorCallBack);
}

export function getMeets(token,callBack,errorCallBack){
    sendRequest({
        url:`${apiBaseUrl}/meet/`,
        method:"GET",
        headers: {
            'Authorization':`Token ${token}`
        }
    },callBack,errorCallBack);
}

export function getFullMeets(token,callBack,errorCallBack){
    fetchRequest(`${apiBaseUrl}/meet/get_full_meets/`, {
        method:'GET',
        headers: {
            'Authorization':`Token ${token}`
        }
    }, callBack,errorCallBack);
}

export function postMeet(token,data,callBack,errorCallBack){
    fetchRequest(`${apiBaseUrl}/meet/`,{
        method:"POST",
        body:data,
        headers: {
            'Authorization':`Token ${token}`
        }
    },callBack,errorCallBack);
}

export function rootTest(callBack, errorCallBack){
    sendRequest({
        url:`${apiBaseUrl}/chat/users/`,
        method:"GET"
    },callBack,errorCallBack);
}

export function register(data,callBack,errorCallBack){
    sendRequest({
        url:`${baseUrl}/auth/register`,
        method:"POST",
        data: data
    },callBack,errorCallBack);
}

export function loggedInUser(token,callBack,errorCallBack){
    sendRequest({
        url:`${baseUrl}/faculty/profile/user`,
        method:"GET",
        headers: {
            'Authorization':`Token ${token}`
        }
    },callBack,errorCallBack);
}