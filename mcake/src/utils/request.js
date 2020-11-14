// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://120.76.247.5:2001' : 'http://offer.qfh5.cn';

const apiUrl = 'http://120.27.231.166:3009'
export function request(url,data,options={}){
    url = apiUrl + url;

    // 拼接get请求参数
    if(options.method === 'get' || options.method===undefined){
        if(data){
            const params = [];
            for(let key in data){
                params.push(`${key}=${data[key]}`)
            }

            url = url + '?' + params.join('&')
        }
    }
    return fetch(url,{
        ...options
    }).then(res=>{
        return res.json()
    })
}

// 封装get请求
request.get = function(url,data={},options={}){
    options.method = 'get';
    return request(url,data,options);
}

request.post = function(url,data={},options={}){
    options.method = 'post';
    options.body = JSON.stringify(data)
    options.headers= new Headers({
        'Content-Type': 'application/json'
    })
    return request(url,data,options);
}
request.put = function(url,data={},options={}){
    options.method = 'put';
    options.body =  JSON.stringify(data)

    options.headers= {
        'Content-Type': 'application/json'
    }
    return request(url,data,options);
}
request.delete = function(url,data={},options={}){
    options.method = 'delete';
    options.body =  JSON.stringify(data)

    options.headers= {
        'Content-Type': 'application/json'
    }
    return request(url,data,options);
}
export default request;