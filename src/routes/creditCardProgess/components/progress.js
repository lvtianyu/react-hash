import React,{Component} from 'react'
import PropTypes from 'prop-types';

import CreditCardCss from './progress.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import noticeImg from '../../../static/notice.png'

class Remind extends Component{
    render() {
        return (
            <div className="modal">
                <div>
                    <div className="amimated-in">
                        <div className="return " id="returnCollect">
                        <span onClick={this.props.handleCotrol}>x</span></div>
                        <div className="notice-layout"><img src={noticeImg} alt=""/>小提示</div>
                        <p>申请资料<span>真实全面</span>，多提供工作、财力、学历等证明，能提高办卡通过率哦~</p>
                        <a href="">前往银行官网申请</a>
                    </div>  
                    
                </div>
            </div>
        )
    }
}

class Head extends Component{
    render() {
        return (
            <ul className="head">
                <li>任务奖励＋<span>30</span>元</li>
                <li>
                    申请无需任何费用，不激活卡片无年费
                </li>

            </ul>
        )
    }
}



class Content extends Component{
     render() {
         const {handleClickOpen,handleClickClose,dataCard} = this.props;
         const {goToPage}=dataCard
        return <div className="credit-card">
               <Head/>
            
               <div className="list-card">

                <p>25岁以下已有本行信用卡的用户无法获得奖励</p>
                
                <img src="" alt=""/>
                <h4>光大银行白金卡</h4>

                <ul>
                        <li><p>COSTA咖啡满100减50</p></li>
                        <li><p>汽车加油满200送100</p></li>
                </ul>
                
                <div>了解更多特权，请至银行官网</div>
                <a onClick={handleClickOpen}>免费申请</a>
                
            </div>
              {goToPage?<Remind handleCotrol={handleClickClose}/>:''} 
            </div>
        
    }
}

export default class CreditCardP extends Component {
      constructor(props){
        super(props)
        }
      componentDidMount() {
          
    }
    render(){
        return (
            <div>
                <Content {...this.props}/>
            </div>
        )
    }
    

}

CreditCardP.propTypes={
    dataCard:PropTypes.object.isRequired
}