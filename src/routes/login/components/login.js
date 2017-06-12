
import React,{Component} from 'react'
import PropTypes from 'prop-types';

import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'

import "./login.scss"
import phone from "../../../static/phone.png"
// import Notification from "../../../components/Notification/Notification"


class Content extends Component{
     render() {
            const {
            handleClickVerification,
            handleClickSubmit,
            handleChangePhone,
            handleChangeVerification,
            dataLogin
        } = this.props.data
        const {
               verificationCode,
               isgetVerificationCode,
               phoneCode,
               verificationText,
               fething,
               notice
        } = dataLogin;
        return (

        <div className="register public">

            <div className="verification-code">
                <input type="number" className={phoneCode?'active':''} placeholder="请输入手机号码" onChange={handleChangePhone} />
                <s className={isgetVerificationCode?'':'active'} onClick={handleClickVerification} >{verificationText}</s>
            </div>

            <div>
                <input type="number" className={verificationCode?'active':''} onChange={handleChangeVerification}  placeholder="请输入验证码"  />
            </div>

          
          

            
            <button className={(phoneCode && verificationCode)?'active':''} type="" onClick={handleClickSubmit} >登录</button>
            
        </div>
        )
        
    }
}



export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }
    render() {
     
        return(
            <div className="contain">
               <Content data={this.props} />
                
            </div>
        )
    }
}

Login.propTypes={
    dataLogin:PropTypes.object.isRequired
}