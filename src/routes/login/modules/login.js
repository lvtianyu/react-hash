import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const HANDEL_VERIFICATIONTEXT = 'HANDEL_VERIFICATIONTEXT'
const HANDLE_CHANGEPHONE ='HANDLE_CHANGEPHONE'
const HANDLE_CHANGEVERIFICATION ='HANDLE_CHANGEVERIFICATION'
const HANDLE_VERIFICATIONSTYLE = 'HANDLE_VERIFICATIONSTYLE'

var isClickVerificationBtn = false//点击过才能提交

// 输入手机号
function handleChangePhone(e) {
  var phoneCode  = (/^1(3|4|5|7|8)\d{9}$/.test(e.target.value)) ? e.target.value: false;
  
  return{
    type:HANDLE_CHANGEPHONE,
    phoneCode:phoneCode,
  }
}

//输入验证码
function handleChangeVerification(e) {
  var verificationCode  = (/^\d{4}$/.test(e.target.value)) ? e.target.value: false;
  
  return{
    type:HANDLE_CHANGEVERIFICATION,
    verificationCode:verificationCode,
  }
}

//点击获取验证码
function handleClickVerification() {
    return (dispatch, getState)=>{
          var isgetVerificationCode = getState().dataLogin.isgetVerificationCode;
          var phoneCode = getState().dataLogin.phoneCode
          console.log(phoneCode,isgetVerificationCode)
          if(phoneCode){
               if ( isgetVerificationCode ) {
                    isClickVerificationBtn = true//
                    intervalFn(dispatch) 
                    //todo
                }
          } else {
                alterFn('手机号不正确请检查')
          }
         

    }

}


function intervalFn(dispatch) {
    var i = 60;
            dispatch(verificationStyle(false))
            var time = setInterval(function(){
                if (!i) {
                    clearInterval(time)
                    dispatch(verificationStyle(true))
                    dispatch(verificationText(0))
                } else{
                    dispatch(verificationText(i))
                }
                i--
            },1000)
}
//

function verificationStyle(value) {

     return{
            type:HANDLE_VERIFICATIONSTYLE,
            isgetVerificationCode:value,
        }
}

//
function verificationText(i) {
    var verificationText = (i!=0) ? `已发送(${i}s)`:'发送验证码'
    return{
        type:HANDEL_VERIFICATIONTEXT,
        verificationText:verificationText
    }
}

 //登陆数据

function handleClickSubmit() {
        return (dispatch,getState)=>{
          var phoneCode = getState().dataLogin.phoneCode
          var verificationCode = getState().dataLogin.verificationCode

          if (isClickVerificationBtn) {
             if(verificationCode && phoneCode){
                // let url=baseUrl+'/leaveMessage.do'
            
                //     return fetch(url,{
                //             method: 'POST',
                //             headers: {
                //             "Content-Type": "application/x-www-form-urlencoded"
                //             },
                //             body:"planId="+planId+"&content="+value+"&userId="+userName
                //     })
                //     .then(response=>response.json())
                //     .then(json =>{

                //     })
                location.href="http://10.254.120.85:3000/"
            } else {
                alterFn('电话号码或验证码有误！请检查')
            }
          } else {
             alterFn('请获取验证码')
          }

       
    }
}



 export const actions={
    handleClickVerification,
    handleClickSubmit,
    handleChangePhone,
    handleChangeVerification
   
}  

const ACTION_HANDLERS={
  [REQUEST_FN]: (state) => {
    return ({...state,fetching:false})
  },
  [RECEIVE_FN]: (state, action) => {
    return ({...state,
         fetching:true,
        })
  },
  [HANDLE_CHANGEPHONE] : (state,action) => {
    return ({...state,
        phoneCode : action.phoneCode
    })
  },
  [HANDLE_CHANGEVERIFICATION]:(state,action)=>{
      return({...state,verificationCode:action.verificationCode,})
  },
  [HANDLE_VERIFICATIONSTYLE]:(state,action)=>{
      return({...state,
          isgetVerificationCode:action.isgetVerificationCode})
  },
  [HANDEL_VERIFICATIONTEXT]:(state,action)=>{
      return({...state,verificationText:action.verificationText})
  }

}

const initialState = {
               verificationCode:false,
               isgetVerificationCode:true,//可以点击验证码按钮
               phoneCode:false,
               verificationText:'发送验证码',
               fething:false,
               notice:'true'
}

export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}