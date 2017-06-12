import fetch from 'isomorphic-fetch'
import { baseUrl, debug } from '../../../utils/baseUrl'
import initWxJSSDK from '../../../utils/shareFile'
const RECEIVE_SECRET = 'RECEIVE_SECRET'
const REQUEST_SECRET = 'REQUEST_SECRET'
const REQUEST_LISTION_SECRET = 'REQUEST_LISTION_SECRET'
const HANDLE_CLICK_PAY_FLOOR = 'HANDLE_CLICK_PAY_FLOOR'
const HANDLE_CLICK = 'HANDLE_CLICK'
const CONTROL_PLAY = 'CONTROL_PLAY'
const GOOD_WORK = 'GOOD_WORK'
const RECORD_PLAY = 'RECORD_PLAY'
const PAY = 'PAY'
const LISTENING_IS_FREE = 'LISTENING_IS_FREE'
const HANDLE_CLICK_PAY = 'HANDLE_CLICK_PAY'
const HANDLE_CLICK_ZOOM_IN = 'HANDLE_CLICK_ZOOM_IN'
var
    isFree = '',    //全局变量
    ifFree = true,  //是否是付费项目
    ifPayed = true, //是否支付
    listenNum = 0,
    planId =debug ? "80": sessionStorage.getItem('planId') || localStorage.getItem('planId'),
    userName=debug ? 
         "31" : localStorage.getItem('userId') ? 
                              localStorage.getItem('userId') : localStorage.getItem('userName');

function requestSecret(){
    return{
        type:REQUEST_SECRET
    }
}

const receiveSecret=(value)=>({
    type:RECEIVE_SECRET,
    baseType:{
             title:value.target, //目标
             actor:value.planType,         //模版类型
             goal:value.description || '无', //目标描述
             describe:value.sentiment || '无', //事后感想描述
             imageUrl:value.imageUrl ,//发起者的头像地址
             imgList:value.imageList || [], //图片
             ifFree : value.ifFree //true表示可以免费听
            },
    messageNum:value.messageNum, //留言个数
    goodNum:value.supportNum, //点赞数量
    audience : value.listenNum, //偷听人数
    gooding:value.ifSupport
})

//change goodNum and gooding当页面点赞被点击时候的方法
function goodWork(value) {
    return{
        type:GOOD_WORK,
        goodNum:value.goodNum,
        gooding:value.gooding,//用来控制点赞css的变化的，但点击时候变为实心的
    }
}

//点赞
 function handleClick(){
     return(dispatch,getState)=>{
       
         var gooding= getState().dataSecret.gooding;
         if(!gooding){

        let url=baseUrl+'/supportPlanner.do'   

            return fetch(url,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                        },
                    body:"planId="+planId+"&userId="+userName

            }).then(response=>response.json())
            .then(json=>{
                var value={
                    goodNum:json.values.supportNum,
                    gooding:true
                }
                dispatch(goodWork(value))
            })

         }else{
            alert('不能重复点赞')
         }

     }
 }

//播放记录，第一次播放时记录
 function recordPlay(value) {
    return{
        type:RECORD_PLAY,
        audience:value.audience,
    }
}

function controlPlay(value) {
    return{
        type:CONTROL_PLAY,
        playing:value
    }
}

//公共的播放组件
function playingControl(dispatch,value){

            var myAudio = document.getElementById('audio')
            // alert(myAudio.networkState)
            myAudio.setAttribute("src", value)
            // 微信把此功能给屏蔽了，所以必须调用微信的WeixinJSBridge方法，而且微信浏览器将此功能更改了networkState
            //0 = NETWORK_EMPTY - 音频/视频尚未初始化
            //1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
            //2 ＝ NETWORK_LOADING - 浏览器正在下载数据
            //3 ＝ NETWORK_NO_SOURCE - 未找到音频/视频来源
            // 具体原因是audio中的src获取不到音频来源，所以NETWORK_NO_SOURCE＝3 
            // 所以我们要用WeixinJSBridge来监听网络状态，来解决此问题，网页获取用户网络状态
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
                // alert(e.err_msg);
                // alert(myAudio.getAttribute('src'))
                // myAudio.play();
                //监听当音频完事时候停止播放
                myAudio.addEventListener("ended",function(){

                    dispatch(controlPlay(false))
                },false)
                 myAudio.play();
                 dispatch(controlPlay(true))

                // if(myAudio.paused){
                // alert(myAudio.paused)
                //         myAudio.play();
                //         dispatch(controlPlay(true))

                //     }else{
                //         myAudio.pause();
                //         dispatch(controlPlay(false))
                //     }
            });


}

 function requestListionSecret(value) {
    return {
        type : REQUEST_LISTION_SECRET,
        audience : value.listenNum
    }

}

 //点击播放语音
 function handleClickRadio(){
     return(dispatch,getState)=>{
        // let data=getState().dataSecret//这个如果给了全局变量，就会一直取最开始状态的值

         if(ifFree){
             //调接口
            let url=baseUrl+'/listenPlan.do'   

            return fetch(url,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                        },
                    body:"planId="+planId+"&userId="+userName

            }).then(response=>response.json())
            .then(json=>{
                dispatch(requestListionSecret(json.values))
                playingControl(dispatch,json.values.voiceUrl)
                sessionStorage.setItem(planId+'free',json.values.voiceUrl)
            })
 
        }else{
            
            if(ifPayed) {

                //判断是否有本地的

                let _playSoruce = sessionStorage.getItem(planId+'free')
                if(_playSoruce){
                        
                        playingControl(dispatch,_playSoruce)

                }else {
                     //掉接口
                    let url=baseUrl+'/payListenPlan.do'   

                    return fetch(url,{
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                                },
                            body:"planId="+planId+"&userId="+userName

                    }).then(response=>response.json())
                    .then(json=>{
                        
                        playingControl(dispatch,json.values.voiceUrl)
                    })
                }
                var audience={listenNum:(listenNum)}
                dispatch(requestListionSecret(json.values))

            }else{
                dispatch(pay(true))
            }

         }
     }
 }

//付款层在没付款时候开关的状态
function pay(value){
    return{
        type:PAY,
        pay:value
    }
}

//控制是否为真的服了款修改的收听类型
function listeningIsFree(value) {
    return{
        type:LISTENING_IS_FREE,
        listeningFree:value
    }
}

 //点击付款层出现或关闭控制，
 function handleClickPayFloor(){
     return(dispatch,getState)=>{
         dispatch(pay(false))
     }
 }

 //这个是传给支付层的，但支付成功后我们要修改的收听类型
 function handleClickPay(){
     let _playSoruce = sessionStorage.getItem(planId+'free')

     return(dispatch,getState)=>{
         ifPayed = true;
         changeListeningType()
         dispatch(listeningIsFree('已付费收听'))
         dispatch(pay(false))
         var audience={listenNum:(listenNum+1)}
         dispatch(requestListionSecret(audience))//将页面上的播放声音src添上
         playingControl(dispatch,_playSoruce)
     }
 }

//关于放大缩小图片层
 function handleClickZoomInControl(i,zoomIn){

     return(dispatch,getState)=>{
     console.log(getState().dataSecret.baseType.imgList[i])
     var value = {
         imgSrc:getState().dataSecret.baseType.imgList[i],
         zoomIn:zoomIn
        }
         dispatch(handleClickZoomIn(value))
     }
 }

 function handleClickZoomIn(value){
    return{
        type : HANDLE_CLICK_ZOOM_IN,
        zoomIn : value.zoomIn,
        imgSrc:value.imgSrc
    }
 }

 //初始化数据
 function init() {
     let url=baseUrl+'/viewPlan.do'   
     return(dispatch,getState)=>{
            return fetch(url,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                        },
                    body:"planId="+planId+"&userId="+userName

            }).then(response=>response.json())
            .then(json=>{

                ifPayed = json.values.ifPayed
                ifFree = json.values.ifFree
                dispatch(receiveSecret(json.values))
                changeListeningType()
                dispatch(listeningIsFree(isFree))
                initWxJSSDK(json.values.target)//初始jssdk
                listenNum = json.values.listenNum

            })
    

     }
 }

 //判断是否是付费项目，服没服玩钱

 function changeListeningType() {
    isFree = ifFree?'免费':ifPayed?'已付费':'付费'
 }

 export const actions={
    handleClickPayFloor,
    handleClick,
    handleClickRadio,
    init,
    handleClickPay,
    pay,
    requestListionSecret,
    handleClickZoomInControl
}  

const ACTION_HANDLERS={
  [REQUEST_SECRET]: (state) => {
    return ({...state,fetching:false})
  },
  [RECEIVE_SECRET]: (state, action) => {
    return ({...state,
         fetching:true,
         baseType:action.baseType ,
         messageNum:action.messageNum,
         goodNum:action.goodNum,
         audience : action.audience,
         gooding:action.gooding
        })
  },
  [REQUEST_LISTION_SECRET] : (state,action) => {
    return ({...state,
        fetching : true, 
        audience : action.audience
    })
  },
  [CONTROL_PLAY]:(state,action)=>{
      return({...state,playing:action.playing,})
  },
  [GOOD_WORK]:(state,action)=>{
      return({...state,
          goodNum:action.goodNum,
          gooding:action.gooding})
  },
  [PAY]:(state,action)=>{
      return({...state,pay:action.pay})
  },
  [LISTENING_IS_FREE]:(state,action)=>{
      return({...state,
          listeningFree:action.listeningFree})
  },
  [HANDLE_CLICK_ZOOM_IN] : (state,action)=>{
      return({
          ...state,
          zoomIn:action.zoomIn,
          imgSrc:action.imgSrc
      })
  }

}

const initialState = {
               baseType:{
               ifFree : true,
               title:'',
               actor:7,
               goal:'',
               describe:'',
               imgList:[],
               imageUrl:'',//需要设置一个默认头像
               },
               listeningFree:'免费',
               messageNum:0,
               goodNum:0,
               fetching:false,
               audience:0,
               palying:false,
               gooding:false,
               pay:false,//是否需要付款
               zoomIn:false, //是否可以放大图片
               imgSrc:''
}

export default function(state=initialState,action){
    const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}