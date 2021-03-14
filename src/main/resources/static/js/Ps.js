Ext.define('js.Ps', {
	extend : 'Ext.panel.Panel',
	initComponent : function() {
		var me = this;
		me.views = {
			create : Ext.create('js.Create', {
						controller : me
					}),
			list : Ext.create('js.List', {
						controller : me
					})
		}

		var va = [];
		for (var i in me.views) {
			va.push(me.views[i]);
		}

		var cfg = {
			width:'100%',
			height:500,
			layout : 'border',
			items : [{
				title : '编码需求',
				region : 'east',
				xtype : 'panel',
				margin : '5 0 0 5',
				width : '40%',
				collapsible : true,
				split : true,
				html : '<iframe src="ps.html" width="100%" height="100%" frameborder="0"></iframe>'
			}, {
				title : '界面',
				itemId : 'ws',
				region : 'center',
				xtype : 'panel',
				margin : '5 0 0 5',
				layout : 'card',
				items : va
			}]
		};
		Ext.apply(me, cfg);
		me.callParent();

		me.setView('create');
	},

	setView : function(name) {
		this.down('#ws').getLayout().setActiveItem(this.views[name])
	}
})

Ext.define('js.Create', {
	extend : 'Ext.panel.Panel',
	initComponent : function() {
		var me = this;
		var cfg = {
			padding : 5,
			layout : 'border',
			items : [{
				region : 'center',
				xtype : 'form',
				layout : {
					type : 'vbox',
					align : 'center',
					pack : 'center'
				},
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 80
				},
				defaultType : 'textfield',
				items : [{
							name : 'payMode',
							fieldLabel : '付费项目',
							xtype : 'combo',
							value : '燃气费',
							editable : false,
							store : Ext.create('Ext.data.Store', {
										fields : ['value'],
										data : [{
													value : '燃气费'
												}, {
													value : '水费'
												}, {
													value : '电费'
												}]
									}),
							queryMode : 'local',
							valueField : 'value',
							displayField : 'value'
						}, {
							xtype : 'numberfield',
							minLength : 10,
							maxLength : 10,
							hideTrigger : true,
							keyNavEnabled : false,
							mouseWheelEnabled : false,
							name : 'account',
							fieldLabel : '用户编码',
							allowBlank : false,
							enableKeyEvents : true,
							listeners : {
								keyup : function(field, e) {
									if (e.getKey() == e.ENTER) {
										me.down('#amount').setValue('120.00');
										me.down('#fee').setValue('5.00');
										me.down('#totalAmount')
												.setValue('125.00');
									}
								}
							}
						}, {
							itemId : 'amount',
							name : 'amount',
							fieldLabel : '代缴金额',
							disabled : true
						}, {
							itemId : 'fee',
							name : 'fee',
							fieldLabel : '手续费',
							disabled : true
						}, {
							itemId : 'totalAmount',
							name : 'totalAmount',
							disabled : true,
							fieldLabel : '总金额'
						}]
			}, {
				region : 'south',
				xtype : 'fieldset',
				title : '提醒',
				items : [{
					name : 'remark',
					xtype : 'container',
					padding : 5,
					html : '1、适用范围：上海付费通信息服务有限公司家庭用户<br/>2、可支付逾期账单，建议不超过1个月<br/>3、已代扣或其它渠道支付请勿重复付费，客服热线:962777'
				}]
			}],
			tbar : {
				xtype : 'title',
				title : '上海付费通代缴'
			},
			bbar : [{
						text : '[ESC]主菜单'
					}, {
						text : '[F10]按键帮助'
					}, {
						text : '[F1]确认'
					}, {
						text : '[F5]查询',
						handler : function() {
							me.controller.setView('list');
						}
					}]
		};

		Ext.apply(me, cfg);
		me.callParent();
	}
});

Ext.define('js.List', {
	extend : 'Ext.panel.Panel',
	initComponent : function() {
		var me = this;
		var cfg = {
			padding : 5,
			layout : 'border',
			tbar : {
				xtype : 'title',
				title : '上海付费通查询'
			},
			items : [{
						region : 'north',
						xtype : 'form',
						defaultType : 'textfield',
						layout : {
							type : 'table',
							columns : 2,
							tableAttrs : {
								width : '100%'
							}
						},
						fieldDefaults : {
							labelWidth : 120,
							labelAlign : 'right',
							width : '100%'
						},
						items : [{
									itemId : 'flowNo',
									fieldLabel : '流水号类似于'
								}, {
									fieldLabel : '账号类似于'
								}, {
									fieldLabel : '付费项目等于',
									xtype : 'combo',
									editable : false,
									value : '全部',
									store : Ext.create('Ext.data.Store', {
												fields : ['value'],
												data : [{
															value : '全部'
														}, {
															value : '燃气费'
														}, {
															value : '水费'
														}, {
															value : '电费'
														}]
											}),
									queryMode : 'local',
									valueField : 'value',
									displayField : 'value'
								}, {
									fieldLabel : '状态等于',
									xtype : 'combo',
									editable : false,
									value : '全部',
									store : Ext.create('Ext.data.Store', {
												fields : ['value'],
												data : [{
															value : '全部'
														}, {
															value : '代缴处理中'
														}, {
															value : '代缴成功'
														}, {
															value : '代缴失败'
														}, {
															value : '已退款'
														}]
											}),
									queryMode : 'local',
									valueField : 'value',
									displayField : 'value'
								}, {
									fieldLabel : '交易时间大于等于'
								}, {
									fieldLabel : '交易时间小于等于'
								}]
					}, {
						region : 'center',
						xtype : 'grid',
						store : Ext.create('Ext.data.Store', {
							fields : ['orcTime', 'billNumber', 'type', 'state',
									'account', 'amount', 'fee', 'controlState'],
							data : [{
										billNumber : '201306290001',
										orcTime : '2012-06-29 09:11:45',
										type:'燃气费',
										account : '1789837361',
										amount : '100.00',
										fee : '2.00',
										state : '代缴(代缴成功)',
										controlState : ''
									}, {
										billNumber : '201306300001',
										orcTime : '2012-06-30 09:11:45',
										type:'水费',
										account : '1789837361',
										amount : '100.00',
										fee : '2.00',
										state : '代缴(代缴处理中)',
										controlState : ''
									}, {
										billNumber : '201306280001',
										orcTime : '2012-06-28 09:11:45',
										type:'电费',
										account : '1789837361',
										amount : '100.00',
										fee : '2.00',
										state : '代缴(代缴失败)',
										controlState : ''
									}, {
										billNumber : '201306270001',
										orcTime : '2012-06-27 09:11:45',
										type:'燃气费',
										account : '1789837361',
										amount : '100.00',
										fee : '2.00',
										state : '代缴(代缴失败)',
										controlState : '已退款'
									}, {
										billNumber : '201306270002',
										orcTime : '2012-06-28 12:08:01',
										type:'燃气费',
										account : '1789837361',
										amount : '100.00',
										fee : '2.00',
										state : '退款(已退款)',
										controlState : ''
									}]
						}),
						columns : [{
									header : '交易时间',
									dataIndex : 'orcTime',
									width : 150
								}, {
									header : '流水号',
									dataIndex : 'billNumber',
									width : 110
								}, {
									header : '账号',
									dataIndex : 'account',
									width : 100,
									flex : 1
								},{
									header : '付费项目',
									dataIndex : 'type',
									width : 80
								}, {
									header : '缴费金额',
									dataIndex : 'amount',
									width : 80
								}, {
									header : '手续费',
									dataIndex : 'fee',
									width : 70
								}, {
									header : '类型（状态）',
									dataIndex : 'state',
									width : 120
								}, {
									header : '处理状态',
									dataIndex : 'controlState',
									width : 80
								}]
					}, {
						itemId : 'summary',
						region : 'south',
						xtype : 'form',
						layout : {
							type : 'table',
							columns : 4,
							tableAttrs : {
								width : '100%'
							}
						},
						fieldDefaults : {
							labelWidth : 120,
							labelAlign : 'right'
						},
						items : [{
									fieldLabel : '代缴笔数',
									name : 'count',
									xtype : 'displayfield',
									value : '2'
								}, {
									fieldLabel : '代缴总额',
									name : 'amount',
									xtype : 'displayfield',
									value : '204.00'
								}, {
									fieldLabel : '待退款',
									name : 'refund',
									xtype : 'displayfield',
									value : '102.00'
								}]
					}],
			bbar : [{
						text : '[ESC]返回',
						handler : function() {
							me.controller.setView('create');
						}
					}, {
						text : '[F10]按键帮助'
					}, {
						text : '[F1]退款'
					}, {
						text : '[F3]条件',
						handler : function() {
							me.down('#flowNo').focus(false, 100);
						}
					}, {
						text : '[F5]查询'
					}]
		};
		Ext.apply(me, cfg);
		me.callParent();
	}
});