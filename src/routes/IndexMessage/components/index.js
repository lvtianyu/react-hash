import React from 'react'
import { func, object, arrayOf, oneOfType, element, shape } from 'prop-types'
import { render } from 'react-dom'


import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import classes from "./index.scss"
// import {IndexLink, Link} from 'react-router'
import footerClass from "../../../styles/footer.scss"
import home from "../../../static/home.png"
import money from "../../../static/money.png"
import myself from "../../../static/myself.png"
import tryGame from "../../../static/tryGame.png"
import tryGamebtn from "../../../static/tryGamebtn.png"
import shop from "../../../static/shop.png"
import prize from "../../../static/prize.png"
import comeOn from "../../../static/comeOn.png"
import card from "../../../static/card.png"
import greatWork from "../../../static/greatWork.png"
import shoplad from "../../../static/shoplad_03.png"


class Footer extends React.Component{
     constructor(props) {
    super(props);
  }
    render() {
        return <div className="footer-nav">
       
                <ul>
                    <li>
                        <a >
                            <img src={home}  />
                        </a>
                        
                    </li>
                    <li className="active">首页</li>
                </ul>
                <ul>
                    <li>
                        <a >
                            <img className="special" src={tryGame}  alt=""/>
                        </a>
                    </li>
                    <li>试玩</li>
                </ul>
                <ul>
                    
                    <li>
                        <a href="MyMoney">
                            <img src={money}  />
                        </a>
                    </li>
                    <li>钱包</li>
                </ul>
                <ul>
                    <li>
                        <a href="Myself">
                        <img src={myself} />
                        </a>
                    </li>
                    <li>我的</li>
                </ul>
            </div>
        
    }

}

class Head extends React.Component{
     constructor(props) {
        super(props);
    }
     render() {
        //  console.log(this.props.data)
        const {real_income,day_income,total_income,imageUrl} = this.props.data.dataIndex.baseMessage
        return <div className="head">
                <ul>
                    <li>
                      现金余额（元）
                    </li>
                    <li className="active">
                    {real_income?real_income:0}
                    </li>
                    <li>
                        <span>
                            累计收入 <b>{total_income?total_income:0}</b>
                        </span>
                        <i>|</i>
                        <span>
                            今日收入 <b>{day_income?day_income:0}</b>
                        </span>
                    </li>
                </ul>
                <a href="Myself">
                    <img src={imageUrl?imageUrl:myself} alt=""/>
                </a>

            </div>
        
    }

}

class Content extends React.Component{
     constructor(props) {
    super(props);
  }
     render() {
        return <div className="indexMessage">
                <Head data={this.props.dataMessage}/>

                <ul className="listStyle">
                    <li>
                        <a href="/DemoTask/">
                            <div className="try-game">
                                <span><img src={tryGamebtn} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">试玩任务</li>
                                    <li>任务多到账快</li>
                                </ul>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="/creditCard/" className="left-padding">

                            <div className="card">
                               <span> <img src={card} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">信用卡任务</li>
                                    <li>限时办卡拿奖励</li>
                                </ul>
                            </div>
                        </a>
                    </li>
          
                </ul>
                <ul className="listStyle">
                    <li>
                        <a href="ApprenticeTask">
                            <div className="come-on">
                                <span><img src={comeOn} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">收徒任务</li>
                                    <li>10元没人上不封顶</li>
                                </ul>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" className="left-padding">

                            <div className="award">
                                <span><img src={greatWork} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">高额任务</li>
                                    <li>超高奖励每日限量</li>
                                </ul>
                            </div>
                        </a>
                    </li>
          
                </ul>
                <ul className="listStyle">
                    <li>
                        <a href="">
                            <div className="prize">
                                <span><img src={prize} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">每日开奖</li>
                                    <li>千元大奖躺着分</li>
                                </ul>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" className="left-padding">

                            <div className="shopping">
                                <span><img src={shop} alt=""/></span>
                            </div>
                            <div>
                                <ul>
                                    <li className="title">乐动小店</li>
                                    <li>月赚2000不是梦</li>
                                </ul>
                            </div>
                        </a>
                    </li>
          
                </ul>
             
                <ul className="shopingList">
                    
                    <li><img src={shoplad} alt=""/>乐动惠购</li>
                    <li> > </li>
                </ul>
                <Footer/>

            </div>
        
    }
}


export default class Index extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
         const init = this.props.init;
            init();
    }
    render() {
        const fetching=this.props.dataIndex.fetching

        return(
            <div className="content">
               
                 {!fetching?<Circle/>:<Content dataMessage={this.props}/>}
            </div>
        )
    }
}

Index.propTypes={
    dataIndex:object.isRequired
}