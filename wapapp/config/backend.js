const wap = "http://192.168.1.191:3003/api/";
const app = "http://192.168.1.191:3001/api/v3/";
// const wap = "http://wapapi.zhujiash.com/api/";
// const app = "http://copen.zhujiash.com/api/v3/";
const api = {
	// 登录
	"Login": app + "wap/Login",
	// "Login": wap + "v1/clientinfo/Login",

	// 注册
	"Register": wap + "v1/clientinfo/Register",

	// 忘记密码
	"ResetPwd": wap + "v1/clientinfo/ResetPwd",

	// 修改密码
	"SetPwd": app + "ClientInfo/SetPwd",

	// 修改昵称
	"SetNickName": app + "clientinfo/SetNickName",

	// 修改头像
	"SetPhoto": app + "clientinfo/SetPhoto",

	// 发送验证码
	"SendCaptcha": wap + "v1/helper/SendCaptcha",

	// 获取活动
	"GetAds": app + "Provider/GetAds",

	// 地图首页 服务查询
	"IndexEx2": app + "Provider/IndexEx2",

	// 获取热门服务
	"GetHotServices": app + "Search/GetHotServices",

	// 获取个人信息
	"GetUserInfo": app + "ClientInfo/Index",

	// 获取我的账户
	"MySettlement": app + "ClientInfo/MySettlement",

	//获取充值列表
	"GetRechargeListEx": app + "Recharge/GetRechargeListEx",

	//通过支付宝充值
	"GetAlipaySignEx": app + "Recharge/GetAlipaySignEx",

	//通过微信充值
	"GetWxpaySignEx": app + "Recharge/GetWxpaySignEx",

	// 获取地址
	"GetAddress": app + "ClientInfo/GetAddress",

	// 增加地址
	"AddAddress": app + "ClientInfo/AddAddress",

	// 删除地址
	"DeleteAddress": app + "ClientInfo/DeleteAddress",

	// 编辑地址
	"EditAddress": app + "ClientInfo/EditAddress",

	// 获取地址标签
	"GetAddressTags": app + "ClientInfo/GetAddressTags",

	// 获取服务类型列表
	"InfoListEx": app + "SystemService/InfoListEx",

	// 获取指定服务价格
	"GetServicePriceEx": app + "ClientInfo/GetServicePriceEx",

	// 获取服务可选数量
	"GetServiceQty": app + "SystemService/GetServiceQty",

	// 获取有效服务时间
	"ServiceTimeStartAt": app + "SystemService/ServiceTimeStartAt",

	// 获取当前可参与的活动
	"GetActivityEx": app + "SystemService/GetActivityEx",

	// 获取此类型的服务说明
	"GetAllDescription": app + "HelperInfo/GetAllDescription",

	// 创建一键下单 订单
	"CreateOrderOneKey": app + "OrderInfo/CreateOrderOneKey",

	// 创建指定下单 订单
	"CreateOrderEx": app + "OrderInfo/CreateOrderEx",

	// 根据类型和id查找工人
	"DetailEx": app + "Provider/DetailEx",

	// 根据工人ID 获取服务列表
	"GetWorkerServiceListEx": app + "ClientInfo/GetWorkerServiceListEx",

	// 根据商户ID 获取服务列表
	"GetMerchantServiceListEx": app + "ClientInfo/GetMerchantServiceListEx",

	// 根据工人ID 获取服务列表
	"GetWorkerServicePriceListEx": app + "ClientInfo/GetWorkerServicePriceListEx",

	// 根据商户ID 获取服务列表
	"GetMerchantServicePriceListEx": app + "ClientInfo/GetMerchantServicePriceListEx",

	// 获取订单列表
	"GetOrderListEx": app + "OrderInfo/GetOrderListEx",

	// 获取订单详情
	"GetOrderInfoEx": app + "OrderInfo/GetOrderInfoEx",

	// 取消订单
	"CancelOrderEx": app + "OrderInfo/CancelOrderEx",

	// 删除订单
	"RemoveOrderEx": app + "OrderInfo/RemoveOrderEx",

	// 确认订单 已废除
	// "ConfirmOrderEx": app + "OrderInfo/ConfirmOrderEx",

	// 完成订单
	"CompleteOrderEx": app + "OrderInfo/CompleteOrderEx",

	// 支付-余额付款
	"BalancePay": app + "orderinfo/BalancePay",

	// 支付-支付宝付款
	"GetAlipaySign": wap + "v2/orderinfo/GetAlipaySign",

	// 支付-微信付款
	"GetWxpaySign": wap + "v2/orderinfo/GetWxpaySign",

	// 获取红包列表
	"CouponList": app + "Coupon/CouponList",

	// 获取工人／商户／全城商户详细信息 (接口已废)
	// "GetDetails": app + "Search/GetDetails",

	// 获取收藏工人列表
	"WorkerList": app + "clientfavorites/WorkerList",

	// 获取收藏商户列表
	"BusinessList": app + "clientfavorites/BusinessList",

	// 获取工人评价
	"GetWorkerEvaluationList": app + "ClientEvaluation/GetWorkerEvaluationList",

	// 获取商户评价
	"GetMerchantEvaluationList": app + "ClientEvaluation/GetMerchantEvaluationList",

	// 获取工人／商户头像列表
	"Avatar": app + "Provider/Avatar",
}

export
default api;