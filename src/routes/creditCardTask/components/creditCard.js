import React from 'react'

import { func, object, arrayOf, oneOfType, element, shape } from 'prop-types'
import CreditCardCss from './CreditCard.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import Nothing from '../../../components/Nothing/Nothing'



class Head extends React.Component{
 
    render() {
        return (
            <ul className="head-Card">
                <li>
                  <h4>信用卡任务</h4>
                </li>
                <li>
                    <span>1.注册办卡</span>
                    <span>2.申请奖励</span>
                    <span>3.银行审批</span>
                </li>

            </ul>
        )
    }
}

class Progress extends  React.Component{

    render() {
        return <div className="list-card-credit">
            <div>银行审批需2-3周，通过后无需激活卡片7个工作日内奖励到账</div>
            <ul className="list">
                <li>
                    <a href="taskProgress">

                    <ul>
                        <li>
                         <img src="" alt=""/>
                        </li>
                        <li>
                            ddddd
                        </li>
                    </ul>
                    <dl>
                        <dt>官大银行白金卡</dt>
                        <dd>手机号 1520155502</dd>
                        <dd>申请日期 2017.05.31</dd>
                       
                    </dl>
                    <div className="check-progess">查询进度</div>
                    </a>
                </li>
            </ul>
        </div>
    }
}

class List extends React.Component{

    render() {
        return <div className="list-card">

            <div>同一银行可让家人朋友申请，拿多次奖励</div>

            <ul className="list">
            {this.props.data.map((item,index)=>{
                return(
               <li >
                    <a href="taskProgress">
                        <ul>
                            <li>
                            <img src="" alt=""/>
                            </li>
                            <li>
                                2.6万人申请
                            </li>
                        </ul>
                        <dl>
                            <dt>官大银行白金卡</dt>
                            <dd>·COSTA咖啡满100减50</dd>
                            <dd>·汽车加油满200送100</dd>
                        
                        </dl>
                        <div>+<b>30</b>元</div>
                    </a>
               </li>
            )
        })}
            </ul>
        </div>
    }
}

class Content extends React.Component{
  constructor(props) {
        super(props)
    }
     render() {
         const {handleClickTask,handleClickProgress,dataCredit} = this.props
         const {taskList,
             properssList,
             isTask} = dataCredit
         const lentask = taskList.length;
         const lenPropress = properssList.length
        return <div className="credit-card">
                <Head/>
               <ul className="btn-click">
                   <li className={isTask?'active':''} onClick={handleClickTask}>任务列表</li>
                   <li className={!isTask?'active':''} onClick={handleClickProgress}>进度查看</li>
               </ul>
               {isTask? (lentask>0 ?<List data={taskList} />:<Nothing /> ):(lenPropress>0?<Progress data={properssList}/>:<Nothing />)}
               
               
            </div>
        
    }
}

export default class CreditCard extends React.Component {
      constructor(props){
        super(props);
        }
      componentDidMount() {
           const init = this.props.init;
            init();
    }
    render(){
                const fetching=this.props.dataCredit.fetching
                
        return (
            <div>
                <Content {...this.props}/>
            </div>
        )
    }
    

}

CreditCard.propTypes={
    dataCredit:object.isRequired
}