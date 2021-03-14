Ext.define('js.Order', {
	extend : 'Ext.panel.Panel',
	initComponent : function() {
		var me = this;
		me.views = {
			view : Ext.create('js.View', {
						controller : me
					}),
			'new' : Ext.create('js.Add', {
						controller : me
					}),
			edit : Ext.create('js.Edit', {
						controller : me
					}),
			list : Ext.create('js.List', {
						controller : me
					}),
			criteria : Ext.create('js.Query', {
						controller : me
					})
		};

		var va = [];
		for (var i in me.views)
			va.push(me.views[i]);

		var cfg = {
			layout : 'border',
			width : '100%',
			height : 500,
			items : [{
						region : 'center',
						itemId : 'ws',
						xtype : 'panel',
						title : '界面',
						layout : 'card',
						margin : '5 0 0 5',
						items : va
					}, {
						region : 'east',
						xtype : 'panel',
						title : '编码需求',
						width : '40%',
						margin : '5 0 0 5',
						resizable : true,
						resizeHandles : 'w',
						collapsible : true,
						split : true,
						html : '<iframe src="order.html" width="100%" height="100%" frameborder="0"></iframe>'
					}]
		};
		Ext.apply(me, cfg);
		me.callParent();

		me.setView('list');
	},

	setView : function(name) {
		this.down('#ws').getLayout().setActiveItem(this.views[name]);
	}
});

Ext.define('js.Base', {
			extend : 'Ext.panel.Panel',
			padding : 5,
			layout : 'border',
			items : [{
						itemId : 'head',
						region : 'north',
						xtype : 'form',
						border : 0,
						bodyPadding : 10,
						layout : {
							type : 'table',
							columns : 2,
							tableAttrs : {
								width : '100%'
							}
						},
						defaultType : 'textfield',
						fieldDefaults : {
							labelWidth : 120,
							labelAlign : 'right'
						},
						items : [{
									xtype : 'displayfield',
									name : 'billNumber',
									fieldLabel : '单据编号',
									xtype : 'displayfield',
									value : '201306190003'
								}, {
									xtype : 'displayfield',
									name : 'state',
									fieldLabel : '单据状态',
									value : '未发送'
								}, {
									name : 'orcDate',
									fieldLabel : '发生日期',
									value : '2012-06-30'
								}, {
									name : 'remark',
									fieldLabel : '备注'
								}]
					}, {
						region : 'center',
						itemId : 'linePanel',
						extend : 'Ext.panel.Panel',
						layout : 'border',
						items : [{
							region : 'center',
							itemId : 'linePanel',
							xtype : 'grid',
							store : Ext.create('Ext.data.Store', {
										fields : ['code', 'name', 'unit', {
													name : 'unitprice'
												}, {
													name : 'qty'
												}, {
													name : 'amount'
												}],
										data : [{
													code : '111',
													name : '商品1',
													unit : '盒',
													unitprice : '10.00',
													qty : '100.00',
													amount : '1000.00'
												}]
									}),
							xplugins : [Ext.create(
									'Ext.grid.plugin.CellEditing', {
										clicksToEdit : 1
									})],
							columns : [{
										xtype : 'rownumberer',
										header : '序'
									}, {
										header : '商品代码',
										dataIndex : 'code',
										flex : 1.5,
										xeditor : {
											xtype : 'textfield',
											allowBlank : false
										}
									}, {
										header : '商品名称',
										dataIndex : 'name',
										flex : 3
									}, {
										header : '单位',
										dataIndex : 'unit',
										flex : 1
									}, {
										header : '单价',
										dataIndex : 'unitprice',
										flex : 1
									}, {
										header : '数量',
										dataIndex : 'qty',
										flex : 1
									}, {
										header : '金额',
										dataIndex : 'amount',
										flex : 1
									}]
						}, {
							itemId : 'lineEdit',
							region : 'south',
							xtype : 'form',
							bodyPadding : 10,
							layout : {
								type : 'table',
								columns : 4,
								tableAttrs : {
									width : '100%'
								}
							},
							defaultType : 'textfield',
							fieldDefaults : {
								labelWidth : 60,
								labelAlign : 'right'

							},
							items : [{
										fieldLabel : '代码',
										name : 'code',
										value : '111'
									}, {
										fieldLabel : '数量',
										name : 'qty',
										value : '100.00'
									}, {
										fieldLabel : '单位',
										name : 'unit',
										xtype : 'displayfield',
										value : '盒'
									}, {
										fieldLabel : '单价',
										name : 'price',
										xtype : 'displayfield',
										value : '10.00'
									}, {
										fieldLabel : '商品名称',
										name : 'name',
										xtype : 'displayfield',
										value : '商品1',
										colspan : 3,
										size : 100
									}, {
										fieldLabel : '金额',
										name : 'price',
										xtype : 'displayfield',
										value : '1000.00'
									}]
						}]
					}, {
						itemId : 'summary',
						region : 'south',
						xtype : 'form',
						bodyPadding : 10,
						layout : {
							type : 'table',
							columns : 3,
							tableAttrs : {
								width : '100%'
							}
						},
						fieldDefaults : {
							labelWidth : 60
						},
						items : [{
									fieldLabel : '品项合计',
									name : 'discount',
									xtype : 'displayfield',
									value : '1'
								}, {
									fieldLabel : '数量合计',
									name : 'amount',
									xtype : 'displayfield',
									value : '100.00'
								}, {
									itemId : 'earnest',
									fieldLabel : '金额合计',
									name : 'earnest',
									xtype : 'displayfield',
									value : '1000.00'
								}]
					}]
		});

Ext.define('js.Add', {
			extend : 'js.Base',
			padding : 5,
			tbar : {
				xtype : 'title',
				title : '单据编码练习新增'
			},
			initComponent : function() {
				var me = this;
				var cfg = {
					bbar : [{
								text : '[ESC]返回',
								handler : function() {
									me.controller.setView('list');
								}
							}, {
								text : '[F1]保存',
								handler : function() {
									me.controller.setView('view');
								}
							}]
				};
				Ext.apply(me, cfg);
				me.callParent();
				me.down('#head').getForm().setValues({
							'state' : '未发送'
						});
			}
		});

Ext.define('js.Edit', {
			extend : 'js.Base',
			tbar : {
				xtype : 'title',
				title : '单据编码练习修改'
			},
			initComponent : function() {
				var me = this;
				var cfg = {
					bbar : [{
								text : '[ESC]返回',
								handler : function() {
									me.controller.setView('view');
								}
							}, {
								text : '[F1]保存',
								handler : function() {
									me.controller.setView('view');
								}
							}]
				};
				Ext.apply(me, cfg);
				me.callParent();
			}
		});

Ext.define('js.View', {
			extend : 'Ext.panel.Panel',
			initComponent : function() {
				var me = this;
				var cfg = {
					layout : 'border',
					padding : 5,
					items : [{
								itemId : 'head',
								region : 'north',
								xtype : 'form',
								border : 0,
								bodyPadding : 10,
								layout : {
									type : 'table',
									columns : 2,
									tableAttrs : {
										width : '100%'
									}
								},
								defaultType : 'displayfield',
								fieldDefaults : {
									labelWidth : 120,
									labelAlign : 'right'
								},
								items : [{
											xtype : 'displayfield',
											name : 'billNumber',
											fieldLabel : '单据编号',
											value : 201306190001
										}, {
											xtype : 'displayfield',
											name : 'state',
											fieldLabel : '单据状态',
											value : '未发送'
										}, {
											name : 'orcDate',
											fieldLabel : '发生日期',
											value : '2013-06-29'
										}, {
											xtype : 'displayfield',
											name : 'state',
											fieldLabel : '备注'
										}]
							}, {
								region : 'center',
								xtype : 'grid',
								store : Ext.create('Ext.data.Store', {
											fields : ['code', 'name', 'unit', {
														name : 'unitprice'
													}, {
														name : 'qty'
													}, {
														name : 'amount'
													}],
											data : [{
														code : '111',
														name : '商品1',
														unit : '盒',
														unitprice : '10.00',
														qty : '100.00',
														amount : '1000.00'
													}]
										}),
								columns : [{
											xtype : 'rownumberer',
											header : '#'
										}, {
											header : '商品代码',
											dataIndex : 'code',
											flex : 1.5
										}, {
											header : '商品名称',
											dataIndex : 'name',
											flex : 3
										}, {
											header : '单位',
											dataIndex : 'unit',
											flex : 1
										}, {
											header : '单价',
											dataIndex : 'unitprice',
											flex : 1
										}, {
											header : '数量',
											dataIndex : 'qty',
											flex : 1
										}, {
											header : '金额',
											dataIndex : 'amount',
											flex : 1
										}]
							}, {
								itemId : 'lineEdit',
								region : 'south',
								xtype : 'form',
								bodyPadding : 10,
								layout : {
									type : 'table',
									columns : 4,
									tableAttrs : {
										width : '100%'
									}
								},
								defaultType : 'textfield',
								fieldDefaults : {
									labelWidth : 60,
									labelAlign : 'right'

								},
								items : [{
											fieldLabel : '代码',
											xtype : 'displayfield',
											name : 'code',
											value : '111'
										}, {
											fieldLabel : '数量',
											xtype : 'displayfield',
											name : 'qty',
											value : '100.00'
										}, {
											fieldLabel : '单位',
											name : 'unit',
											xtype : 'displayfield',
											value : '盒'
										}, {
											fieldLabel : '单价',
											name : 'price',
											xtype : 'displayfield',
											value : '10.00'
										}, {
											fieldLabel : '商品名称',
											name : 'name',
											xtype : 'displayfield',
											value : '商品1',
											colspan : 3,
											size : 100
										}, {
											fieldLabel : '金额',
											name : 'price',
											xtype : 'displayfield',
											value : '1000.00'
										}]
							}, {
								itemId : 'summary',
								region : 'south',
								xtype : 'form',
								bodyPadding : 10,
								layout : {
									type : 'table',
									columns : 4,
									tableAttrs : {
										width : '100%'
									}
								},
								fieldDefaults : {
									labelWidth : 120
								},
								items : [{
											fieldLabel : '品项合计',
											name : 'count',
											xtype : 'displayfield',
											value : '1'
										}, {
											fieldLabel : '数量合计',
											name : 'qtyTotal',
											xtype : 'displayfield',
											value : '100.00'
										}, {
											fieldLabel : '金额合计',
											name : 'amountTotal',
											xtype : 'displayfield',
											value : '1000.00'
										}]
							}],
					tbar : {
						xtype : 'title',
						title : '单据编码练习查看'
					},
					bbar : [{
								text : '[ESC]主菜单'
							}, {
								text : '[0]列表',
								handler : function() {
									me.controller.setView('list');
								}
							}, {
								text : '[3]新增',
								handler : function() {
									me.controller.setView('new');
								}
							}, {
								text : '[5]编辑',
								handler : function() {
									me.controller.setView('edit');
								}
							}, {
								text : '[7]删除',
								handler : function() {

								}
							}]
				};
				Ext.apply(me, cfg);
				me.callParent();
			}
		});

Ext.define('js.List', {
			extend : 'Ext.panel.Panel',
			padding : 5,
			initComponent : function() {
				var me = this;
				var cfg = {
					layout : 'border',
					items : [{
						region : 'center',
						xtype : 'grid',
						store : Ext.create('Ext.data.Store', {
									fields : ['billNumber', 'orcDate', 'count',
											{
												name : 'qty'
											}, 'amount', 'state'],
									data : [{
												billNumber : '201306190001',
												orcDate : '2012-06-30',
												count : '1',
												qty : '1',
												amount : '1000.00',
												state : '未发送'
											}, {
												billNumber : '201306190002',
												orcDate : '2012-06-30',
												count : '1',
												qty : '2',
												amount : '2000.00',
												state : '已送达'
											}]
								}),
						columns : [{
									header : '单号',
									dataIndex : 'billNumber',
									width : 120
								}, {
									header : '发生日期',
									dataIndex : 'orcDate',
									flex : 1
								}, {
									header : '品项数',
									dataIndex : 'count'
								}, {
									header : '数量',
									dataIndex : 'qty'
								}, {
									header : '金额',
									dataIndex : 'amount'
								}, {
									header : '状态',
									dataIndex : 'state'
								}]
					}],
					tbar : {
						xtype : 'title',
						title : '单据编码练习列表'
					},
					bbar : [{
								text : '[ESC]主菜单'
							}, {
								text : '[0]查询',
								handler : function() {
									var win = Ext.widget('query');
									win.show();
								}
							}, {
								text : '[1]新增',
								handler : function() {
									me.controller.setView('new');
								}
							}, {
								text : '[2]查看',
								handler : function() {
									me.controller.setView('view');
								}
							}]
				};
				Ext.apply(me, cfg);
				me.callParent();
			}
		});

Ext.define('js.Query', {
			extend : 'Ext.window.Window',
			alias : 'widget.query',
			initComponent : function() {
				var me = this;
				var cfg = {
					title : '单据编码练习查询',
					border : 0,
					modal : true,
					items : [{
								border : 0,
								xtype : 'form',
								padding : 5,
								defaultType : 'textfield',
								fieldDefaults : {
									labelAlign : 'right',
									labelWidth : 150,
									width : 350
								},
								items : [{
											name : 'billNumber',
											fieldLabel : '单号包含'
										}, {
											fieldLabel : '状态等于',
											name : 'registered',
											xtype : 'combo',
											editable : false,
											value : '全部',
											store : Ext.create(
													'Ext.data.Store', {
														fields : ['value',
																'text'],
														data : [{
																	value : '',
																	text : '全部'
																}, {
																	value : 'true',
																	text : '未发送'
																}, {
																	value : 'true',
																	text : '已发送'
																}, {
																	value : 'true',
																	text : '系统拒绝'
																}, {
																	value : 'false',
																	text : '已送达'
																}]
													}),
											queryMode : 'local',
											valueField : 'value',
											displayField : 'text'
										}, {
											name : 'customerName',
											fieldLabel : '发生日期大于等于'
										}, {
											name : 'customerName',
											fieldLabel : '发生日期小于等于'
										}, {
											fieldLabel : '排序',
											name : 'registered',
											xtype : 'combo',
											editable : false,
											value : '发生日期',
											store : Ext.create(
													'Ext.data.Store', {
														fields : ['value',
																'text'],
														data : [{
																	value : '',
																	text : '单号'
																}, {
																	value : 'true',
																	text : '状态'
																}, {
																	value : 'false',
																	text : '发生日期'
																}]
													}),
											queryMode : 'local',
											valueField : 'value',
											displayField : 'text'
										}, {
											fieldLabel : '排序方式',
											name : 'registered',
											xtype : 'combo',
											editable : false,
											value : '升序',
											store : Ext.create(
													'Ext.data.Store', {
														fields : ['value',
																'text'],
														data : [{
																	value : '',
																	text : '升序'
																}, {
																	value : 'true',
																	text : '降序'
																}]
													}),
											queryMode : 'local',
											valueField : 'value',
											displayField : 'text'
										}]
							}],
					bbar : [{
								text : '[ESC]返回',
								handler : function() {
									me.close();
								}
							}, {
								text : '[F1]查询',
								handler : function() {
									me.close();
								}
							}]

				};
				Ext.apply(me, cfg);
				me.callParent();
			}
		});
