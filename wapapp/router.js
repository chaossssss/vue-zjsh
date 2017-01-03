import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Menu from './components/menu/Menu.vue';
import Service from './components/service/Service.vue';
import Activity from './components/activity/activity.vue';
import User from './components/user/User.vue';
import Order from './components/order/Order.vue';
import QuickOrder from './components/quick_order/Quick_order.vue';

export default new VueRouter({
	// mode: 'history',
	routes: [{
		path: '/',
		redirect: '/menu'
	}, {
		path: '/quick_order',
		component: QuickOrder
	}, {
		path: '/menu',
		component: Menu,
		children: [{
			//服务
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
			//用户
			path: 'user',
			component: User
		}]
	}]
});