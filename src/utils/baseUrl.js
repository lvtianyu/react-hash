// 当开启debug模式时意味着是线下测试

var debug = false

//基础连接用于接口的

var baseUrl =  debug ? 
                "http://10.0.1.2:8080/" :
                "";

export {baseUrl,debug}