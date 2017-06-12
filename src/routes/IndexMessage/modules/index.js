import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const BASE_MESSAGE = 'BASE_MESSAGE'

const initBaseMessage=(value)=>({
    type:BASE_MESSAGE,
    baseMessage:value,
    
})
const date = new Date().getTime();
 //初始化数据
 function init() {
     const data = {id:1,start_date:date};
     let url=baseUrl+'/ht/appuser/query'   
     return (dispatch,getState)=>{
            // return fetch(url,{
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/json"
            //             },
            //         body:JSON.stringify(data)

            // }).then(response=>response.json())
            // .then(json=>{
                const vaule = {    real_income:10,//总金额
                day_income:0.1,//每日收入
                total_income:0.1,
                imageUrl:'',//需要设置一个默认头像
            };
                dispatch(initBaseMessage(vaule))

            // })
    

     };
 }
 export const actions={
    init
   
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
  [BASE_MESSAGE]: (state, action) => {
    return ({...state,
         fetching:true,
         baseMessage:action.baseMessage ,
       
        })
  },



}

const initialState = {
               baseMessage:{
                real_income:0,//总金额
                day_income:0,//每日收入
                total_income:0,
                imageUrl:'',//需要设置一个默认头像
               },
               fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}