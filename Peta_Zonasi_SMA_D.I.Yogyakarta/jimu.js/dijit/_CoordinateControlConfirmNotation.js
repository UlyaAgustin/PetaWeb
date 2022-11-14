// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/Deferred dojo/_base/lang dojo/dom-construct dojo/dom-class dojo/aspect dojo/keys dojo/query dijit/Dialog dijit/form/Select dojo/_base/lang".split(" "),function(g,h,k,c,f,l,e,m,n,p,d){return g([n],{baseClass:"jimu-coordinate-control",numberOfInputs:0,selectOptions:{},comboOptions:{},dfd:null,constructor:function(a){d.mixin(this,a);this.numberOfInputs=a.options.length;this.selectOptions=a.options},postCreate:function(){this.inherited("postCreate",arguments);this.closable=
!1;this.closeButtonNode.style.display="none";"DartTheme"===this.theme&&f.add(this.containerNode,"coordinateControlDialog");this.message=c.create("div",{style:"margin-bottom: 5px"},this.containerNode,"first");this.message.innerHTML=this.numberOfInputs+" "+this.nls.multipleNotationLabel;this.comboOptions=new p({style:{width:"99%"},"aria-label":this.numberOfInputs+" "+this.nls.multipleNotationLabel},c.create("div",{},this.containerNode,"last"));this.own(l.after(this.comboOptions,"onChange",k.hitch(this,
this._onComboOptionsChanged)));for(var a=0;a<this.selectOptions.length;a++)this.comboOptions.addOption({value:this.selectOptions[a].name,label:this.selectOptions[a].notationType});this.buttonDiv=c.create("div",{"class":"buttonContainer",style:"margin-top:10px;"+(window.isRTL?"text-align:left":"text-align:right")},this.containerNode,"last");this.okButton=c.create("div",{innerHTML:this.nls.applyButtonLabel,"class":"jimu-btn",role:"button",tabindex:"0","aria-label":this.nls.applyButtonLabel,onclick:d.hitch(this,
function(){this.hide();this.dfd.resolve()}),onkeypress:d.hitch(this,function(b){if(b.keyCode===e.ENTER||b.keyCode===e.SPACE)this.hide(),this.dfd.resolve()})},this.buttonDiv,"first");this.cancelButton=c.create("div",{innerHTML:this.nls.cancelButtonLabel,"class":"jimu-btn",style:"margin: 0 5px 0 5px",role:"button",tabindex:"0","aria-label":this.nls.cancelButtonLabel,onclick:d.hitch(this,function(){this.hide();this.dfd.cancel()}),onkeypress:d.hitch(this,function(b){if(b.keyCode===e.ENTER||b.keyCode===
e.SPACE)this.hide(),this.dfd.cancel()})},this.buttonDiv,"last")},show:function(){this.inherited("show",arguments);this.dfd=new h;var a=this._getDOMElement(".dijitSelectLabel",this.comboOptions.domNode);a&&f.add(a,"dijitSelectLabelConfirmNotation");return this.dfd},_onComboOptionsChanged:function(){var a=this._getDOMElement(".dijitSelectLabel",this.comboOptions.domNode);a&&f.add(a,"dijitSelectLabelConfirmNotation")},_getDOMElement:function(a,b){return(a=m(a,b))&&1===a.length?a[0]:null}})});