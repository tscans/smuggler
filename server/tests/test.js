import { Meteor } from 'meteor/meteor';
import { Profile } from '../imports/collections/profile';
import { Page } from '../imports/collections/page';
import { Deal } from '../imports/collections/deal';
import { Message } from '../imports/collections/message';
import { Survey } from '../imports/collections/survey';
import { Question } from '../imports/collections/question';
import { Response } from '../imports/collections/response';
import moment from 'moment';

Meteor.startup(() => {
	console.log('test run')
	var d = new Date();
	var today = moment(d).format("ll");
	var tomorrow = moment(d).add(1).format("ll");
	for(var i = 0; i<4;i++){
		Deal.insert({
		metID: 'tester',
		pageID: 'page_test',
		pageName: "Noob Test",
		title: "noobie"+i.toString(),
		date: today,
		picture: "/mainlogo.png",
		address: 'some address',
		upvotes: [],
		createdAt: today,
		randomicon: "fa-gamepad",
		randomcolor: "blue",
		long: -87.71603119999999,
		lat: 41.7067521
	});
	}
	for(var i =0;i<4;i++){
		Deal.insert({
		metID: 'tester',
		pageID: 'page_test',
		pageName: "Noob Test",
		title: "noobie"+i.toString(),
		date: tomorrow,
		picture: "/mainlogo.png",
		address: 'some address',
		upvotes: [],
		createdAt: tomorrow,
		randomicon: "fa-gamepad",
		randomcolor: "blue",
		long: -87.71603119999999,
		lat: 41.7067521
	});
	}
	
	Page.insert({
		metID: "tester",
		email: "page@email.com",
		ownerName: 'me',
		address: 'some address',
		long: -87.71603119999999,
		lat: 41.7067521,
		createdAt: today,
		pageName: 'Noob Test',
		about: "stuff",
		phone: '77333333333',
		website: 'noooo',
		selectedMessages: [],
		online: true,
		favorites: 0,
		image: "/mainlogo.png"
	});
});