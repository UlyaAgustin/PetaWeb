// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/DataAggregation/js/UI/templates/FeatureToolbar.html":'\x3cdiv class\x3d"float-right no-select"\x3e\r\n  \x3ctable class\x3d"control-table table-layout" cellpading\x3d"0"\x3e\r\n    \x3ctbody\x3e\r\n      \x3ctr class\x3d"feature-toolbar-row"\x3e\r\n        \x3ctd title\x3d"${nls.featureToolbar.cancel}"\x3e\r\n          \x3cdiv data-dojo-attach-point\x3d"cancelButton" role\x3d"button" tabindex\x3d"-1" class\x3d"bg-ft-img bg-cancel feature-toolbar-btn" \r\n          aria-label\x3d"${nls.featureToolbar.cancel}" data-dojo-attach-event\x3d"onclick:_cancel, onkeydown:_cancel"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n        \x3ctd title\x3d"${nls.featureToolbar.save}"\x3e\r\n          \x3cdiv  data-dojo-attach-point\x3d"saveButton" role\x3d"button" tabindex\x3d"-1" class\x3d"float-right bg-ft-img bg-save feature-toolbar-btn"\r\n          aria-label\x3d"${nls.featureToolbar.save}" data-dojo-attach-event\x3d"onclick:_save, onkeydown:_save"\x3e\x3c/div\x3e\r\n        \x3c/td\x3e\r\n      \x3c/tr\x3e\r\n    \x3c/tbody\x3e\r\n  \x3c/table\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Evented dojo/query dojo/dom-class dojo/dom-attr dojo/dom-construct dojo/Deferred dijit/_WidgetBase dijit/_TemplatedMixin dojo/on dojo/keys dojox/gfx/fx dojo/text!./templates/FeatureToolbar.html esri/toolbars/edit jimu/dijit/Message jimu/dijit/Popup jimu/portalUtils jimu/utils esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/Color esri/graphic esri/geometry/webMercatorUtils esri/request".split(" "),function(A,g,n,B,
t,v,l,C,q,D,E,r,p,F,G,H,u,I,w,x,y,z,J,K,L,M){return A([D,E,B],{templateString:G,baseClass:"cf-feature-toolbar",declaredClass:"FeatureToolbar",label:"FeatureToolbar",parent:null,nls:null,map:null,appConfig:null,config:null,feature:null,layer:null,theme:"",locators:[],styleColor:"",featureView:null,_editToolbar:null,csvStore:null,_isAddressFeature:!0,_stageLayer:null,constructor:function(a){g.mixin(this,a);this._syncDisabled=this._locateDisabled=this._cancelDisabled=this._saveDisabled=!0;this._hasAttributeEdit=
!1;this.own(r(this.featureView,"attribute-change",g.hitch(this,this._attributeChange)));this._hasAddressEdit=!1;this.own(r(this.featureView,"address-change",g.hitch(this,this._addressChange)));this._hasGeometryEdit=!1;this.own(r(this._editToolbar,"graphic-move-stop",g.hitch(this,this._graphicMoveStop)));this.own(r(this.featureView,"address-located",g.hitch(this,this._graphicMoveStop)));this.locator=this._getLocator(0);this._initOriginalValues()},postCreate:function(){this.inherited(arguments)},startup:function(){this.inherited(arguments);
this._started=!0;this.updateImageNodes()},_getLocator:function(a){for(var c;a<this.csvStore._geocodeSources.length;a++)if(this.locatorSource=this.csvStore._geocodeSources[a],this.locatorSource.locator.locationToAddress){c=this.locatorSource.locator;this._locatorIndex=a;break}c&&(c.outSpatialReference=this.map.spatialReference,c.countryCode=this.locatorSource.countryCode);return c},_initOriginalValues:function(){this._originalValues=g.clone(this.featureView.feature)},_attributeChange:function(a){this._hasAttributeEdit=
a;this.featureView.isDuplicate&&this.featureView._useGeomFromLayer?this._updateSaveAndCancel(!this._hasAttributeEdit):this._updateSaveAndCancel(!(this._hasAttributeEdit||this._hasGeometryEdit));this._updateSync(!this.featureView._validateAddressDifference())},_addressChange:function(a){this._hasAddressEdit=a;this._updateLocate(!a)},_graphicMoveStop:function(a){this.featureView.isShowing&&(this._hasGeometryEdit=!0,this.featureView.isDuplicate&&this.featureView._useGeomFromLayer?this._updateSaveAndCancel(!this._hasAttributeEdit):
this._updateSaveAndCancel(!(this._hasAttributeEdit||this._hasGeometryEdit)),this.map.infoWindow.setFeatures(this.featureView._feature),this.map.infoWindow.select(0),a?this._reverseLocate(a.graphic.geometry).then(g.hitch(this,function(){this._hasAddressEdit=!0;this._updateLocate(!0);this.featureView._validateAddressDifference()&&this._updateSync(!1);this.locator=this._getLocator(0)}),function(c){this.locator=this._getLocator(0);new u(c)}):this.featureView._validateAddressDifference()&&this._updateSync(!1))},
_reverseLocate:function(a){var c=new q;if(this._isAddressFeature){var b=this.parent.portal?this.parent.portal:this.appConfig.portalUrl?w.getPortal(this.appConfig.portalUrl):null,e=this.locatorSource&&this.locatorSource.isEsriLocator;M({url:this.locator.url+"/reverseGeocode",content:{f:"json",location:JSON.stringify(a),distance:100,outSR:JSON.stringify(a.spatialReference),forStorage:e?this.featureView.isDuplicate&&!this.featureView.isDuplicateLocated||this.featureView.isUnMatched&&!this.featureView.isUnMatchedLocated:
!1,token:e?b&&b.credential&&b.credential.token?b.credential.token:null:null},callbackParamName:"callback"}).then(g.hitch(this,function(f){this.featureView._updateAddressFields(f.address,!1);c.resolve({address:f.address})}),g.hitch(this,function(f){this._getNextLocator()?this._reverseLocate(a).then(function(d){c.resolve(d)}):(this.featureView._updateAddressFields({},!1),c.reject({message:f.message}))}))}else a.spatialReference.isWebMercator&&a.spatialReference.isWebMercator()&&(b=L.webMercatorToGeographic(a)),
this.featureView._updateAddressFields(b||a,!1),c.resolve({geometry:a});return c},_enableEdit:function(){this._editToolbar.activate(H.MOVE,this.featureView._feature)},_disableEdit:function(){this._editToolbar.deactivate()},_undoEdits:function(){this._hasAttributeEdit&&(this.featureView.resetAttributeValues(),this._hasAttributeEdit=!1);this._hasAddressEdit&&(this.featureView.resetAddressValues(this._originalValues),this._hasAddressEdit=!1);this._hasGeometryEdit?(this.featureView.resetGeometry(this._originalValues.geometry),
this._hasGeometryEdit=!1):this.featureView.resetFromLayerRows();this._updateSync(!this.featureView._validateAddressDifference());this._updateLocate(!0)},_locate:function(a){if("keydown"!==a.type||a.keyCode===p.ENTER||a.keyCode===p.SPACE)this._locateDisabled||this._locateFeature().then(g.hitch(this,function(){this._hasAddressEdit=!1;this._updateLocate(!0)}))},_cancel:function(a){if(("keydown"!==a.type||a.keyCode===p.ENTER||a.keyCode===p.SPACE)&&!this._cancelDisabled)var c=new I({titleLabel:this.nls.featureToolbar.cancelTitle,
width:400,autoHeight:!0,content:C.create("div",{innerHTML:this.nls.featureToolbar.cancelMessage,style:"padding-bottom: 10px;"}),buttons:[{label:this.nls.yes,onClick:g.hitch(this,function(){c.close();c=null;this._undoEdits();this._updateSaveAndCancel(!0);this._panToAndSelectFeature(this.featureView.isDuplicate&&this.featureView._useGeomFromLayer?this.featureView._editFeature:this.featureView._feature)})},{label:this.nls.no,onClick:g.hitch(this,function(){c.close()})}],onClose:g.hitch(this,function(){c=
null})})},_save:function(a,c){if("keydown"!==a.type||a.keyCode===p.ENTER||a.keyCode===p.SPACE){var b=this.featureView._feature;if(!this._saveDisabled||!0===c){!0!==c&&(this._setFieldValues(this.featureView),this._setAddressValues(this.featureView),this.featureView.feature.geometry=b.geometry,this._originalValues.geometry=b.geometry,this.featureView.isDuplicate&&(this._originalValues.duplicateGeometry=b.geometry));if(-1===this.featureView.label.indexOf("UnMatched")&&-1===this.featureView.label.indexOf("DuplicateFeatures"))this._updateLayer(this._stageLayer,
null,[b],null,!0,!1).then(g.hitch(this,function(f){f&&"success"===f.status&&this._updateFeatureListLabel(b)}));else if(this.featureView.isDuplicate&&!0!==c)this.featureView._updateDuplicateAttributes(null,!0),this._updateLayer(this.layer,null,[b],null,!0,!1).then(g.hitch(this,function(f){f&&"success"===f.status&&this._updateFeatureListLabel(b)}));else{var e=b.attributes[this.layer.objectIdField];this._updateLayer(this.layer,null,null,[b],!0,!1).then(g.hitch(this,function(f){f&&"success"===f.status&&
this.featureView._parentFeatureList.removeFeature(this.featureView.feature,e).then(g.hitch(this,function(){n.forEach(this.featureView._skipFields,g.hitch(this,function(d){delete b.attributes[d]}));this._updateLayer(this._stageLayer,[b],null,null,!0,!1).then(g.hitch(this,function(d){d&&"success"===d.status&&(d.hasOwnProperty("objectId")&&(this.featureView.feature.fieldInfo.filter(g.hitch(this,function(h){return h.name===this._stageLayer.objectIdField}))[0].value=d.objectId),this.featureView.feature.label=
b.attributes[this.csvStore.labelField],d=this.parent._pageContainer.getViewByTitle("Review"),d.matchedFeatureList.addFeature(this.featureView.feature),d.matchedFeatureList.resetFeatureList(),d._updateReviewRows(!0===c?"duplicate":"unmatched"))}))}))}))}!0!==c&&this._updateSaveAndCancel(!0)}}},_updateFeatureListLabel:function(a){var c=this.csvStore.labelField;a=a.attributes[c];var b=x.stripHTML(a.toString?a.toString():"");b!==this.featureView.featureListLabel.innerHTML&&("."!==this.csvStore.decimalSeperator&&
(a=this.feature.fieldInfo.filter(function(e){return e.name===c&&e.needsFormat&&-1===[null,void 0].indexOf(b)}))&&a.hasOwnProperty("length")&&0<a.length&&(b=x.localizeNumber(b),a[0].formattedValue=b),this.featureView.featureListLabel.innerHTML=b,this.featureView.pageTitleDiv.innerHTML=b)},_updateLayer:function(a,c,b,e,f,d){var h=new q;a.applyEdits(c,b,e).then(g.hitch(this,function(k){var m={status:"success"};this.featureView.isDuplicate&&(this._hasGeometryEdit&&this.featureView._useGeomFromFile&&(this._fileGeometryModified=
!0),this._hasAttributeEdit&&this.featureView._useValuesFromFile&&(this._fileValuesModified=!0));f&&(this._hasAttributeEdit=this._hasGeometryEdit=!1);k&&k.hasOwnProperty("length")&&0<k.length&&k[0].hasOwnProperty("objectId")&&(m.objectId=k[0].objectId);!d&&b&&b.hasOwnProperty("length")&&0<b.length&&(k=this.featureView.parent._pageContainer.getViewByTitle("Review"),k._updateNode(k.submitButton,!0));h.resolve(m)}),g.hitch(this,function(k){new u({message:this.nls.warningsAndErrors.saveError});h.resolve({status:"error",
error:k})}));return h},_setFieldValues:function(a){var c=a._useValuesFromFile,b=c?a._changedFileAttributeRows:a._changedLayerAttributeRows,e=a._feature,f=a.feature;n.forEach(a.featureControlTable.rows,function(d){if(d.isEditRow&&-1<b.indexOf(d.rowIndex)||d.parent&&d.parent.isDuplicate&&!c){var h=d.parent.isDuplicate&&!c?d.layerValueTextBox:d.fileValueTextBox;e.attributes[d.fieldName]=h.value;f.fieldInfo.filter(function(m){return m.name===d.fieldName})[0].value=h.value;d.parent.isDuplicate&&!c?d.layerValue=
h.value:d.fileValue=h.value;if(h.textbox)h.textbox.title=h.value;else if(h.domNode){var k=h.attr("displayedValue");h.domNode.title=k?k:h.value}}})},_setAddressValues:function(a){var c=a._getAddress(),b=this.csvStore.matchFieldPrefix;a.isDuplicate&&a._useGeomFromLayer||n.forEach(a.addressFields,function(e){var f=b+e.keyField;a.feature.fieldInfo.filter(function(k){return k.name===f})[0].value=c[f];for(var d,h=0;h<a.locationControlTable.rows.length&&(d=a.locationControlTable.rows[h],!d.isAddressRow||
d.keyField!==e.keyField);h++);d.addressValueTextBox.textbox?d.addressValueTextBox.textbox.title=c[f]:d.addressValueTextBox.domNode&&(e=d.addressValueTextBox.attr("displayedValue"),d.addressValueTextBox.domNode.title=e?e:d.addressValueTextBox.value);d.addressValue=c[f]})},_updateFeature:function(a,c,b){var e=this.featureView;e.feature.geometry=a;e._feature.geometry=a;a=[e._feature];e.isDuplicate?(e.isDuplicateLocated||(e.isDuplicateLocated=!0),this._hasGeometryEdit=e._editFeature.geometry.x!==e._feature.geometry.x||
e._editFeature.geometry.y!==e._feature.geometry.y):e.isUnMatched&&!e.isUnMatchedLocated&&(e.isUnMatchedLocated=!0);c||this._updateLayer(e.layer,null,a,null,!1,b).then(g.hitch(this,function(f){f&&"success"===f.status&&(this._panToAndSelectFeature(e._feature),e.emit("address-located"))}))},_locateFeature:function(a){var c=new q,b=this.featureView._getAddressFieldsValues();if(this._isAddressFeature){var e=this.parent.portal?this.parent.portal:this.appConfig.portalUrl?w.getPortal(this.appConfig.portalUrl):
null;this._addressToLocation({address:b,countryCode:this.locatorSource.countryCode,outFields:["ResultID","Score"],forStorage:this.featureView.isDuplicate&&!this.featureView.isDuplicateLocated||this.featureView.isUnMatched&&!this.featureView.isUnMatchedLocated,token:e&&e.credential&&e.credential.token?e.credential.token:null}).then(g.hitch(this,function(f){this.locator=this._getLocator(0);this._updateFeature(f.location,a,!0);c.resolve({feature:this.featureView.feature,address:f.address})}),function(f){new u({message:f.message})})}else b=
this.csvStore._getGeometry(b[this.xField],b[this.yField]),this._updateFeature(b,a,!0),c.resolve({feature:this.featureView.feature,geometry:b});return c},_addressToLocation:function(a){var c=new q;a.maxLocations=1;this.locator.addressToLocations(a,g.hitch(this,function(b){var e=this.csvStore.minScore,f;b&&0<b.length?(n.forEach(b,function(d){"undefined"===typeof f&&d.score>=e&&(f=d);f&&d.score>f.score&&(f=d)}),f?c.resolve(f):this._getNextLocator()?this._addressToLocation(a).then(function(d){c.resolve(d)}):
c.reject({message:this.nls.warningsAndErrors.cannotLocate})):this._getNextLocator()?this._addressToLocation(a).then(function(d){c.resolve(d)}):c.reject({message:this.nls.warningsAndErrors.cannotLocate})}),function(b){c.reject(b)});return c},_getNextLocator:function(){var a=!1,c=this._locatorIndex+1;c<this.csvStore._geocodeSources.length&&(this.locator=this._getLocator(c),a="undefined"!==typeof this.locator);return a},_flashFeatures:function(a){var c;n.forEach(a,g.hitch(this,function(b){if(b.geometry){var e=
J.fromHex(this.styleColor),f=g.clone(e);f.a=.4;e=new y(y.STYLE_CIRCLE,15,new z(z.STYLE_SOLID,e,1),f);b=new K(b.geometry,e);this.map.graphics.add(b);c=b.getLayer?b.getLayer():c;(b=b.getDojoShape())&&F.animateStroke({shape:b,duration:900,color:{start:b.strokeStyle.color,end:b.strokeStyle.color},width:{start:25,end:0}}).play()}}));setTimeout(g.hitch(this,function(b){b&&b.clear&&(b.clear(),a&&(a[0]._layer&&a[0]._layer.infoTemplate||a[0].infoTemplate)&&(this.map.infoWindow.setFeatures(a),this.map.infoWindow.select(0)))}),
1200,c)},_panToAndSelectFeature:function(a){if(a&&a.geometry){var c=this.map.getMaxZoom(),b=Math.round(.25*c);this.map.centerAndZoom(a.geometry,0<c-b?c-b:c).then(g.hitch(this,function(){this._flashFeatures([a])}))}},setStyleColor:function(a){this.styleColor=a},_updateCancel:function(a){this._cancelDisabled=a;this._updateImageNode("bg-cancel","bg-cancel-white","bg-cancel-disabled",this._cancelDisabled,this.domNode);this.cancelButton&&(a?l.set(this.cancelButton,"tabindex","-1"):l.set(this.cancelButton,
"tabindex","0"))},_updateSaveAndCancel:function(a){this._updateSave(a);this._updateCancel(a)},_updateSave:function(a){this._saveDisabled=a;this._updateImageNode("bg-save","bg-save-white","bg-save-disabled",this._saveDisabled,this.domNode);this.saveButton&&(a?l.set(this.saveButton,"tabindex","-1"):l.set(this.saveButton,"tabindex","0"))},_updateLocate:function(a){this._locateDisabled=a;this._updateImageNode("bg-locate","bg-locate-white","bg-locate-disabled",this._locateDisabled,this.featureView.domNode);
a?l.set(this.featureView.locateButton,"tabindex","-1"):l.set(this.featureView.locateButton,"tabindex","0")},_updateSync:function(a){this._syncDisabled=a;this.featureView.syncFields&&(this._updateImageNode("bg-sync","bg-sync-white","bg-sync-disabled",this._syncDisabled,this.featureView.domNode),a?l.set(this.featureView.syncFields,"tabindex","-1"):l.set(this.featureView.syncFields,"tabindex","0"))},updateImageNodes:function(){this._updateImageNode("bg-cancel","bg-cancel-white","bg-cancel-disabled",
this._cancelDisabled,this.domNode);this._updateImageNode("bg-save","bg-save-white","bg-save-disabled",this._saveDisabled,this.domNode);this._updateImageNode("bg-locate","bg-locate-white","bg-locate-disabled",this._locateDisabled,this.featureView.domNode);this._updateImageNode("bg-sync","bg-sync-white","bg-sync-disabled",this._syncDisabled,this.featureView.domNode)},_updateImageNode:function(a,c,b,e,f){var d=this.pageContainer.isDarkTheme,h=e?b:d?c:a,k=d?c:a;e=!1;d=t("."+a,f);d.hasOwnProperty("length")&&
0===d.length?d=t("."+b,f):(e=!0,k=a);!e&&d.hasOwnProperty("length")&&0===d.length?d=t("."+c,f):e||(e=!0,k=b);n.forEach(d,function(m){v.remove(m,k);v.add(m,h)})}})});