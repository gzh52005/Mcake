import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

class Handpick extends Component{
    constructor(props){
        super(props)
        // console.log('handpick=',this.props);
        this.state={
            tastelist:[{name:'拿破仑',icon:'elf_01'},{name:'奶油',icon:'elf_02'},{name:'慕斯',icon:'elf_03'},{name:'芝士',icon:'elf_04'},{name:'巧克力',icon:'elf_05'},{name:'咖啡',icon:'elf_06'},{name:'坚果',icon:'elf_07'},{name:'水果',icon:'elf_08'},{name:'冰淇淋',icon:'elf_09'}],
            scenelist:[{name:'生日',icon:'iconfont icon-shengri'},{name:'聚会',icon:'iconfont icon-qingdianhejuhui--copy'},{name:'情侣',icon:'iconfont icon-xin'},{name:'儿童',icon:'iconfont icon-10'},{name:'长辈',icon:'iconfont icon-changbei'},{name:'下午茶',icon:'iconfont icon-kafeiting'}],
            taste:false,
            scene:false,
        }
        
    }
    componentDidMount(){
        // this.el.style.transition= 'all 0.5s'
       
    }
    
    componentDidUpdate(){
        // console.log(this.props.status);
        if(this.props.status.isshow){
            setTimeout(()=>{
                this.el.style.left = 0;
                        })
        }
        else{
            this.el.style.left=-50+'vw'
        }
    }
    render(){
        const {tastelist,scenelist,scene,taste} = this.state
        const {history} = this.props
            return  (
                <div className='drawer' ref={el=>{this.el = el}}>
                  <ul>
                  {/* {this.state.goodslist.map((item=>( */}
                    <li>全部蛋糕<span> <i>32</i>  </span></li>
                    <li onClick={()=>{
                        this.setState({taste:!this.state.taste})
                    }}>口味筛选<span> <i className='icon sjt' ></i>  </span></li>
                    <ul className='taste' style={{display:taste?'block':'none'}}>
                        {tastelist.map((item,index)=>{
                            return <li key={index} onClick={()=>{
                                history.push('/list/'+item.name)
                                this.props.status.showFn()
                            }}><div className={'iconLogo '}><i className={item.icon}></i></div> <span className='select'><span>{item.name}</span> <i className='icon mr10 yjt'></i> </span></li>
                        })}
                    </ul>
                    <li onClick={()=>{
                        this.setState({scene:!this.state.scene})
                    }}>场景筛选<span> <i className='icon sjt'></i>  </span></li>
                    <ul className='scene' style={{display:scene?'block':'none'}}>
                        {scenelist.map((item,index)=>{
                            return <li key={index}><div className={'iconLogo'}> <em className={item.icon}></em> </div> <span className='select'>{item.name}</span> <i className='icon mr10 yjt'></i></li>

                        })}
                    </ul>
                    <li>所有小食<span> <i>18</i>  </span></li>
                    <li>所有配件<span> <i>4</i>  </span></li>
                    {/* )))} */}
                  </ul>
                </div>
            )
        }
        
}
export default withRouter(Handpick)