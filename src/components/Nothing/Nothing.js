import React from 'react'
import Nothing from './Nothing.scss'

//当列表不存时候显示提示组件

export default class ListNot extends React.Component{
  
    render(){
        return <p className='nothing'>
            暂无内容！(该项目在近期会开通)
        </p>
    }
}