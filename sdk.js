import axios from "axios";

const baseUrl = "http://localhost:8000";
const apiBaseUrl = "http://localhost:8000/api";

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

export function get_chat_messages(group_id,callBack,errorCallBack){
    sendRequest({
        url:`${apiBaseUrl}/chat/messages/get_group_messages/?group_id=${group_id}`,
        method:"GET"
    },callBack,errorCallBack);
}

export function rootTest(callBack, errorCallBack){
    sendRequest({
        url:`${apiBaseUrl}/`,
        method:"GET"
    },callBack,errorCallBack);
}

export function login(data,callBack,errorCallBack){
    sendRequest({
        url:`${baseUrl}/auth/login`,
        method:"POST",
        data: data
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