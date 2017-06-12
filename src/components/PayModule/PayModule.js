import React from 'react';
import './PayModule.scss';
import CloseBtn from '../CloseBtn/closeBtn';
import fetch from 'isomorphic-fetch'
import {baseUrl,debug} from  '../../utils/baseUrl'

    var  planId =debug ? "9": sessionStorage.getItem('planId') ,
         openId = localStorage.getItem('openid'),
         userName=debug ? 
         "31" : localStorage.getItem('userId') ? 
                              localStorage.getItem('userId') : localStorage.getItem('userName');
   


class PayModule extends React.Component {
    constructor(props){
        super(props)
    }
    handleClickPay(){
      let url=baseUrl+'/wechat/webPayForlisten.do?'
      let prop=this.props
        return fetch(url,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                body:"userId="+userName+"&openId="+openId+"&planId="+planId+"&totalFee=1"
             }).then(response=>response.json())
               .then(json =>{
                   
                if (json.result == "ok") {
                    var _values = json.values;
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            appId: _values.appId,     //公众号名称，由商户传入
                            timeStamp: _values.timeStamp,         //时间戳，自1970年以来的秒数
                            nonceStr: _values.nonceStr, //随机串
                            package: _values.package,
                            signType: "MD5",         //微信签名方式：
                            paySign: _values.paySign //微信签名
                        },
                        function (res) {
                            var resMsg = res.err_msg;
                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            if (resMsg == "get_brand_wcpay_request:ok") {
                                sessionStorage.setItem(planId+'free',_values.voiceUrl)
                                 prop.handleClickPay()
                                // console.log(prop)
                            }else if(resMsg == "get_brand_wcpay_request:cancel"){
                                alert('已经取消')
                            }else{
                                alert(resMsg)
                            }
                        }
                    );

                } else {
                

                }
    })

    
        
    }
    handleClickPayFloor(){
        this.props.handleClickPayFloor()
    }
    disappearClick(evt){
        evt.stopPropagation();
    }
    render() {
        return (
            <div className={'cover' } >
                <div className="panel clear">
                
                    <div className="title_pay" onClick={this.handleClickPayFloor.bind(this)}> <CloseBtn/> </div>

                    <p className="p_content">¥ :1.00</p>
                    <div className='weixin'>请使用微信支付<span>></span></div>
                    <button className="btn btn-gradient" onClick={this.handleClickPay.bind(this)}>确认支付</button>
                </div>
            </div>
        )
    }
}

export default PayModule;