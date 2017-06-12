import React,{Component} from 'react'
import PropTypes from 'prop-types';

import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import classes from "./myself.scss"
import myself from "../../../static/myself.png"
import wx from '../../../static/wx.png'


class NickName extends Component{
    render() {
        return (
                <div className="modal name-modal ">
        <div>
            <div className="amimated-in">
                <div className="return" ><span onClick={this.props.handleClickClose}>x</span></div>
                <input type="text" placeholder="昵称" onChange={this.props.handleChangeNick}  />
                <p>
                    好名字带来好运气
                </p>
            </div>
        </div>
    </div>
        )
    }
}

class Content extends Component{
     render() {
            const {handleClickNick,handleClickClose,handleChangeNick,dataCenter} =this.props;
            const {
                    id,
                    nickName,
                    isNick,
                    fetching
            } = dataCenter
        return (

        <div className="body-list">
            <ul >
                <li className="header-setting">
                        <span>
                            头像
                        </span>
                        <span  >
                            <img src={myself} alt="" id="imgClip"/>
                            <input type="file" id="file" className="clip-file " />
                        </span>
                </li>        
            </ul>
            <ul >
                <li >
                        <span>
                            ID
                        </span>
                        <span id="name">
                           {id}
                        </span>
                </li>
                <li >
                        <span>
                            昵称
                        </span>
                        <span onClick={handleClickNick}>
                           {nickName}
                        </span>
                </li>
                <li >
                    <a href="PersonCode">
                        <span>
                            二维码
                        </span>
                        <span >
                           <img className="wx" src={wx} alt=""/>
                            <b> > </b>
                        </span>
                    </a>
                </li>
                <li >
                    <a href="bindWX">
                        <span>
                            微信绑定
                        </span>
                        <span >
                           立即绑定<b> > </b>
                        </span>
                    </a>
                </li>

            </ul>
            {isNick?<NickName handleClickClose={handleClickClose} handleChangeNick={handleChangeNick} />:''}
        </div>
        )
        
    }
}



export default class Myslef extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
         const init = this.props.init;
            init();
    }
    render() {
        return(
            <div className="contain">
               <Content {...this.props} />
                
            </div>
        )
    }
}


Myslef.propTypes = {
    dataCenter:PropTypes.object.isRequired
}