ACCMOB.onEdit = {

	bindAll: function ()
	{
		this.bindGlobalClick();
	},

	bindGlobalClick: function ()
	{
		// Hook click event on body element to load CMS Component editor
		$('body').click(function (event)
		{
			var cmsComponent = ACCMOB.onEdit.findNearestCMSComponent(event);
			var cmsComponentUid = cmsComponent.data('cmsComponent');
			var cmsContentSlotUid = cmsComponent.data('cmsContentSlot');

			ACCMOB.onEdit.displayCMSComponentEditor(cmsComponentUid, cmsContentSlotUid);
			return false;
		});
	},

	findNearestCMSComponent: function (event)
	{
		return $(event.target).closest('.yCmsComponent');
	},

	displayCMSComponentEditor: function (cmsComponentUid, cmsContentSlotUid)
	{
		if (undefined != cmsComponentUid && cmsComponentUid != "" && parent.notifyIframeZkComponent)
		{
			parent.notifyIframeZkComponent(cmsComponentUid, cmsContentSlotUid);
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.onEdit.bindAll();
});
