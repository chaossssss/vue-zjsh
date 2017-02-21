// const http = "http://copen.zhujiash.com/api/v3/";
const http = "http://192.168.1.191:3001/api/v3/";
const api = {
		// 登录
		"Login": "http://192.168.1.191:3003/api/v1/Clientinfo/Login",

		// 注册
		"Register": "http://192.168.1.191:3003/api/v1/clientinfo/Register",

		// 忘记密码
		"ResetPwd": "http://192.168.1.191:3003/api/v1/clientinfo/ResetPwd",

		// 发送验证码
		"SendCaptcha": "http://192.168.1.191:3003/api/v1/helper/SendCaptcha",

		// 获取活动
		"GetAds": "http://192.168.1.191:3001/api/v3/Provider/GetAds",

		// 地图首页 服务查询
		"IndexEx2": "http://192.168.1.191:3001/api/v3/Provider/IndexEx2",

		// 获取热门服务
		"GetHotServices": "http://192.168.1.191:3001/api/v3/Search/GetHotServices",

		// 获取个人信息
		"GetUserInfo": "http://192.168.1.191:3001/api/v3/ClientInfo/Index",

		// 获取地址
		"GetAddress": "http://192.168.1.191:3001/api/v3/ClientInfo/GetAddress",

		// 增加地址
		"AddAddress": "http://192.168.1.191:3001/api/v3/ClientInfo/AddAddress",

		// 删除地址
		"DeleteAddress": "http://192.168.1.191:3001/api/v3/ClientInfo/DeleteAddress",

		// 编辑地址
		"EditAddress": "http://192.168.1.191:3001/api/v3/ClientInfo/EditAddress",

		// 获取地址标签
		"GetAddressTags": "http://192.168.1.191:3001/api/v3/ClientInfo/GetAddressTags",

		// 获取服务类型列表
		"InfoListEx": "http://copen.zhujiash.com/api/v2/SystemService/InfoListEx",

		// 获取指定服务价格
		"GetServicePriceEx": "http://192.168.1.191:3001/api/v3/ClientInfo/GetServicePriceEx",

		// 获取服务可选数量
		"GetServiceQty": "http://192.168.1.191:3001/api/v3/SystemService/GetServiceQty",

		// 获取有效服务时间
		"ServiceTimeStartAt": "http://192.168.1.191:3001/api/v3/SystemService/ServiceTimeStartAt",

		// 获取当前可参与的活动
		"GetActivity": "http://192.168.1.191:3001/api/v3/SystemService/GetActivity",

		// 获取此类型的服务说明
		"GetAllDescription": "http://192.168.1.191:3001/api/v3/HelperInfo/GetAllDescription",

		// 创建一键下单 订单
		"CreateOrderOneKey": "http://192.168.1.191:3001/api/v3/OrderInfo/CreateOrderOneKey",

		// 创建指定下单 订单
		"CreateOrderEx": "http://192.168.1.191:3001/api/v3/OrderInfo/CreateOrderEx",

		// 根据类型和id查找工人
		"Detail": "http://192.168.1.191:3001/api/v3/Provider/Detail",

		// 根据工人ID 获取服务列表
		"GetWorkerServiceListEx": "http://192.168.1.191:3001/api/v3/ClientInfo/GetWorkerServiceListEx",

		// 根据商户ID 获取服务列表
		"GetMerchantServiceListEx": "http://192.168.1.191:3001/api/v3/ClientInfo/GetMerchantServiceListEx",

		// 获取订单详情
		"GetOrderInfoEx": "http://192.168.1.191:3001/api/v3/OrderInfo/GetOrderInfoEx",

		// 支付-余额付款
		"BalancePay": "http://192.168.1.191:3001/api/v2/orderinfo/BalancePay",

		// 支付-支付宝付款
		"GetAlipaySign": "http://192.168.1.191:3001/api/v2/orderinfo/GetAlipaySign",

		// 支付-微信付款
		"GetWxpaySign": "http://192.168.1.191:3001/api/v2/orderinfo/GetWxpaySign",


	}
	// const api = {
	// 	// 获取活动
	// 	"GetAds": "http://copen.zhujiash.com/api/v3/Provider/GetAds",

// 	// 地图首页 服务查询
// 	"IndexEx2": "http://copen.zhujiash.com/api/v3/Provider/IndexEx2",

// 	// 获取热门服务
// 	"GetHotServices": "http://copen.zhujiash.com/api/v3/Search/GetHotServices"

// }
export
default api;