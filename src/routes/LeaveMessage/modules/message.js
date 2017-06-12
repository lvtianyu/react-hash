import fetch from 'isomorphic-fetch'
import {baseUrl,debug} from '../../../utils/baseUrl'
export const HANDLE_CHANGE='HANDLE_CHANGE'
export const HANDLE_CLICK='HANDLE_CLICK'
export const RECEIVE_MESSAGE='RECEIVE_MESSAGE'
export const REQUEST_MESSAGE='REQUEST_MESSAGE'
export const INIT='INIT'
export const HANDLE_CLEARCLICK = "HANDLE_CLEARCLICK"

    var  planId =debug ? "9": sessionStorage.getItem('planId'),
         userName=debug ? 
         "31" : localStorage.getItem('userId') ? 
                              localStorage.getItem('userId') : localStorage.getItem('userName');
   


export function requestMessage(){
  return{
    type:REQUEST_MESSAGE
  }
}

export const receiveMessage=(value)=>({
  type:RECEIVE_MESSAGE,
  payload:value
})

export function handleChange(e){
  var c;
  if(e.target.value){
    c=true
  }else{
    c=false
  }
  return{
    type:HANDLE_CHANGE,
    payload:e.target.value,
    color:c,
  }
}

export function handleClearClick(){
  return{
    type:HANDLE_CLEARCLICK
  }
    
}

//让滚动条随时跟进到最底端

export function updatedUl(){
  var ul = document.querySelector('ul');
  ul.scrollTop=ul.scrollHeight;
}

export function init (){

    return (dispatch,getState)=>{
      let url=baseUrl+'/getLeaveMessage.do?'
    return fetch(url,{
            method: 'POST',
            headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
            body:"planId="+planId
    })
        .then(response=>response.json())
       .then(json =>{
         dispatch(receiveMessage(json.values))
         dispatch(handleClearClick())
         if(json.values.length>0){

          updatedUl()
         }
          console.log(1)
        })
    }
}

export function  handleClick(){
    return (dispatch,getState)=>{
          var value = getState().dataMessage.sayValue;
        if(value){
     let url=baseUrl+'/leaveMessage.do'
  
         return fetch(url,{
                method: 'POST',
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                body:"planId="+planId+"&content="+value+"&userId="+userName
         })
         .then(response=>response.json())
         .then(json =>{
          dispatch(init())
        })
        }
    }
}
export const actions={
    handleChange,
    handleClick,
    handleClearClick,
    init,
}  

const ACTION_HANDLERS={
  [REQUEST_MESSAGE]: (state) => {
    return ({...state,changeColor:false,fetching:false})
  },
  [RECEIVE_MESSAGE]: (state, action) => {
    return ({...state,fetching:true, messageList:action.payload})
  },
    [HANDLE_CLEARCLICK ]: (state) => {
    return ({...state, sayValue: "",changeColor:false})
  },
  [HANDLE_CHANGE]:(state,action)=>{
    return ({...state,sayValue:action.payload,changeColor:action.color})
  }

}

const initialState = {
    messageList:[],
    sayValue:"",
    changeColor:false,
    fetching:false
}

export default  function messageReducer(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}