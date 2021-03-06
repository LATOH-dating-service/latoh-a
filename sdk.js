import axios from "axios";

const baseUrl = "http://192.168.43.144:8000";
const apiBaseUrl = "http://192.168.43.144:8000/api";

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