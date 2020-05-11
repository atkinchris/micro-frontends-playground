(function($){$.widget("mobile.easydialog", {
options:{
	header: "",
	content: "",
	type: "standard",
	openCB: false,
	closeCB: false,
	p:".",c:"ui-easydialog",ctn:"-container",bg:"-screen",close:"-close",h:"-hidden"
},
theme:{'standard':{header:'a',dialog:'d',input:'a'},'conf':{header:'i',dialog:'i',input:'i'},'info':{header:'h',dialog:'h',input:'i'},'error':{header:'g',dialog:'g',input:'i'}},
_create: function(){
	o=this.options;t=this.theme[o.type];
	$(o.p+o.c).remove();
	$(o.p+o.c+o.close).buttonMarkup({theme:t.input,icon:'delete',iconpos:'notext'});
	$(o.p+o.c+o.ctn).trigger('create').css("top", (($(window).height() - $(o.p+o.c+o.ctn).outerHeight()) / 2) + $(window).scrollTop() + "px");
	$(o.p+o.c).removeClass(o.c+o.h);
	this._oCB();
	if(typeof o.openCB == 'function') o.openCB();
},
close: function(){
	o=this.options;
	$(o.p+o.c).remove();
	this._cCB();
	if(typeof o.closeCB == 'function') o.closeCB();
},
_oCB: function(){
	$("body").css({overflow:"hidden"});
},
_cCB: function(){
	$("body").css({overflow:"visible"});
},
_init: function(){
	o=this.options;that=this;
	$(document).one("click",o.p+o.c+o.close,function(){that.close()});
}
});})(jQuery);