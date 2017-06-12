import React,{Component} from 'react'
import PropTypes from 'prop-types';

import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import classes from "./MyMoney.scss"
import redMony from "../../../static/redbag.png"

class Content extends Component{
     render() {
        return (

        <div className="body-list-money">
            <ul className="header-setting">
                <li >
                        <span>
                           可提现金额
                        </span>
                        <span  >
                           0.00
                        </span>
                </li> 
                <li>
                  <a>提现</a>
                </li>       
            </ul>
            <div>账户明细</div>
            <ul className="list-money">
                <li >
                        <img src={redMony} alt=""/>
                        <ul>
                            <li>+<b>1</b>元</li>
                            <li>获得新人红包</li>
                        </ul>
                        <span>05-31 16:11</span>
                </li>

            </ul>
            
        </div>
        )
        
    }
}



export default class MyMoney extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
    }
    render() {
        return(
            <div className="contain">
               <Content/>
                
            </div>
        )
    }
}

MyMoney.propTypes = {
    dataMoney:PropTypes.object.isRequired
}