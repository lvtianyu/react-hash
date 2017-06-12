import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const BASE_MESSAGE = 'BASE_MESSAGE'
const NICK_NAME = 'NICK_NAME'
const NICK_NAME_SHOW = 'NICK_NAME_SHOW'


const initBaseMessage=(value)=>({
    type:BASE_MESSAGE,
    id:value.id,
    nickName:value.nickName
})

 //初始化数据
 function init() {
     let url=baseUrl+'/'   
     return(dispatch,getState)=>{
            // return fetch(url,{
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //             },
            //         body:"planId="+planId+"&userId="+userName

            // }).then(response=>response.json())
            // .then(json=>{
                var value ={
                    id:888866,
                    nickName:'logan',

                }

                dispatch(initBaseMessage(value))

            // })
    

     }
 }

// 点击任务列表

function handleClickNick() {
    return{
        type:NICK_NAME_SHOW,
        isNick:true
    }
}

// 点击查看进度
function handleClickClose() {
     return{
        type:NICK_NAME_SHOW,
        isNick:false
    }
}

//
function handleChangeNick(e){
    var nickName  = e.target.value
    return{
        type:NICK_NAME,
        nickName:nickName
    }
}

 export const actions={
    init,
    handleClickNick,
    handleClickClose,
    handleChangeNick
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
  [BASE_MESSAGE]: (state, action) =>{
      return({
          ...state,
          fetching: true,
          baseMessage:action.baseMessage
      })
  },
  [NICK_NAME_SHOW]: (state, action) =>{
      return({
          ...state,
          isNick:action.isNick
      })
  },
  [NICK_NAME]: (state, action)=>{
      return({
          ...state,
          nickName:action.nickName
      })
  }

}

const initialState = {
                    id:888866,
                    nickName:'logan',
                    isNick:false,
                    fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}