SlidingPanels=function(element)
{SlidingPanels.loadQueue=[];SlidingPanels.onloadDidFire=false;SlidingPanels.processLoadQueue=function(handler)
{SlidingPanels.onloadDidFire=true;var q=SlidingPanels.loadQueue;var qlen=q.length;for(var i=0;i<qlen;i++)
q[i].attachBehaviors();};this.element=this.getElement(element);this.enableAnimation=true;this.currentPanel=null;this.enableKeyboardNavigation=true;this.hasFocus=false;this.currentPanelClass="SlidingPanelsCurrentPanel";this.focusedClass="SlidingPanelsFocused";this.animatingClass="SlidingPanelsAnimating";if(this.element)
this.element.style.overflow="hidden";if(this.defaultPanel)
{if(typeof this.defaultPanel=="number")
this.currentPanel=this.getContentPanels()[this.defaultPanel];else
this.currentPanel=this.getElement(this.defaultPanel);}
if(!this.currentPanel)
this.currentPanel=this.getContentPanels()[0];if(SlidingPanels.onloadDidFire)
this.attachBehaviors();else
SlidingPanels.loadQueue.push(this);this.addLoadListener(SlidingPanels.processLoadQueue);};SlidingPanels.prototype={onFocus:function(e)
{this.hasFocus=true;this.addClassName(this.element,this.focusedClass);return false;},onBlur:function(e)
{this.hasFocus=false;this.removeClassName(this.element,this.focusedClass);return false;},attachBehaviors:function()
{var ele=this.element;if(!ele)
return;if(this.enableKeyboardNavigation)
{var focusEle=null;var tabIndexAttr=ele.attributes.getNamedItem("tabindex");if(tabIndexAttr||ele.nodeName.toLowerCase()=="a")
focusEle=ele;if(focusEle)
{var self=this;this.addEventListener(focusEle,"focus",function(e){return self.onFocus(e||window.event);},false);this.addEventListener(focusEle,"blur",function(e){return self.onBlur(e||window.event);},false);}}
if(this.currentPanel)
{var ea=this.enableAnimation;this.enableAnimation=false;this.showPanel(this.currentPanel);this.enableAnimation=ea;}},getElement:function(ele)
{if(ele&&typeof ele=="string")
return document.getElementById(ele);return ele;},addClassName:function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.search(new RegExp("\\b"+className+"\\b"))!=-1))
return;ele.className+=(ele.className?" ":"")+className;},removeClassName:function(ele,className)
{if(!ele||!className||(ele.className&&ele.className.search(new RegExp("\\b"+className+"\\b"))==-1))
return;ele.className=ele.className.replace(new RegExp("\\s*\\b"+className+"\\b","g"),"");},getElementChildren:function(element)
{var children=[];var child=element.firstChild;while(child)
{if(child.nodeType==1)
children.push(child);child=child.nextSibling;}
return children;},getCurrentPanel:function()
{return this.currentPanel;},getContentGroup:function()
{return this.getElementChildren(this.element)[0];},getContentPanels:function()
{return this.getElementChildren(this.getContentGroup());},getContentPanelsCount:function()
{return this.getContentPanels().length;},addLoadListener:function(handler)
{if(typeof window.addEventListener!='undefined')
window.addEventListener('load',handler,false);else if(typeof document.addEventListener!='undefined')
document.addEventListener('load',handler,false);else if(typeof window.attachEvent!='undefined')
window.attachEvent('onload',handler);},addEventListener:function(element,eventType,handler,capture)
{try
{if(element.addEventListener)
element.addEventListener(eventType,handler,capture);else if(element.attachEvent)
element.attachEvent("on"+eventType,handler);}
catch(e){}},getContentPanelIndex:function(ele)
{if(ele)
{ele=this.getElement(ele);var panels=this.getContentPanels();var numPanels=panels.length;for(var i=0;i<numPanels;i++)
{if(panels[i]==ele)
return i;}}
return-1;},showPanel:function(elementOrIndex)
{var pIndex=-1;if(typeof elementOrIndex=="number")
pIndex=elementOrIndex;else
pIndex=this.getContentPanelIndex(elementOrIndex);var numPanels=this.getContentPanelsCount();if(numPanels>0)
pIndex=(pIndex>=numPanels)?numPanels-1:pIndex;else
pIndex=0;var panel=this.getContentPanels()[pIndex];var contentGroup=this.getContentGroup();if(panel&&contentGroup)
{if(this.currentPanel)
this.removeClassName(this.currentPanel,this.currentPanelClass);this.currentPanel=panel;var nx=-panel.offsetLeft;var ny=-panel.offsetTop;if(this.enableAnimation)
{if(this.animator)
this.animator.stop();var cx=contentGroup.offsetLeft;var cy=contentGroup.offsetTop;if(cx!=nx||cy!=ny)
{var self=this;this.addClassName(this.element,this.animatingClass);this.animator=new SlidingPanels.PanelAnimator(contentGroup,cx,cy,nx,ny,{duration:this.duration,fps:this.fps,transition:this.transition,finish:function()
{self.removeClassName(self.element,self.animatingClass);self.addClassName(panel,self.currentPanelClass);}});this.animator.start();}}
else
{contentGroup.style.left=nx+"px";contentGroup.style.top=ny+"px";this.addClassName(panel,this.currentPanelClass);}}
return panel;},showFirstPanel:function()
{return this.showPanel(0);},showLastPanel:function()
{return this.showPanel(this.getContentPanels().length-0);},showPreviousPanel:function(num)
{clearTimeout(this.timeOut);var num=(num==undefined)?0:num;var prev=this.getContentPanelIndex(this.currentPanel)-num;return this.showPanel(prev>0?prev:0);},showNextPanel:function(num)
{clearTimeout(this.timeOut);var num=(num==undefined)?0:num;var next=this.getContentPanelIndex(this.currentPanel)+num;if(next<this.getContentPanels().length-0){return this.showPanel(next);}
else{return this.showPanel(0);}},timeOut:0,showNextPanelWithTimeOut:function(num,time)
{var self=this;var func=function(){self.showNextPanelWithTimeOut(1,time);};var numPanels=this.getContentPanelsCount();var cur=this.getContentPanelIndex(this.currentPanel);if(cur<numPanels-0){this.showNextPanel(1);}
else{this.showPanel(0);}
this.timeOut=setTimeout(func,time);}};SlidingPanels.PanelAnimator=function(ele,curX,curY,dstX,dstY,opts)
{this.element=ele;this.curX=curX;this.curY=curY;this.dstX=dstX;this.dstY=dstY;this.fps=60;this.duration=500;this.startTime=0;this.timerID=0;this.finish=null;this.transition=this.defaultTransition;var self=this;this.intervalFunc=function(){self.step();};this.interval=1000/this.fps;};SlidingPanels.PanelAnimator.prototype={element:null,curX:null,curY:null,dstX:null,dstY:null,fps:60,duration:500,startTime:0,timerID:0,finish:null,intervalFunc:function(){this.step();},interval:0,defaultTransition:function(time,begin,finish,duration){time/=duration;return begin+((2-time)*time*finish);},start:function()
{this.stop();this.startTime=(new Date()).getTime();this.timerID=setTimeout(this.intervalFunc,this.interval);},transition:null,stop:function()
{if(this.timerID)
clearTimeout(this.timerID);this.timerID=0;},step:function()
{var elapsedTime=(new Date()).getTime()-this.startTime;var done=elapsedTime>=this.duration;var x,y;if(done)
{x=this.curX=this.dstX;y=this.curY=this.dstY;}
else
{x=this.transition(elapsedTime,this.curX,this.dstX-this.curX,this.duration);y=this.transition(elapsedTime,this.curY,this.dstY-this.curY,this.duration);}
this.element.style.left=x+"px";this.element.style.top=y+"px";if(!done)
this.timerID=setTimeout(this.intervalFunc,this.interval);else if(this.finish)
this.finish();}};