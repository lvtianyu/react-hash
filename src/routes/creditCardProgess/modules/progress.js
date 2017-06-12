import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const OPEN_CLOSE = 'OPEN_CLOSE'






 //初始化数据
 function init() {
     let url=baseUrl+'/viewPlan.do'   
     return(dispatch,getState)=>{
            // return fetch(url,{
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded"
            //             },
            //         body:"planId="+planId+"&userId="+userName

            // }).then(response=>response.json())
            // .then(json=>{

                dispatch(initTaskList())

            // })
    

     }
 }

// 点击任务列表

function handleClickOpen() {
    return{
        type:OPEN_CLOSE,
        goToPage:true
    }
}

// 点击查看进度
function handleClickClose() {
     return{
        type:OPEN_CLOSE,
        goToPage:false
    }
}

 export const actions={
    handleClickOpen,
    handleClickClose
   
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
 [OPEN_CLOSE]: (state, action) =>{
     return({...state,
     goToPage:action.goToPage})
 }


}

const initialState = {
             
               goToPage:false,//
               fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}