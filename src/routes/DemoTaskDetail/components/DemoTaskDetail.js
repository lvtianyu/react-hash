import React,{Component} from 'react'
import PropTypes from 'prop-types';

import DemoTaskDetailCss from './DemoTaskDetail.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import Nothing from '../../../components/Nothing/Nothing'
import publicData from '../../../store/commonData'
import lock from '../../../static/lock.png'
export default class DemoTaskDetail extends Component {
    constructor(props){
        super(props)
          
        }
    componentDidMount() {
        const init = this.props.init;
            init();
    }
    render(){
        const {app_price,remark,app_rank} = this.props.dataDetail
        return(
            <div className='DemoTaskDetail'>
             <div className='banner'>
              <h2>任务奖励</h2>
              <p className="money">
                <strong>{app_price}</strong>&nbsp;元
              </p>
              <p><a>试玩奖励</a></p>
              <div>剩余时间 36:02</div>
             </div>
            <ul>
              <li className="step clear active">
                <div className="arrow"></div>
                <div className="fl step-num">
                  <span>1</span>
                </div>
                <div className="fl step-content">
                  <h2>步骤一</h2>
                  <div className="step-detail">
                    <p>App Store搜索关键词：<strong>{remark}</strong></p>
                    <p>下载此图标应用，约排在 <strong>第{app_rank}位</strong></p>
                    <p className="step-head"><span></span></p>
                    <p className="step-start"><a>开始任务</a></p>
                  </div>
                </div>
              </li>
              <li className="step clear">
                <div className="arrow"></div>
                <div className="fl step-num">
                  <span>2</span>
                </div>
                <div className="fl step-content">
                  <h2>步骤二</h2>
                  <div className="step-detail">
                    <p>点击下方按钮，试玩应用3分钟</p>
                    <p><strong>打开应用时请“允许”使用数据</strong></p>
                    <p className="step-start"><a>开始试玩</a></p>
                  </div>
                </div>
              </li>
              <li className="step clear">
                <div className="arrow"></div>
                <div className="fl step-num">
                  <span>3</span>
                </div>
                <div className="fl step-content">
                  <h2>步骤三</h2>
                  <div className="step-detail">
                    <p>试玩应用三分钟，返回领取奖励</p>
                    <p><strong>打开应用时请“允许”使用数据</strong></p>
                    <p className="step-start"><a>领取奖励</a></p>
                  </div>
                </div>
              </li>
              <li className="step clear">
                <div className="fl step-num">
                  <span><img src={lock} /></span>
                </div>
                <div className="fl last-div">
                  领取奖励后，解锁1个专属任务，共计<strong>0.2</strong>元
                </div>
              </li>
            </ul>
            </div>
        )
    }
}

DemoTaskDetail.propTypes={
  dataDetail:PropTypes.object.isRequired
}
