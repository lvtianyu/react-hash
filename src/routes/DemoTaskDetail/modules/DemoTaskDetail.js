import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'

const RECEIVE_FN = 'RECEIVE_FN'
const REQUEST_FN = 'REQUEST_FN'
const DETAIL_MESSAGE = 'DETAIL_MESSAGE'
const TASK_PROGRESS = 'TASK_PROGRESS'


const oGetVars = {};

(function (sSearch) {
    var rNull = /^\s*$/,
        rBool = /^(true|false)$/i;
    function buildValue(sValue) {
        if (rNull.test(sValue)) {
            return null;
        }
        if (rBool.test(sValue)) {
            return sValue.toLowerCase() === "true";
        }
        if (isFinite(sValue)) {
            return parseFloat(sValue);
        }
        if (isFinite(Date.parse(sValue))) {
            return new Date(sValue);
        }
        return sValue;
    }
    if (sSearch.length > 1) {
        for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
            aItKey = aCouples[nKeyId].split("=");
            oGetVars[decodeURIComponent(aItKey[0])] = aItKey.length > 1
                ? buildValue(decodeURIComponent(aItKey[1]))
                : null;
            //此处将unescape()替换了
        }
    }
})(location.href.split("#")[1]);


const initMessage=(value)=>({
    type:DETAIL_MESSAGE,
             app_price:oGetVars.app_price ,
            remark:oGetVars.remark,
            app_rank:oGetVars.app_rank
})

 //初始化数据
 function init() {
     return(dispatch,getState)=>{
        
        // var value = {
        //     app_price:oGetVars.app_price ,
        //     remark:oGetVars.remark,
        //     app_rank:oGetVars.app_rank
        // }
        // value = JSON.stringify
        // sessionStorage.setItem("taskDetail",value)
        // var valueNew = sessionStorage.setItem("taskDetail")
        // valueNew = JSON.parse(valueNew)
        dispatch(initMessage())
    

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
  [DETAIL_MESSAGE]: (state, action) => {
    return ({...state,
         fetching:true,
         app_price:action.app_price ,
         remark:action.remark,
         app_rank:action.app_rank
        })
  },



}

const initialState = {
               app_price:0,
               remark:'',
               app_rank:1,
               fetching:false
           
}


export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}