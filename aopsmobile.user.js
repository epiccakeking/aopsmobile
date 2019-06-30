// ==UserScript==
// @name         AoPS Mobile
// @namespace    http://tampermonkey.net/
// @version      0.9.1
// @description  Unofficial script for AoPS.
// @author       happycupcake
// @match        https://artofproblemsolving.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var elmntctheme=document.createElement('style');
    elmntctheme.id="ctheme";
    elmntctheme.innerHTML=`/*Header*/
.menu-login-wrapper{
display: block !important;
position: absolute;
right: 0px !important;
top: 2px !important;
z-index: 25;
}
.menu-login-wrapper > *{
color: black !important;
}
#breadcrumbs-wrapper{
height: 30px;
padding-left: 30px;
}
#header-wrapper{
min-height: 30px !important;
height: auto;
background: #009fad;
position: relative;
}
.menubar-labels{
position: relative !important;
z-index: 20;
top: 30px;
}
.menubar-hamburger{
position: absolute;
left: 0px !important;
top: -3px !important;
z-index: 10;
}
.menubar-label-link.selected{
color: white !important;
}
/*Posting buttons*/
.cmty-bbcode-buttons{
  display: contents;
}
.cmty-posting-button-row{
  height: initial !important;
}
.cmty-posting-environ{
  background: #333 !important;
}
/*Modals*/
.aops-modal-frame{
  width: 70vw !important;
  height: 60vh !important;
  top: 20pvh !important;
  left: 15vw !important;
  max-height: none !important;
  display: inline !important;
}
@media (max-width: 700px){
  .aops-modal-frame{
  width: 90vw !important;
  left: 5vw !important;
}
}
/*Feed*/
.feed-open #feed-topic-list, #feed-topic  {
border:  0px !important;
width:  auto !important;
min-width:  none !important;
position:  fixed;
top:  30px !important;
bottom:  0px !important;
left:  0px !important;
right:  0px !important;
height:  auto !important;
box-shadow:  none !important;
background:  white !important;
}
.feed-open #feed-topic  {
bottom:  20px !important;
}
.feed-open #feed-tabs  {
display:  flex;
height:  30px;
line-height:  30px !important;
width:  100vw !important;
position:  fixed !important;
top:  0px !important;
left:  0px !important;
bottom:  auto !important;
right:  auto !important;
z-index:  10000000000000000000 !important;
padding:  0px !important;
}
.feed-open .feed-tab  {
height:  30px !important;
padding:  0px !important;
line-height:  30px !important;
height:  30px !important;
width:  25vw !important;
border:  none !important;
display:  inline-block !important;
left:  0px;
}
.feed-open #feed-wrapper  {
top:  0px !important;
bottom:  0px !important;
left:  0px !important;
overflow:  hidden !important;
width:  100vw !important;
height:  auto !important;
display:  block !important;
}
#feed-wrapper  {
display:  block !important;
z-index:  10000000000000000000 !important;
}
.feed-open .focus-topic .cmty-topic-watchers  {
display:  block !important;
position:  fixed !important;
z-index:  10 !important;
top:  auto !important;
bottom:  0px !important;
left:  0px !important;
width:  100vw !important;
height:  20px !important;
padding-top:  2px !important;
background-color:  #666 !important;
}
.feed-open .focus-topic .cmty-topic-watchers:before  {
content:  "Reading now: " !important;
color:  white !important;
font-weight:  bold !important;
font-style:  normal !important;
}
.feed-open .cmty-postbox-inner-box  {
width:  100% !important;
padding-right:  15px !important;
}
.feed-open .cmty-post-body  {
width:  100% !important;
}
.feed-open .feed-topic-top-right > *  {
display:  inline;
}
.feed-open .feed-close, .cmty-full-screen  {
display:  none;
}
.feed-subfeed-new-topic  {
display:  block !important;
}
.feed-open .cmty-topic-jump  {
position:  fixed;
font-size:  24px;
z-index:  100000;
top:  68px !important;
height:  24px !important;
width:  24px !important;
line-height:  24px !important;
text-align:  center !important;
left:  auto !important;
right:  35px !important;
color:  white;
}
.feed-open .cmty-topic-jump-bottom  {
right:  5px !important;
}
.feed-open .cmty-subfeed  {
background:  white;
}
.feed-open .feed-open .aops-scroll-content  {
width:  100% !important;
padding:  0px !important;
}
.feed-open .cmty-posting-button-row.cmty-phone  {
display:  none !important;
}
.feed-open .aops-modal-frame  {
max-width:  none !important;
max-height:  none !important;
width:  auto !important;
height:  auto !important;
margin:  0px !important;
top:  30px !important;
left:  0px !important;
right:  0px !important;
bottom:  0px !important;
display:  block !important;
}
.feed-open .aops-close-x  {
top:  0px !important;
right:  0px !important;
}
.feed-open .cmty-topic-posts-top  {
padding-right:  60px !important;
}
.feed-open .aops-scroll-fade-bottom, .aops-scroll-fade-top  {
width:  100% !important;
left:  0px !important;
}
.aops-modal-wrapper  {
z-index:  10000000000000 !important;
}
`;
    $("head")[0].appendChild(elmntctheme);
    $(".header-underlay")[0].appendChild($(".menubar-hamburger")[0]); //I have no idea how this works.
    $(".menubar-labels").insertBefore($("#breadcrumbs-wrapper")[0])
    $("#header-wrapper")[0].appendChild($(".menu-login-wrapper")[0]);
    $("#header").remove()
    document.getElementsByTagName("html")[0].dispatchEvent(new Event('resize', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
    //Deactivate report removal
    var targetNode = document.body;

    var config = {childList: true, subtree: true };

    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            $(".cmty-post-report").removeClass("cmty-no-tablet")
        }
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
})();
