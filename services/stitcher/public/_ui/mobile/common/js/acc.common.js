/* Extend jquery with a postJSON method */
jQuery.extend({
	postJSON: function (url, data, callback)
	{
		return jQuery.post(url, data, callback, "json");
	}
});

// add a CSRF request token to POST ajax request if its not available
$.ajaxPrefilter(function (options, originalOptions, jqXHR)
{
	// Modify options, control originalOptions, store jqXHR, etc
	if (options.type === "post" || options.type === 'POST')
	{
		if (typeof options.data=='undefined')
			options.data='';
		if (options.data.indexOf("CSRFToken") === -1)
		{
			options.data = options.data + "&CSRFToken=" + ACC.config.CSRFToken;
		}
	}
});
