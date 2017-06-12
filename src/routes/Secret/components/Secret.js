import React,{Component} from 'react'
import PropTypes from 'prop-types';

import Circle from '../../../components/Indicator/FetchingCircle'
import Nothing from '../../../components/Nothing/Nothing'
import classes from './Secret.scss'
import Play from '../../../components/Playing/Playing'
import {IndexLink, Link} from 'react-router'
import PayModule from '../../../components/PayModule/PayModule'
import PictureZoomIn from '../../../components/pictureZoomIn/PictureZoomIn'

class List extends Component{
      render() {
        return <ul className='list'>
        {this.props.list.map((get,index) => (
                <li key={index} onClick={()=>{
                    this.props.handleClickZoomInControl(index,true)
                }}>
                        <img src={get}  />
                </li>
            ))}
        </ul>;
    }
}

//处理查询的类型

function searchType(value){
    var planType ;
    switch(value){
        case 1:
        planType = '自己'
        break;
        case 2:
        planType = '父母'
        break;
        case 3:
        planType = '爱人'
        break;
        case 4:
        planType = '孩子'
        break;
        case 5:
        planType = '同事'
        break;
        default:
        planType = '朋友'
    }
    return planType
}

export default class Secret extends Component {
    constructor(props){
        super(props)

    }
    componentDidMount() {
             const init = this.props.init;
            init();
    }

    render(){
        const{
            handleClick,
            handleClickRadio,
            handleClickPayFloor,
            dataSecret,
            handleClickPay,
            handleClickZoomInControl //控制放大图片的
        }=this.props
        const{
               baseType,
               pay,//这个是控制打开关闭支付层的
               messageNum,//留言个数
               goodNum,//点赞个数,
               fetching,//等待加载时候的动画
               audience,//偷听人数
               playing,//播放时候的动画
               gooding,//点击点赞时候的动画
               listeningFree,//免费还是付费
               zoomIn,
               imgSrc,
             }=dataSecret

        //基本类型里的参数是不会改变的

        const{
               title,//自己写的目标
               actor,//计划类型
               goal,//计划目标描述
               describe,//描述事后感想
               imgList,//图片数组
               imageUrl,//计划发起者的头像url
               ifFree,//发起者开始设定的收听类型
        }=baseType
        const len = imgList.length>0?true:false
        return(
            <div className={'secret'+actor}>
                {
                    !fetching?<Circle/>:""
                }
                <div className='title'>
                  <div>
                    <img src={imageUrl} />
                  </div>
                  <ul>
                      <li>{title}</li>
                      <li>{searchType(actor)}</li>
                  </ul>
                  
                </div>
                <div className='pronunciation' id="audio1">
                    <div className='audio ' onClick={handleClickRadio}>{listeningFree}收听 
                        <Play playing={playing}/>
                    </div>

                    <ul>
                        <li></li>
                        <li>{audience}{ifFree?'人收听':'人偷听'}</li>
                    </ul>
                    <audio id="audio"  data-reactid=".0.8" preload="preload" >
                    </audio>
                </div>
               <ul className='context'>
                   <li>
                    <div>
                      <span></span>  目标描述
                    </div>
                    <p>
                     {goal}
                    </p>
                   </li>
                   <li>
                     <div>
                      <span></span>  事后描述
                    </div>
                    <p>
                        {describe}
                    </p>
                     
                   </li>
               </ul>
              {len && <List list={imgList} handleClickZoomInControl={handleClickZoomInControl} />} 
                <div className='button'>
                    <ul className="secret-message">
                        <li >
                        <Link style={{'width':'100%','display':'block','height':'100%'}} to='/my_plan/dist/index.html/message'/>
                        </li>
                        <li>{messageNum}</li>
                    </ul>
                    <ul className="good" onClick={handleClick}>
                        <li className={!gooding?'goodLiFalse clickActiveShow':'goodLi clickActiveShow'}></li>
                        <li>{goodNum}</li>
                    </ul>
                </div>
                {pay && <PayModule handleClickPay={handleClickPay} handleClickPayFloor={handleClickPayFloor}/>}

                {len && zoomIn && <PictureZoomIn handleClickZoomInControl={handleClickZoomInControl}
                imgSrc={imgSrc}
                />}
            </div>
        )
    }
    
}

Secret.propTypes={
    dataSecret:PropTypes.object.isRequired
}