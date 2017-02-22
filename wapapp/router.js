import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Menu from './components/menu/Menu.vue';
import Service from './components/service/Service.vue';

// 登录
import Login from './components/login/Login.vue';
import Regist from './components/login/Regist.vue';
import Forget from './components/login/Forget.vue';

// 活动
import Activity from './components/activity/activity.vue';

// 订单
import QuickOrder from './components/quick_order/Quick_order.vue';
import ChooseServiceType from './components/quick_order/Choose_service_type.vue';
import OrderDetail from './components/order/Order_detail.vue';
import OrderList from './components/order/Order_list.vue';
import PointOrder from './components/point_order/Point_order.vue'
import ChoosePointServiceType from './components/point_order/Choose_point_service_type.vue';

// 支付
import Pay from './components/pay/Pay.vue';
import Discount from './components/pay/Discount.vue';

// 服务地址
import AddrList from './components/address/Addr_list.vue';
import AddrEdit from './components/address/Addr_edit.vue';
import AddrAdd from './components/address/Addr_add.vue';

// 搜索
import SearchAll from './components/search/Search_all.vue';
import SearchFast from './components/search/Search_fast.vue';
import Search from './components/search/Search.vue';

// 商户 & 工人 主页
import WorkerDetail from './components/worker/Worker_detail.vue';
import BusinessDetail from './components/business/Business_detail.vue';

// 我的
import User from './components/user/User.vue';
import UserInfo from './components/user/User_info.vue';
import UserWallet from './components/user/User_wallet.vue';
import UserDiscount from './components/user/User_discount.vue';
import UserCollect from './components/user/User_collect.vue';
import CallLog from './components/user/Call_log.vue';
import UserFeedback from './components/user/User_feedback.vue';
import UserAward from './components/user/User_award.vue';
import InviteCode from './components/user/Invite_code.vue';

import EidtAvatar from './components/user/Eidt_avatar.vue';
import EidtPetName from './components/user/Eidt_petname.vue';
import UserQRcode from './components/user/User_QRcode.vue';
import EidtPassword from './components/user/Eidt_password.vue';

import UserBill from './components/user/User_bill.vue';
import UserRecharge from './components/user/User_recharge.vue';
import PaymentRecharge from './components/user/Payment_recharge.vue';
import BillDetail from './components/user/Bill_detail.vue';

export default new VueRouter({
	// mode: 'history',
	routes: [{
		path: '/',
		redirect: '/menu'
	}, {
		path: '/menu',
		component: Menu,
		children: [{
			// 找服务
			path: 'service',
			component: Service
		}, {
			//活动
			path: 'activity',
			component: Activity
		}, {
			// 订单列表
			path: 'order_list',
			component: OrderList
		}, {
			// 我的 
			path: 'user',
			component: User
		}]
	}, {
		// 登录
		path: '/login',
		component: Login
	}, {
		// 注册
		path: '/regist',
		component: Regist
	}, {
		// 忘记密码
		path: '/forget',
		component: Forget
	}, {
		// 服务地址列表
		name: 'addr_list',
		path: '/addr_list',
		component: AddrList
	}, {
		// 增加服务地址
		path: '/addr_add',
		component: AddrAdd
	}, {
		// 编辑服务地址
		name: 'addr_edit',
		path: '/addr_edit',
		component: AddrEdit
	}, {
		// 个人信息
		path: '/user_info',
		component: UserInfo
	}, {
		// 我的账户
		path: '/user_wallet',
		component: UserWallet
	}, {
		// 我的红包
		path: '/user_discount',
		component: UserDiscount
	}, {
		// 我的收藏
		path: '/user_collect',
		component: UserCollect
	}, {
		// 通话记录
		path: '/call_log',
		component: CallLog
	}, {
		// 我的评价
		path: '/user_feedback',
		component: UserFeedback
	}, {
		// 推荐有奖
		path: '/user_award',
		component: UserAward
	}, {
		// 填写二维码
		path: '/invite_code',
		component: InviteCode
	}, {
		// 编辑头像
		path: '/eidt_avatar',
		component: EidtAvatar
	}, {
		// 编辑昵称
		path: '/eidt_petname',
		component: EidtPetName
	}, {
		// 我的二维码
		path: '/user_QRcode',
		component: UserQRcode
	}, {
		// 修改密码
		path: '/eidt_password',
		component: EidtPassword
	}, {
		// 充值
		path: '/user_bill',
		component: UserBill
	}, {

		path: '/user_recharge',
		component: UserRecharge
	}, {
		// 账单明细
		path: '/bill_detail',
		component: BillDetail
	}, {
		//支付页充值
		path: '/payment_recharge',
		component: PaymentRecharge
	}, {
		// 指定下单
		path: '/point_order',
		component: PointOrder
	}, {
		// 指定下单选择服务类型
		name: 'point_service_type',
		path: '/point_service_type',
		component: ChoosePointServiceType
	}, {
		// 一键下单
		path: '/quick_order',
		component: QuickOrder
	}, {
		// 一键下单选择服务类型
		path: '/choose_service_type',
		component: ChooseServiceType
	}, {
		// 搜索
		path: '/search',
		component: Search
	}, {
		// 订单详情
		name: 'order_detail',
		path: '/order_detail',
		component: OrderDetail
	}, {
		// 支付
		name: 'pay',
		path: '/pay',
		component: Pay
	}, {
		// 红包
		name: 'discount',
		path: '/discount',
		component: Discount
	}, {
		// 工人主页
		path: '/worker',
		component: WorkerDetail
	}, {
		// 商户主页
		path: '/business',
		component: BusinessDetail
	}]
});