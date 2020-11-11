import React from 'react';
import { Carousel} from 'antd-mobile';

export default class Banner extends React.Component {
  render() {
    return (
        <Carousel
          autoplay={true}
          infinite
          dots={true}
        >
          {this.props.Bannerlist.map(item => (
            <a
              key={item.title}
              href={item.href}
              style={{ display: 'inline-block', width: '100%'}}
            >
              <img
                src={item.img}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
    );
  }
}