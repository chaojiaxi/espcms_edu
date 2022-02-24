//General
//for example: instead of each module writing out script found in moduleMaxMin_OnClick have the functionality cached
//

var DNN_COL_DELIMITER = String.fromCharCode(16);
var DNN_ROW_DELIMITER = String.fromCharCode(15);
var __dnn_m_bPageLoaded = false;

window.onload = __dnn_Page_OnLoad;

function __dnn_ClientAPIEnabled()
{
	return typeof(dnn) != 'undefined';
}


function __dnn_Page_OnLoad()
{
	if (__dnn_ClientAPIEnabled())
	{
			//init tabpanes
		__dnn_InitTabPanes(dnn.getVar("dnntabpanegroups"));
		var sLoadHandlers = dnn.getVar('__dnn_pageload');
		if (sLoadHandlers != null)
			eval(sLoadHandlers);
		
		dnn.dom.attachEvent(window, 'onscroll', __dnn_bodyscroll);
		
	}
	__dnn_m_bPageLoaded = true;
}

function __dnn_KeyDown(iKeyCode, sFunc, e)
{
	if (e == null)
		e = window.event;

	if (e.keyCode == iKeyCode)
	{
		eval(unescape(sFunc));
		return false;
	}
}

function __dnn_bodyscroll() 
{
	var oF=document.forms[0];	
	if (__dnn_ClientAPIEnabled() && __dnn_m_bPageLoaded)
		oF.ScrollTop.value=document.documentElement.scrollTop ? document.documentElement.scrollTop : dnn.dom.getByTagName("body")[0].scrollTop;
}

function __dnn_setScrollTop(iTop)
{
	if (__dnn_ClientAPIEnabled())
	{
		if (iTop == null)
			iTop = document.forms[0].ScrollTop.value;
	
		var sID = dnn.getVar('ScrollToControl');
		if (sID != null && sID.length > 0)
		{
			var oCtl = dnn.dom.getById(sID);
			if (oCtl != null)
			{
				iTop = dnn.dom.positioning.elementTop(oCtl);
				dnn.setVar('ScrollToControl', '');
			}
		}
		window.scrollTo(0, iTop);
	}
}

//Focus logic
function __dnn_SetInitialFocus(sID)
{
	var oCtl = dnn.dom.getById(sID);	
	if (oCtl != null && __dnn_CanReceiveFocus(oCtl))
		oCtl.focus();
}	

function __dnn_CanReceiveFocus(e)
{
	//probably should call getComputedStyle for classes that cause item to be hidden
	if (e.style.display != 'none' && e.tabIndex > -1 && e.disabled == false && e.style.visible != 'hidden')
	{
		var eParent = e.parentElement;
		while (eParent != null && eParent.tagName != 'BODY')
		{
			if (eParent.style.display == 'none' || eParent.disabled || eParent.style.visible == 'hidden')
				return false;
			eParent = eParent.parentElement;
		}
		return true;
	}
	else
		return false;
}
//tabpanes handler
function __dnn_InitTabPanes(paneGroups)
{
  //var paneGroups = dnn.getVar("dnntabpanegroups");
  if(paneGroups!=null){
     paneGroups =paneGroups.split(';')
  }else{
    return 0;
  }
  var tabPane;
  var tabPaneItems;
  var titleSection;
  var contentSection;
  var tcGroup;//title content group split by |
  var tabContainer;
  var tabPanesContainer;
  var tabContentContainer;
  for(var i =0; i<paneGroups.length-1;i++)
  {
     tabPane = new __dnn_TabPane(paneGroups[i]);
     tabPaneItems = dnn.getVar(tabPane.groupName);
     if(tabPaneItems!=null){
       tabPaneItems = tabPaneItems.split(';');
     }else{
       continue;
     }
     for(var j=0;j<tabPaneItems.length-1;j++)
     {
       tcGroup =tabPaneItems[j].split('|');
       if(j==0)
       {
         //在所有的tabpane前插入一个span
         tabContainer = document.createElement("div");
         tabContainer.className = "tabContainer";
         tabPanesContainer = document.createElement("div");
         tabPanesContainer.className = "tabPanesContainer";
         tabContentContainer = document.createElement("div");
         tabContentContainer.className = "tabContentContainer";
         //panes group
         tabContainer.insertAdjacentElement("beforeEnd",tabPanesContainer);
         //contents group
         tabContainer.insertAdjacentElement("beforeEnd",tabContentContainer);
         
         dnn.dom.getById(tcGroup[0]).insertAdjacentElement("beforeBegin",tabContainer);
       }
       tabPane.addItem(new __dnn_TabPaneItem(tcGroup[0],tcGroup[1],tabPane));
       tabPanesContainer.insertAdjacentElement("beforeEnd",tabPane.items[j].paneSection);
       tabContentContainer.insertAdjacentElement("beforeEnd",tabPane.items[j].contentSection);

     }
     var  selectIndex= dnn.getVar(tabPane.groupName + "_selected");
     if(selectIndex!=null){
        tabPane.select(tabPane.items[parseInt(selectIndex)]);
     }else{
       if(tabPane.items[0]){
          tabPane.select(tabPane.items[0]);
       }
     }
  }
}
function __dnn_TabPane(groupName)
{
  this.groupName = groupName;
  this.items =[];
  this.selectedItem = null;
}
__dnn_TabPane.prototype ={
  addItem:function(tabPaneItem){
    tabPaneItem.index = this.items.length;
    this.items.push(tabPaneItem);
  },
  select:function(tabPaneItem){
    if(this.selectedItem)
       this.selectedItem.hide();
    this.selectedItem = tabPaneItem;
    this.selectedItem.show();
    dnn.setVar(this.groupName + "_selected",this.selectedItem.index);
    if(this.onSelect)
      this.onSelect(tabPaneItem);
  }
}
function __dnn_TabPaneItem(titleSection,contentSection,parent)
{
  this.titleSection = dnn.dom.getById(titleSection);
  this.contentSection = dnn.dom.getById(contentSection);
  this.contentSection.className ="tabPaneContent";
  this.parent = parent;
  this.index =0;
  this.paneSection = null;
  this._render();
  this.hide();
  
}
__dnn_TabPaneItem.prototype ={
  _render:function(){//private method
    this.paneSection = document.createElement("span");
    this.paneSection.className = "tabPaneContainerNormal" ; 
    this.paneSection.left = document.createElement("span");
    this.paneSection.left.className ="tabPaneLeft";
    //this.tabPane.left.innerHTML ="[";
    this.paneSection.insertAdjacentElement("beforeEnd",this.paneSection.left);
    this.titleSection.className ="tabPaneTitle"
    this.paneSection.insertAdjacentElement("beforeEnd",this.titleSection);
    this.paneSection.right = document.createElement("span");
    this.paneSection.right.className ="tabPaneRight";
    //this.tabPane.right.innerHTML ="]";
    this.paneSection.insertAdjacentElement("beforeEnd",this.paneSection.right);
    dnn.dom.addSafeHandler(this.paneSection, 'onclick', this, 'onClick');
    
    return this.paneSection;
  },
  hide:function(){
    this.contentSection.style.display='none';
    this.paneSection.className = "tabPaneContainerNormal" ;
  },
  show:function(){
    this.contentSection.style.display ='';
    this.paneSection.className = "tabPaneContainerActive" ;
  },
  onClick:function(e){
    if(this.titleSection.jsfunction){
        eval(this.titleSection.jsfunction);
    }
    this.parent.select(this);
  }
}
//Max/Min Script
function __dnn_ContainerMaxMin_OnClick(oLnk, sContentID)
{
	var oContent = dnn.dom.getById(sContentID);
	if (oContent != null)
	{
		var oBtn = oLnk.childNodes[0];
		var sContainerID = oLnk.getAttribute('containerid');
		var sCookieID = oLnk.getAttribute('cookieid');
		var sCurrentFile = oBtn.src.toLowerCase().substr(oBtn.src.lastIndexOf('/'));
		var sMaxFile;
		var sMaxIcon;
		var sMinIcon;

		if (dnn.getVar('min_icon_' + sContainerID))
			sMinIcon = dnn.getVar('min_icon_' + sContainerID);
		else
			sMinIcon = dnn.getVar('min_icon');

		if (dnn.getVar('max_icon_' + sContainerID))
			sMaxIcon = dnn.getVar('max_icon_' + sContainerID);
		else
			sMaxIcon = dnn.getVar('max_icon');

		sMaxFile = sMaxIcon.toLowerCase().substr(sMaxIcon.lastIndexOf('/'));

		var iNum = 5;
		if (oLnk.getAttribute('animf') != null)
			iNum = new Number(oLnk.getAttribute('animf'));
			
		if (sCurrentFile == sMaxFile)
		{
			oBtn.src = sMinIcon;				
			//oContent.style.display = '';
			dnn.dom.expandElement(oContent, iNum);
			oBtn.title = dnn.getVar('min_text');
			if (sCookieID != null)
			{
				if (dnn.getVar('__dnn_' + sContainerID + ':defminimized') == 'true')
					dnn.dom.setCookie(sCookieID, 'true', 365);
				else
					dnn.dom.deleteCookie(sCookieID);
			}
			else
				dnn.setVar('__dnn_' + sContainerID + '_Visible', 'true');
		}
		else
		{
			oBtn.src = sMaxIcon;				
			//oContent.style.display = 'none';
			dnn.dom.collapseElement(oContent, iNum);
			oBtn.title = dnn.getVar('max_text');
			if (sCookieID != null)
			{
				if (dnn.getVar('__dnn_' + sContainerID + ':defminimized') == 'true')
					dnn.dom.deleteCookie(sCookieID);
				else
					dnn.dom.setCookie(sCookieID, 'false', 365);				
			}
			else
				dnn.setVar('__dnn_' + sContainerID + '_Visible', 'false');			
		}
		
		return true;	//cancel postback
	}
	return false;	//failed so do postback
}

function __dnn_Help_OnClick(sHelpID)
{
	var oHelp = dnn.dom.getById(sHelpID);
	if (oHelp != null)
	{
		if (oHelp.style.display == 'none')
			oHelp.style.display = '';
		else
			oHelp.style.display = 'none';

		return true;	//cancel postback
	}
	return false;	//failed so do postback
}

function __dnn_SectionMaxMin(oBtn, sContentID)
{
	var oContent = dnn.dom.getById(sContentID);
	if (oContent != null)
	{
		var sMaxIcon = oBtn.getAttribute('max_icon');
		var sMinIcon = oBtn.getAttribute('min_icon');
		if (oContent.style.display == 'none')
		{
			oBtn.src = sMinIcon;				
			oContent.style.display = '';
			dnn.setVar(oBtn.id + ':exp', 1);
		}
		else
		{
			oBtn.src = sMaxIcon;				
			oContent.style.display = 'none';
			dnn.setVar(oBtn.id + ':exp', 0);
		}
		return true;	//cancel postback
	}
	return false;	//failed so do postback
}

//Drag N Drop
function __dnn_enableDragDrop()
{
	var aryConts = dnn.getVar('__dnn_dragDrop').split(";");	
	var aryTitles;

	for (var i=0; i < aryConts.length; i++)
	{
		aryTitles = aryConts[i].split(" ");
		if (aryTitles[0].length > 0)
		{			
			var oCtr = dnn.dom.getById(aryTitles[0]);
			var oTitle = dnn.dom.getById(aryTitles[1]);
			if (oCtr != null && oTitle != null)
			{
				oCtr.setAttribute('moduleid', aryTitles[2]);
				dnn.dom.positioning.enableDragAndDrop(oCtr, oTitle, '__dnn_dragComplete()', '__dnn_dragOver()');
			}	
		}
	}
}

var __dnn_oPrevSelPane;
var __dnn_oPrevSelModule;
var __dnn_dragEventCount=0;
function __dnn_dragOver()
{
	__dnn_dragEventCount++;
	if (__dnn_dragEventCount % 75 != 0)	//only calculate position every 75 events
		return;
	
	var oCont = dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);

	var oPane = __dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);
		
	if (__dnn_oPrevSelPane != null)	//reset previous pane's border
		__dnn_oPrevSelPane.pane.style.border = __dnn_oPrevSelPane.origBorder;

	if (oPane != null)
	{		
		__dnn_oPrevSelPane = oPane;
		oPane.pane.style.border = '4px double ' + DNN_HIGHLIGHT_COLOR;
		var iIndex = __dnn_getPaneControlIndex(oCont, oPane);

		var oPrevCtl;
		var oNextCtl;
		for (var i=0; i<oPane.controls.length; i++)
		{
			if (iIndex > i && oPane.controls[i].id != oCont.id)
				oPrevCtl = oPane.controls[i];
			if (iIndex <= i && oPane.controls[i].id != oCont.id)
			{
				oNextCtl = oPane.controls[i];
				break;
			}
		}			
		
		if (__dnn_oPrevSelModule != null)
			dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border = __dnn_oPrevSelModule.origBorder;
			

		if (oNextCtl != null)
		{
			__dnn_oPrevSelModule = oNextCtl;
			dnn.dom.getNonTextNode(oNextCtl.control).style.borderTop = '5px groove ' + DNN_HIGHLIGHT_COLOR;
		}
		else if (oPrevCtl != null)
		{
			__dnn_oPrevSelModule = oPrevCtl;
			dnn.dom.getNonTextNode(oPrevCtl.control).style.borderBottom = '5px groove ' + DNN_HIGHLIGHT_COLOR;
		}
	}
}

function __dnn_dragComplete()
{
	var oCtl = dnn.dom.getById(dnn.dom.positioning.dragCtr.contID);
	var sModuleID = oCtl.getAttribute('moduleid');
	
	if (__dnn_oPrevSelPane != null)
		__dnn_oPrevSelPane.pane.style.border = __dnn_oPrevSelPane.origBorder;

	if (__dnn_oPrevSelModule != null)
		dnn.dom.getNonTextNode(__dnn_oPrevSelModule.control).style.border = __dnn_oPrevSelModule.origBorder;
		
	var oPane = __dnn_getMostSelectedPane(dnn.dom.positioning.dragCtr);
	var iIndex;
	if (oPane == null)
	{
		var oPanes = __dnn_Panes();
		for (var i=0; i<oPanes.length; i++)
		{
			if (oPanes[i].id == oCtl.parentNode.id)
				oPane = oPanes[i];
		}
	}	
	if (oPane != null)
	{
		iIndex = __dnn_getPaneControlIndex(oCtl, oPane);
		__dnn_MoveToPane(oPane, oCtl, iIndex);

		dnn.callPostBack('MoveToPane', 'moduleid=' + sModuleID, 'pane=' + oPane.paneName, 'order=' + iIndex * 2); 
	}
}

function __dnn_MoveToPane(oPane, oCtl, iIndex)
{

	if (oPane != null)
	{
		var aryCtls = new Array();
		for (var i=iIndex; i<oPane.controls.length; i++)
		{
			if (oPane.controls[i].control.id != oCtl.id)
				aryCtls[aryCtls.length] = oPane.controls[i].control;

			dnn.dom.removeChild(oPane.controls[i].control);
		}
		dnn.dom.appendChild(oPane.pane, oCtl);
		oCtl.style.top=0;
		oCtl.style.left=0;
		oCtl.style.position = 'relative';
		for (var i=0; i<aryCtls.length; i++)
		{
			dnn.dom.appendChild(oPane.pane, aryCtls[i]);
		}
		__dnn_RefreshPanes();
	}
	else
	{
		oCtl.style.top=0;
		oCtl.style.left=0;
		oCtl.style.position = 'relative';
	}
}

function __dnn_RefreshPanes()
{
	var aryPanes = dnn.getVar('__dnn_Panes').split(';');
	var aryPaneNames = dnn.getVar('__dnn_PaneNames').split(';');
	__dnn_m_aryPanes = new Array();
	for (var i=0; i<aryPanes.length; i++)
	{
		if (aryPanes[i].length > 0)
			__dnn_m_aryPanes[__dnn_m_aryPanes.length] = new __dnn_Pane(dnn.dom.getById(aryPanes[i]), aryPaneNames[i]);
	}
}

var __dnn_m_aryPanes;
var __dnn_m_aryModules;
function __dnn_Panes()
{
	if (__dnn_m_aryPanes == null)
	{
		__dnn_m_aryPanes = new Array();
		__dnn_RefreshPanes();
	}
	return __dnn_m_aryPanes;
}

function __dnn_Modules(sModuleID)
{
	if (__dnn_m_aryModules == null)
		__dnn_RefreshPanes();
	
	return __dnn_m_aryModules[sModuleID];
}

function __dnn_getMostSelectedPane(oContent)
{
	var oCDims = new dnn.dom.positioning.dims(oContent);
	var iTopScore=0;
	var iScore;
	var oTopPane;
	for (var i=0; i<__dnn_Panes().length; i++)
	{
		var oPane = __dnn_Panes()[i];
		var oPDims = new dnn.dom.positioning.dims(oPane.pane);
		iScore = dnn.dom.positioning.elementOverlapScore(oPDims, oCDims);
		
		if (iScore > iTopScore)
		{
			iTopScore = iScore;
			oTopPane = oPane;
		}
	}
	return oTopPane;
}

function __dnn_getPaneControlIndex(oContent, oPane)
{
	if (oPane == null)
		return;
	var oCDims = new dnn.dom.positioning.dims(oContent);
	var oCtl;
	if (oPane.controls.length == 0)
		return 0;
	for (var i=0; i<oPane.controls.length; i++)
	{
		oCtl = oPane.controls[i];
		var oIDims = new dnn.dom.positioning.dims(oCtl.control);
		if (oCDims.t < oIDims.t)
			return oCtl.index;
	}
	if (oCtl != null)
		return oCtl.index+1;
	else
		return 0;
}

//Objects
function __dnn_Pane(ctl, sPaneName)
{
	this.pane = ctl;
	this.id = ctl.id;
	this.controls = new Array();
	this.origBorder = ctl.style.border;
	this.paneName = sPaneName;
	
	var iIndex = 0;
	var strModuleOrder='';
	for (var i=0; i<ctl.childNodes.length; i++)
	{
		var oNode = ctl.childNodes[i];
		if (dnn.dom.isNonTextNode(oNode))	
		{
			if (__dnn_m_aryModules == null)
				__dnn_m_aryModules = new Array();

			//if (oNode.tagName == 'A' && oNode.childNodes.length > 0)
			//	oNode = oNode.childNodes[0];	//DNN now embeds anchor tag 
				
			var sModuleID = oNode.getAttribute('moduleid');
			if (sModuleID != null && sModuleID.length > 0)
			{
				strModuleOrder += sModuleID + '~';
				this.controls[this.controls.length] = new __dnn_PaneControl(oNode, iIndex);
				__dnn_m_aryModules[sModuleID] = oNode.id;
				iIndex+=1;
			}
		}
	}
	this.moduleOrder = strModuleOrder;

}

function __dnn_PaneControl(ctl, iIndex)
{
	this.control = ctl;
	this.id = ctl.id;
	this.index = iIndex;
	this.origBorder = ctl.style.border;
	
}
if(!document.all && !window.opera && window.HTMLElement){
    HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){
        switch(where){
            case "beforeBegin":
                this.parentNode.insertBefore(parsedNode,this);
                break;
            case "afterBegin":
                this.insertBefore(parsedNode,this.firstChild);
                break;
            case "beforeEnd":                
				this.appendChild(parsedNode);
                break;
            case "afterEnd":
                if(this.nextSibling)
                    this.parentNode.insertBefore(parsedNode,this.nextSibling);
                else
                    this.parentNode.appendChild(parsedNode);
                break;
            }
        }
    HTMLElement.prototype.insertAdjacentHTML=function(where,htmlStr){
        var r=this.ownerDocument.createRange();
        r.setStartBefore(this);
        var parsedHTML=r.createContextualFragment(htmlStr);
        this.insertAdjacentElement(where,parsedHTML);
        }
    HTMLElement.prototype.insertAdjacentText=function(where,txtStr){
        var parsedText=document.createTextNode(txtStr);
        this.insertAdjacentElement(where,parsedText);
        }

	HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){
        var r=this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df=r.createContextualFragment(sHTML);
        this.parentNode.replaceChild(df,this);
        return sHTML;
        });
	HTMLElement.prototype.__defineGetter__("outerHTML",function(){
		var attr;
		var attrs=this.attributes;
		var str="<"+this.tagName.toLowerCase();
		for(var i=0;i<attrs.length;i++){
			attr=attrs[i];
			if(attr.specified)
				str+=" "+attr.name+'="'+attr.value+'"';
			}
		if(!this.canHaveChildren)
			return str+">";
		return str+">"+this.innerHTML+"</"+this.tagName.toLowerCase()+">";
		});		   
	 HTMLElement.prototype.__defineGetter__("canHaveChildren",function(){
	  switch(this.tagName.toLowerCase()){
				case "area":
				case "base":
			    case "basefont":
				case "col":
				case "frame":
				case "hr":
				case "img":
				case "br":
				case "input":
				case "isindex":
				case "link":
				case "meta":
				case "param":
				return false;
			}
			return true;
		 });
}

var $dnn = (typeof($dnn) === "undefined" ? new Object() : $dnn);
$dnn.pageScripts = document.getElementsByTagName("script");
$dnn.scriptUrl = $dnn.pageScripts[$dnn.pageScripts.length - 1].src;
$dnn.hostUrl = (typeof($dnn.hostUrl) == "undefined" ? $dnn.scriptUrl.toLowerCase().replace("js/dnncore.js","") : $dnn.hostUrl);
//if (!$dnn.hostUrl.endsWith("/")) $dnn.hostUrl += "/";
$dnn.baseDnnScriptUrl = $dnn.hostUrl + "Resources/Shared/scripts/";
$dnn.baseResourcesUrl = $dnn.hostUrl + "Resources/";
$dnn.baseDnnScriptLibraryUrl = $dnn.hostUrl + "js/";
$dnn.codeCounter=0;
$dnn.codebase={};
$dnn.classLoaded = {};
$dnn.XMLHttpRequest = function()
{
	if(window.ActiveXObject && !window.XMLHttpRequest)
	{    
		var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
		var o;
		for (var i = 0; i < prefixes.length; i++) 
		{
			try 
			{
				o = new ActiveXObject(prefixes[i] + ".XmlHttp");
				return o;
			}
			catch (ex) {};
		}
		//throw new Error("Could not find an installed XML parser or Your browser does not support XmlHttp objects");
	}
	else
	{
		return new window.XMLHttpRequest();
	}
};
$dnn.supportsXmlHttp=function()
{
    return typeof($dnn.xmlHttp||($dnn.xmlHttp=new $dnn.XMLHttpRequest()))=="object";
};
$dnn.eval = function(src)
{
    try
    {

        if(window.execScript)
        {
            window.execScript($dnn.codebase[src]); 
        }
        else        
        {
            var script=document.createElement("SCRIPT"); 
            script.type="text/javascript";
            script.innerHTML="eval($dnn.codebase['"+ src +"']);";
            var id = script.id = "dnncode"+$dnn.codeCounter++;
            document.getElementsByTagName("HEAD")[0].appendChild(script);
            setTimeout("var t=document.getElementById('"+id+"');t.parentNode.removeChild(t)",1);
        }
    }
    catch(ex)
    {
        window.alert(ex);
    }
	$dnn.classLoaded[src] = true;
};
$dnn.scriptFileLoaded = function(src)
{
	if(typeof $dnn.classLoaded[src] != "undefined")
    {
		return true;
	}
	for (var s = 0; s < $dnn.pageScripts.length; s++) 
	{
		if ($dnn.pageScripts[s].src != null && $dnn.pageScripts[s].src.indexOf(src) > -1)
		{			
			return true;
		}
	}
	return false;
};
$dnn.loadScript = function(src)
{
    var ex;
    try
    {
        if($dnn.supportsXmlHttp())
        {
            $dnn.xmlHttp.open("GET",src,false);
            $dnn.xmlHttp.send(null);
            if ($dnn.xmlHttp.readyState==4)
            {
                var jscode = $dnn.xmlHttp.responseText;
                if (jscode==null || jscode.charAt(0)=="\uFFFD")
                {
                    window.alert("Maybe encoding of "+src+" file isn't ANSI or UTF-8!");return "";
                }
                if (jscode.charAt(0)=="\xef")
                {
                    jscode=jscode.substr(3); //for firefox
                }
                return jscode.replace(/(^|\n)\/\/+\s*((Using\(|Import\(|Include\()(\"|\')System\.)/g,"$1$2");
            }
        } 
        else
        {
            window.alert("Your browser doesn't support XMLHttp!");
        }
    }
    catch(ex)
    {
        window.alert("Error!\nMaybe "+src+" is inexistent!");return "";
    }
};
$dnn.Include = function(src)
{
	src = src.replace(/\\/g, "/");
    if($dnn.scriptFileLoaded(src))
    {
        return;
    }
    var code;
    if($dnn.supportsXmlHttp())
    {
        if(code=$dnn.loadScript(src))
        {
			$dnn.codebase[src]=code;
            $dnn.eval(src);
        }
    }
    else
    {
        var script=document.createElement("SCRIPT");
        script.type="text/javascript"; 
        script.language="javascript";
        script.src=src;
        var id=script.id="dnncode"+$dnn.codeCounter++;
        document.getElementsByTagName("HEAD")[0].appendChild(script);
        var oscript = document.getElementById(id);
		$dnn.pageScripts[$dnn.pageScripts.length] = oscript;
    }
};
