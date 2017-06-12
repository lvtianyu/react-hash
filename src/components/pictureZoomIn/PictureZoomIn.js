import React,{Component} from 'react'
import Circle from '../Indicator/FetchingCircle'
import './PictureZoomIn.scss'
export default class PictureZoomIn extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return(
            <div className={'zoomIn'}
            onClick={()=>{
                this.props.handleClickZoomInControl(null,false)
            }}>
                <img src={this.props.imgSrc} alt=""/>
                 <span className="vertical-align-span"></span>
            </div>
        )
    }
}