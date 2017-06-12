import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const TASK_LIST = 'TASK_LIST'



const initTaskList=(value)=>({
    type:TASK_LIST,
    ladList:value,
})

 //初始化数据
 function init() {
     var data = {}
     let url=baseUrl+'/ht/adapp/queryList'   
     return(dispatch,getState)=>{
            // return fetch(url,{
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/json"
            //             },
            //         body:JSON.stringify(data)

            // }).then(response=>response.json())
            // .then(json=>{
            //     if(json.code=='100'){
                    var value = [{
                        id:1,
                        ad_owner_id:1,
                        app_name:'链家',
                        app_type:1,
                        app_limit:100,
                        app_price:200,
                        re_price:200,
                        remark:'链家',
                        app_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496752051966&di=42869f6d914f0bcf668a26270497682c&imgtype=0&src=http%3A%2F%2Fsrc.onlinedown.net%2FPublic%2Fimages%2Fbigsoftimg%2Fandroidimg%2Fsimg%2F590000%2F587251.png',
                        app_rank:1
                    }]
                    dispatch(initTaskList(value))

            //     }

            // })
    

     }
 }



 export const actions={
    init,
   
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
         ladList:action.ladList ,
        })
  },



}

const initialState = {
               ladList:[],
             
               fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}