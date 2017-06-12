import React,{Component} from 'react'
import PropTypes from 'prop-types';

import PersonCodeCss from './PersonCode.scss'
import Circle from '../../../components/Indicator/FetchingCircle'
import  '../../../utils/publick'
import Nothing from '../../../components/Nothing/Nothing'
import publicData from '../../../store/commonData'
import headPortrait from '../../../static/QQ.png'
var jQuery= require('../../../js/jquery-3.2.1.min.js')
window.jQuery=jQuery
window.$=jQuery
require ('../../../js/jquery.qrcode.min.js')
/*canvas转化为图片*/
 function canvasToImage(canvas) {
     var image = new Image();
     image.src = canvas.toDataURL("image/png");
     return image;
 }

export default class PersonCode extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount() {
      $(".code") .qrcode({
        render: "canvas",
        width: 100, //宽度
        height: 100, //高度
        background : "#ffffff",       //二维码的后景色
        foreground : "#000000",
        text:location.href
       });
      $(".code").html(canvasToImage($(".code")[0].getElementsByTagName("canvas")[0]))
    }
    render(){
        return(
            <div className='code-box'>
              <div className='code-content'>
                <div className='head-portrait'>
                  <img src={headPortrait}/>
                </div>
                <div className='name'>张超吉</div>
                <h2>累计收入1.11元</h2>
                <div className='code'></div>
                <p>扫一扫加入乐动</p>
                <p className='link-box'>http://hshshshshshshsh</p>
                <p className="label">长按上面链接复制到剪贴板</p>
              </div>
            </div>
        )
    }
}

PersonCode.propTypes={

}
