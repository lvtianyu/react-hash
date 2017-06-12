import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const TASK_LIST = 'TASK_LIST'
const TASK_PROGRESS = 'TASK_PROGRESS'




const initTaskList=(value)=>({
    type:TASK_LIST,
    taskList:[],
    properssList:[]
})

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

function handleClickTask() {
    return{
        type:TASK_PROGRESS,
        isTask:true
    }
}

// 点击查看进度
function handleClickProgress() {
     return{
        type:TASK_PROGRESS,
        isTask:false
    }
}

 export const actions={
    init,
    handleClickTask,
    handleClickProgress
   
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
  [TASK_LIST]: (state, action) => {
    return ({...state,
         fetching:true,
         taskList:action.taskList ,
         properssList:action.properssList
        })
  },
  [TASK_PROGRESS]:(state,action) =>{
      return({
          ...state,
          isTask:action.isTask
      })
  }


}

const initialState = {
               taskList:[],
               properssList:[],
               isTask:true,//默认是任务列表，false是进度查看部分
               fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}