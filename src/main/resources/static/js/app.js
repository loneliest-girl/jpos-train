Ext.application({
			name : 'JPOS DEMO',
			launch : function() {
				Ext.create('js.Main', {
							renderTo : Ext.getBody(),
							width : '100%'
						});
			}
		});

Ext.define('js.Main', {
			extend : 'Ext.tab.Panel',
			title : 'JPOS 单据练习',
			initComponent : function() {
				var me = this;
				var cfg = {
					items : [{
								title : '增值业务',
								items : Ext.create('js.Ps')
							}, {
								title : '单据业务',
								items : Ext.create('js.Order')
							}]
				};
				Ext.apply(me, cfg);
				me.callParent();
			}

		});
