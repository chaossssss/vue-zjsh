import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Menu from './components/menu/Menu.vue';
import Order from './components/order/Order.vue';
import QuickOrder from './components/quick_order/Quick_order.vue';
import Service from './components/service/Service.vue';

// 活动
import Activity from './components/activity/activity.vue';

// 搜索
import ServiceAll from './components/search/Search_all.vue';
import ServiceFast from './components/search/Search_fast.vue';

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
			//订单
			path: 'order',
			component: Order
		}, {
			// 我的 
			path: 'user',
			component: User
		}]
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
	}]
});