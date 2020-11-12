import React from 'react';
import { Carousel} from 'antd-mobile';

export default class Banner extends React.Component {
  render() {
    // console.log("banner.props",this.props.Bannerlist);
    return (
        <Carousel
          autoplay={true}
          infinite
          vertical ={false}
          dots={true}
          dotStyle={{margin:'0 2vw',display:'inline-block',height:10,width:10,borderRadius:50+"%",backgroundColor:'rgba(222,222,222,.3)'}}
          dotActiveStyle={{margin:'0 2vw',display:'inline-block',height:10,width:10,borderRadius:50+"%",backgroundColor:'rgba(121,21,21,.5)'}}
        >
          {this.props.Bannerlist.map((item,index) => (
            <a
              key={index}
              style={{ display: 'inline-block', width: '100%'}}
            >
              <img
                src={item}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  // this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    );
  }
}