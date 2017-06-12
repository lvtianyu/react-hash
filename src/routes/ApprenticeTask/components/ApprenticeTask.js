import React,{Component} from 'react'
import PropTypes from 'prop-types';

var jQuery= require('../../../js/jquery-3.2.1.min.js')
window.jQuery=jQuery
window.$=jQuery
require ('../../../js/jquery.qrcode.min.js')
import ApprenticeTaskCss from './ApprenticeTask.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import Nothing from '../../../components/Nothing/Nothing'
import publicData from '../../../store/commonData'
import apprentice_task from '../../../static/apprentice_task.png'
import WeChat from '../../../static/WeChat.png'
import QQ from '../../../static/QQ.png'
import QQ_zone from '../../../static/QQ_zone.png'
import circle_of_friends from '../../../static/circle_of_friends.png'
import code from '../../../static/code.png'
import praise from '../../../static/praise.png'
import link from '../../../static/link.png'
import appdown from '../../../static/appdown.png'
/*canvas转化为图片*/
 function canvasToImage(canvas) {
     var image = new Image();
     image.src = canvas.toDataURL("image/png");
     return image;
 }
export default class ApprenticeTask extends Component {
    constructor(props){
        super(props)
          this.state = {
            data: [
                { title: "微信收徒",detail:"可单发可群发，针对性强",img:WeChat },
                { title: "朋友圈收徒",detail:"静静的广而盖之，覆盖范围广", img:circle_of_friends},
                { title: "QQ收徒",detail:"可单发可群发，针对性强", img:QQ},
                { title: "空间收徒",detail:"静静的广而盖之，覆盖范围广", img:QQ_zone}
            ]
          }
        }
    componentDidMount() {
      /*滚动事件头部部分字隐藏*/
      window.onscroll=function(){
        var scrolltop = document.body.scrollTop;
        var stepdom= document.querySelector("#step")
        if (scrolltop>10) {
         stepdom.style.display="none";
        }else{stepdom.style.display="block";}

      }
      /*关闭事件*/
      $(".close").click(function(){
        $(this).parent().hide()
        $(this).parent().parent().hide()
      })
      /*分享收徒*/
      $(".share ul:eq(0) li").click(function(){
        $(".mark").show()
        $(".downapp").show()
      });
      /*二维码收徒*/
      $("#score").click(function(){
        $(".mark").show()
        $(".score-mark").show()
      })
      $(".score-mark .eqrcode") .qrcode({
        render: "canvas",
        width: 100, //宽度
        height: 100, //高度
        background : "#ffffff",       //二维码的后景色
        foreground : "#000000",
        text:location.href
       });
      $(".score-mark .eqrcode").html(canvasToImage($(".score-mark .eqrcode")[0].getElementsByTagName("canvas")[0]))
      /*成绩收徒*/
      $("#appcode").click(function(){
        $(".mark").show()
        $(".income").show()
      })
      $(".income .eqrcode") .qrcode({
        render: "canvas",
        width: 100, //宽度
        height: 100, //高度
        background : "#ffffff",       //二维码的后景色
        foreground : "#000000",
        text:location.href
       });
      $(".income .eqrcode").html(canvasToImage($(".income .eqrcode")[0].getElementsByTagName("canvas")[0]))

      /*连接收徒*/
      $("#link").click(function(){
        $(".mark").show()
        $(".link-mark").show()
      })
      $("#copy").on('click', function() {
         var e = document.getElementById("product_url"); //对象是content
         e.select(); //选择对象
         document.execCommand("Copy"); //执行浏览器复制命令
         $(this).parent().hide()
        $(this).parent().parent().hide()
      });
    }
    render(){
        return(
            <div className='ApprenticeTask'>
              <div className="task-banner">
                <p>信用卡任务</p>
                <p id="step">1.邀请好友&nbsp;&nbsp;&nbsp;2.好友做任务&nbsp;&nbsp;&nbsp;3.我拿奖励</p>
              </div>
              <div className="grand-total">累计奖励&nbsp;<span>0</span>&nbsp;元，徒弟&nbsp;<span>0</span>&nbsp;名&nbsp;&nbsp;<i></i></div>
              <div className="detail">
                  <h2>让好友赚钱&nbsp;我也赚钱</h2>
                  <h2>徒弟完成任务最高可获得&nbsp;<span>10</span>&nbsp;元</h2>
                  <h3>10个徒弟每人做3个任务，最高可得&nbsp;100元</h3>
                  <p><img src={apprentice_task} /></p>
                  <p  className="detail-task">徒弟完成iOS试玩任务，您可获得&nbsp;<span>100%</span>&nbsp;等额奖励，<br/>安卓为20%奖励，每个徒弟最高10元</p>
              </div>
              <div className="share">
                <h2>分享收徒</h2>
                <ul>
                  {this.state.data.map((item)=>{
                    return(<li key={item.title}>
                      <div className="left-box">
                        <img src={item.img}/>
                      </div>
                      <div className="right-box">
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                      </div>
                    </li>)
                  })}
                </ul>
                 <h2>扫码收徒</h2>
                <ul>
                  <li id="score">
                    <div className="left-box">
                      <img src={code}/>
                    </div>
                    <div className="right-box">
                      <h3>二维码收徒</h3>
                      <p>特别适合当面收徒，简单明了</p>
                    </div>
                  </li>
                  <li  id="appcode">
                    <div className="left-box">
                      <img src={praise}/>
                    </div>
                    <div className="right-box">
                      <h3>成绩单收徒</h3>
                      <p>乐动成就一目了然，用数据说话</p>

                    </div>
                  </li>
                </ul>
                <h2>链接收徒</h2>
                <ul>
                  <li id="link">
                    <div className="left-box">
                      <img src={link}/>
                    </div>
                    <div className="right-box">
                      <h3>链接收徒</h3>
                      <p>最经典最万能，哪里都能发</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mark">
                <div className="downapp amimated-zoomIn">
                  <div className="close">&times;</div>
                  <p><img src={appdown} /></p>
                  <p>任务助手未开启</p>
                  <a className="poenbtn">开启助手</a>
                  <p className="label">如遇问题请&nbsp;&nbsp;&nbsp;&nbsp;<a>重新下载</a></p>
                </div>
                <div className="income amimated-zoomIn">
                  <div className="close">&times;</div>
                  <h2>累计收入（元）</h2>
                  <p className="total-money">3.50</p>
                  <p className="person-num">共收徒0人</p>
                  <div className="eqrcode"></div>
                  <p>加入钱咖&nbsp;每月多赚&nbsp;500&nbsp;元<br/>安卓用户请填写我的ID：59896548</p>
                </div>
                <div className="score-mark amimated-zoomIn">
                  <div className="close">&times;</div>
                  <div className="eqrcode"></div>
                  <p>加入钱咖&nbsp;每月多赚&nbsp;<span>500</span>&nbsp;元<br/>安卓用户请填写我的ID：59896548</p>
                </div>
                <div className="link-mark amimated-zoomIn">
                  <div className="close">&times;</div>
                  <input id="product_url" value="http：//sasafasdafcsasfasdasdadfaf.sasd" type="text" readOnly />
                  <button id="copy">复制链接</button>
                </div>
              </div>

          </div>
        )
    }
}

ApprenticeTask.propTypes={

}
