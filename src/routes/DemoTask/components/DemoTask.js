import React,{Component} from 'react'
import PropTypes from 'prop-types';

import DemoTaskCss from './DemoTask.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import Nothing from '../../../components/Nothing/Nothing'
import publicData from '../../../store/commonData'
import {IndexLink, Link} from 'react-router'



class test extends Component {
  render(){
    return(
      <div>
         <h2>省钱</h2>
              <ul className="clear">
              {this.state.data1.map((item)=>{
                  return(
                    <li key={item.nickName}>
                      <Link to="/DemoTaskDetail">
                      <div className="fl headerbox"></div>
                      <div className="fl detail">
                        <h3>{item.nickName}</h3>
                        <p><span>{item.detailName}</span><span>剩{item.detailResidue}份</span></p>
                      </div>
                      <div className=" fr money">{item.money}元</div>
                      </Link>
                    </li>
                    )

              })}
              </ul>
      </div>
    )
  }
}



export default class DemoTask extends Component {
    constructor(props){
        super(props)
         
        }
    componentDidMount() {
       const init = this.props.init;
            init();
    }
    render(){
        return(
            <div className='DemoTask-content'>
              <h2>正在投放中</h2>
              <ul className="put-in clear">
              {this.props.dataTry.ladList.map((item,index)=>{
                  return(
                    <li key={index}>
                      <Link to={`/DemoTaskDetail#?app_rank=${item.app_rank}&remark=${item.remark}&app_price=${item.app_price}`}>
                       <div className="fl headerbox">
                        <img src={item.app_url} alt=""/>
                       </div>
                       <div className="fl detail">
                         <h3>{item.app_name}</h3>
                         <p><span>{'有福利'}</span><span>剩{item.app_limit}份</span></p>
                       </div>
                       <div className=" fr money">+{item.app_price}元</div>
                      </Link>
                    </li>
                    )

              })}
              </ul>
             
            </div>
        )
    }
}

DemoTask.propTypes={
   dataTry:PropTypes.object.isRequired

}
