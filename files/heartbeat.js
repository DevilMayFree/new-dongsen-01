(function(g){var window=this;'use strict';var Fkb=function(a,b){if(!Number.isFinite(a))return String(a);a=String(a);var c=a.indexOf(".");c===-1&&(c=a.length);var d=a[0]==="-"?"-":"";d&&(a=a.substring(1));return d+(0,g.uab)("0",Math.max(0,b-c))+a},Gkb=function(){return{I:"svg",
X:{fill:"#fff",height:"24px",viewBox:"0 0 24 24",width:"24px"},V:[{I:"path",X:{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"}}]}},Hkb=function(){return{I:"svg",
X:{fill:"#fff",height:"24px",viewBox:"0 0 24 24",width:"24px"},V:[{I:"path",X:{d:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"}}]}},Jkb=function(a){typeof a==="number"?(this.date=Ikb(a,0,1),A5(this,1)):g.Sa(a)?(this.date=Ikb(a.getFullYear(),a.getMonth(),a.getDate()),A5(this,a.getDate())):(this.date=new Date(g.Ya()),a=this.date.getDate(),
this.date.setHours(0),this.date.setMinutes(0),this.date.setSeconds(0),this.date.setMilliseconds(0),A5(this,a))},Ikb=function(a,b,c){b=new Date(a,b,c);
a>=0&&a<100&&b.setFullYear(b.getFullYear()-1900);return b},A5=function(a,b){a.getDate()!=b&&a.date.setUTCHours(a.date.getUTCHours()+(a.getDate()<b?1:-1))},B5=function(a,b){g.XS.call(this,a,{I:"div",
S:"ytp-reminder-menu",X:{role:"menu",tabindex:"-1"},V:[{I:"div",S:"ytp-reminder-menu-contents",V:[{I:"div",S:"ytp-reminder-menu-items"}]}]},100,!0);this.j=b;this.C=[];this.menuPopupRenderer=void 0;this.items=this.Da("ytp-reminder-menu-items");this.hide()},Kkb=function(a){return(a.menuPopupRenderer&&a.menuPopupRenderer.items||[]).reduce(function(b,c){c&&c.menuServiceItemRenderer&&b.push(c.menuServiceItemRenderer);
return b},[])},C5=function(a){g.S.call(this,{I:"div",
V:[{I:"button",Ka:["ytp-offline-slate-button","ytp-button"],V:[{I:"div",S:"ytp-offline-slate-button-icon",va:"{{icon}}"},{I:"div",S:"ytp-offline-slate-button-text",va:"{{text}}"}]}]});this.J=a;this.upcomingEventReminderButtonRenderer=this.toggleButtonRenderer=null;this.B=void 0;this.D=this.j=null;(this.G=this.Da("ytp-offline-slate-button"))&&this.T(this.G,"click",this.K);this.hide()},Mkb=function(a,b,c){!a.toggleButtonRenderer&&b&&b.toggleButtonRenderer?a.toggleButtonRenderer=b.toggleButtonRenderer:
b&&b.toggleButtonRenderer||(a.toggleButtonRenderer=null);
!a.upcomingEventReminderButtonRenderer&&c&&g.Q(c,Lkb)?a.upcomingEventReminderButtonRenderer=g.Q(c,Lkb):c&&g.Q(c,Lkb)||(a.upcomingEventReminderButtonRenderer=null);D5(a)},D5=function(a){if(a.toggleButtonRenderer){var b=a.toggleButtonRenderer;
if(b.isToggled){var c=b.toggledText?g.Px(b.toggledText):"";a.update({text:c,icon:Nkb(b.toggledIcon)})}else c=b.defaultText?g.Px(b.defaultText):"",a.update({text:c,icon:Nkb(b.defaultIcon)});a.show()}else a.upcomingEventReminderButtonRenderer?(b=Okb(a))?(c=b.text?g.Px(b.text):"",a.update({text:c,icon:Nkb(b.icon)}),a.show()):a.hide():a.hide()},Qkb=function(a,b,c){a.D||(a.D=new g.Av(a.J.U().fl));
var d={context:g.Qu(a.D.config_||g.Pu())};g.Ww()&&(d.context.clientScreenNonce=g.Ww());d.params=c;g.Bv(a.D,b,d,{timeout:5E3,onSuccess:function(){a.upcomingEventReminderButtonRenderer&&a.B&&(a.upcomingEventReminderButtonRenderer.currentState=a.B,a.B=void 0)},
onError:function(){Pkb(a)},
onTimeout:function(){Pkb(a)}})},Pkb=function(a){a.toggleButtonRenderer?(a.toggleButtonRenderer.isToggled=!a.toggleButtonRenderer.isToggled,D5(a)):a.upcomingEventReminderButtonRenderer&&(a.B=void 0,D5(a))},Nkb=function(a){if(!a)return null;
switch(a.iconType){case "NOTIFICATIONS":return Gkb();case "NOTIFICATIONS_NONE":return Hkb();case "NOTIFICATIONS_ACTIVE":return g.Xx();default:return null}},Okb=function(a){if(!a.upcomingEventReminderButtonRenderer)return null;
var b=a.B||a.upcomingEventReminderButtonRenderer.currentState;a=g.w(a.upcomingEventReminderButtonRenderer.states||[]);for(var c=a.next();!c.done;c=a.next())if((c=g.Q(c.value,Rkb))&&c.state===b&&c.button&&g.Q(c.button,g.UJ))return g.Q(c.button,g.UJ);return null},Skb=function(a){g.S.call(this,{I:"div",
S:"ytp-offline-slate",V:[{I:"div",S:"ytp-offline-slate-background"},{I:"div",S:"ytp-offline-slate-bar",V:[{I:"span",S:"ytp-offline-slate-icon",V:[{I:"svg",X:{fill:"#fff",height:"100%",viewBox:"0 0 24 24",width:"100%"},V:[{I:"path",X:{d:"M16.94 6.91l-1.41 1.45c.9.94 1.46 2.22 1.46 3.64s-.56 2.71-1.46 3.64l1.41 1.45c1.27-1.31 2.05-3.11 2.05-5.09s-.78-3.79-2.05-5.09zM19.77 4l-1.41 1.45C19.98 7.13 21 9.44 21 12.01c0 2.57-1.01 4.88-2.64 6.54l1.4 1.45c2.01-2.04 3.24-4.87 3.24-7.99 0-3.13-1.23-5.96-3.23-8.01zM7.06 6.91c-1.27 1.3-2.05 3.1-2.05 5.09s.78 3.79 2.05 5.09l1.41-1.45c-.9-.94-1.46-2.22-1.46-3.64s.56-2.71 1.46-3.64L7.06 6.91zM5.64 5.45L4.24 4C2.23 6.04 1 8.87 1 11.99c0 3.13 1.23 5.96 3.23 8.01l1.41-1.45C4.02 16.87 3 14.56 3 11.99s1.01-4.88 2.64-6.54z"}},
{I:"circle",X:{cx:"12",cy:"12",r:"3"}}]}]},{I:"span",S:"ytp-offline-slate-messages",V:[{I:"div",S:"ytp-offline-slate-main-text",X:{"aria-label":"{{label}}"},va:"{{mainText}}"},{I:"div",S:"ytp-offline-slate-subtitle-text",va:"{{subtitleText}}"}]},{I:"span",S:"ytp-offline-slate-buttons"}]},{I:"button",Ka:["ytp-offline-slate-close-button","ytp-button"],V:[g.Tx()]},{I:"button",Ka:["ytp-offline-slate-open-button","ytp-button"],V:[g.Sx()]}]});var b=this;this.api=a;this.j=this.B=null;this.background=this.Da("ytp-offline-slate-background");
this.C=this.Da("ytp-offline-slate-bar");this.G=new g.sp(function(){g.Ap(b.C,"ytp-offline-slate-bar-fade")},15E3);
this.K=!1;this.D=new g.sp(function(){g.Ap(b.element,"ytp-offline-slate-collapsed")},15E3);
g.P(this,this.D);g.P(this,this.G);this.countdownTimer=new g.sp(this.P3,1E3,this);this.T(a,"presentingplayerstatechange",this.U3);this.T(a,"livestatedata",this.Ra);a=this.Da("ytp-offline-slate-close-button");this.T(a,"click",function(){g.Ap(b.element,"ytp-offline-slate-collapsed")});
a=this.Da("ytp-offline-slate-open-button");this.T(a,"click",function(){g.Cp(b.element,"ytp-offline-slate-collapsed")});
this.hide();a=this.getVideoData();a.getPlayerResponse()&&(a=a.getPlayerResponse().playabilityStatus)&&this.Ra(a);a=this.api.getPresentingPlayerType()===8&&!this.getVideoData().Gm;var c=this.api.getPresentingPlayerType()===8;g.Ep(this.element,"ytp-offline-slate-premiere-trailer",a);g.Ep(this.element,"ytp-offline-slate-hide-background",c)},Tkb=function(a,b,c){if(b){var d=b.subtitleText!=null?g.Px(b.subtitleText):"";
c=c?c:b.mainText!=null?g.Px(b.mainText):"";var e,f,h,l;b=(l=(e=b.mainText)==null?void 0:(f=e.accessibility)==null?void 0:(h=f.accessibilityData)==null?void 0:h.label)!=null?l:c;a.update({mainText:c,subtitleText:d,label:b});g.Ep(a.element,"ytp-offline-slate-single-text-line",!d);g.Ep(a.C,"ytp-offline-slate-bar-hidden",!c&&!d)}},E5=function(a,b){var c=(0,g.Wt)();
this.module="heartbeat";this.trigger=a;this.j=b;this.C=c},Zkb=function(a){g.gY.call(this,a);
var b=this;this.N=!1;this.Z=0;this.G=!1;this.B=new g.sp(function(){Ukb(b)},0);
this.j=this.heartbeatParams=null;this.D=!1;this.K=new g.oh(1E3,6E4,1);this.sequenceNumber=0;this.offlineSlate=null;this.oa=new g.Av(void 0);this.attestationResponse=Promise.resolve(void 0);this.W=Promise.resolve(void 0);this.utcOffsetMinutes=-(new Jkb).getTimezoneOffset();this.C=new g.aG(this);g.P(this,this.B);g.P(this,this.C);Vkb(this);Wkb(this);this.C.T(a,"heartbeatparams",this.bH);this.C.T(a,"presentingplayerstatechange",this.r5);this.C.T(a,"videoplayerreset",this.s5);this.C.T(a,g.DE("heartbeat"),
this.onCueRangeEnter);this.D&&this.j&&Xkb(this,void 0,this.j);var c=new g.BE(1E3,0x7ffffffffffff,{priority:1,namespace:"heartbeat"}),d=new g.BE(0x8000000000000,0x8000000000000,{id:"stream_end",priority:1,namespace:"heartbeat"});a.qf([c,d]);Ykb(this)},Ykb=function(a){var b=a.getVideoData();
!b.L("use_rta_only_for_player")&&b.lk&&(b=b.botguardData)&&g.CL(b,a.player.U())},$kb=function(a){var b,c;
return g.J(function(d){if(d.j==1)return g.F(d,g.Mua(),2);if(!d.B)return a.sequenceNumber>=3?d.return({error:"ATTESTATION_ERROR_VM_INTERNAL_ERROR"}):d.return(void 0);b=a.getVideoData();c={};return d.return(g.Lua((c.cpn=b.clientPlaybackNonce,c.encryptedVideoId=b.videoId||"",c),1500))})},Vkb=function(a){var b=a.getVideoData();
if(b.lk)if(b.L("use_rta_for_player_hb"))a.attestationResponse=$kb(a);else if(b=new g.AL(b),g.wL.isInitialized()||a.sequenceNumber>=3){var c=Promise,d=c.resolve,e=null;if(b.videoData.Kr){var f=g.BL(b);if(f){e={};var h={};f=f.split("&");f=g.w(f);for(var l=f.next();!l.done;l=f.next())l=l.value.split("="),l.length===2&&(h[l[0]]=l[1]);h.r1a&&(e.webResponse=h.r1a);h.r1c&&(e.error=alb[Number(h.r1c)]);e.challenge=b.videoData.Kr}}a.attestationResponse=d.call(c,e||void 0)}},blb=function(a){var b=a.getVideoData();
if(!g.qR(a.getVideoData())||b.jV)return!1;if(b.useInnertubeDrmService()&&b.G){a=b.G.flavor==="playready"&&b.L("html5_innertube_heartbeats_for_playready");var c=b.G.flavor==="widevine"&&b.L("html5_innertube_heartbeats_for_widevine");b=g.zO(b.G)&&b.L("html5_innertube_heartbeats_for_fairplay");return!(a||c||b)}return!0},clb=function(a){if(blb(a))return!!a.heartbeatParams;
var b=a.getVideoData();return g.qR(a.getVideoData())&&b.useInnertubeDrmService()&&!b.ll&&!b.AE?!1:!!b.heartbeatToken},F5=function(a,b){if(!a.B.isActive()&&a.N){var c=a.getVideoData();
if(clb(a)||c.isLivePlayback){if(b===void 0)if(a.G)if(a.D)b=7500;else{var d;b=((d=a.heartbeatParams)==null?0:d.interval)?a.heartbeatParams.interval*1E3:a.getVideoData().fV||6E4}else b=1E3;a.B.start(b)}}},glb=function(a,b,c){b.Sn&&(c=g.Vi(c,{internalipoverride:b.Sn}));
var d={cpn:b.clientPlaybackNonce};b.contextParams&&(d.context_params=b.contextParams);b.kb&&(d.kpt=b.kb);c=g.Vi(c,d);g.Sr(c,{format:"RAW",method:"GET",timeout:3E4,onSuccess:function(e){if(!a.B.isActive()&&G5(a)){a.K.reset();a.sequenceNumber++;e=e.responseText;var f=dlb(e);if(f){a.player.eb("onHeartbeat",f);var h=f.status==="ok"?f.stop_heartbeat?2:0:f.status==="stop"?1:f.status==="live_stream_offline"?0:-1}else h=(h=e.match(elb))?h[1]==="0"?0:1:-1;flb(a,void 0,f,e,h)}},
onError:function(e){G5(a)&&H5(a,!0,"net-"+e.status)},
onTimeout:function(){G5(a)&&H5(a,!0,"timeout")},
withCredentials:!0})},Ukb=function(a){var b,c;
g.J(function(d){b=a.player.U();c=a.getVideoData();if(!G5(a))return d.return();if(blb(a))return hlb(a,b,c),d.Ea(0);Vkb(a);return g.F(d,ilb(a,b,c),0)})},hlb=function(a,b,c){var d;
if((d=a.heartbeatParams)!=null&&d.url){var e=g.Vi(a.heartbeatParams.url,{request_id:g.Uqa()});c.qa&&(e=g.Vi(e,{vvt:c.qa}),c.mdxEnvironment&&(e=g.Vi(e,{mdx_environment:c.mdxEnvironment})));g.ZP(b,c.oauthToken).then(function(f){f&&(e=g.Vi(e,{access_token:f}));glb(a,c,e)})}},G5=function(a){var b=a.getVideoData();
return a.player.getPresentingPlayerType()===3||g.U(a.player.getPlayerStateObject(a.getPlayerType()),4)?!1:clb(a)||b.isLivePlayback?!0:(I5(a),!1)},ilb=function(a,b,c){var d,e,f,h,l,m,n,p,q,r,t,u,y,A,C,G,H,M,N,X;
return g.J(function(V){if(V.j==1)return d="player/heartbeat",f={videoId:c.videoId,sequenceNumber:a.sequenceNumber,heartbeatServerData:(e=a.qa)!=null?e:c.heartbeatServerData},a.W=a.attestationResponse,c.lk?g.F(V,a.W,3):V.Ea(2);V.j!=2&&(f.attestationResponse=V.B);h=g.TR(c);m=(l=h.client)!=null?l:{};m.utcOffsetMinutes=a.utcOffsetMinutes;f.context=h;f.cpn=c.clientPlaybackNonce;if(n=typeof Intl!=="undefined"?(new Intl.DateTimeFormat).resolvedOptions().timeZone:null)m.timeZone=n;p={heartbeatChecks:[]};
if(q=c.getPlayerResponse())c.heartbeatToken&&(f.heartbeatToken=c.heartbeatToken),(r=q.playabilityStatus)&&(t=r.liveStreamability)&&t.liveStreamabilityRenderer&&p.heartbeatChecks.push("HEARTBEAT_CHECK_TYPE_LIVE_STREAM_STATUS");c.heartbeatToken&&p.heartbeatChecks.push("HEARTBEAT_CHECK_TYPE_YPC");g.XD(b)&&(p.heartbeatChecks.push("HEARTBEAT_CHECK_TYPE_UNPLUGGED"),u=jlb(a),y={},u!==null&&(y.clientPlayerPositionUtcMillis=u),C=(A=a.player.yb())==null?void 0:g.tY(A),H=((G=C)==null?void 0:G.freePreviewWatchedDuration)||
0,H>0&&(y.freePreviewWatchedDuration={seconds:""+H}),p.unpluggedParams=y);f.heartbeatRequestParams=p;c.isLivePlayback?(M=jlb(a),M!==null&&(f.playbackState||(f.playbackState={}),f.playbackState.playbackPosition={utcTimeMillis:M})):b.L("enable_heartbeat_vod_playback_position")&&(N=klb(a),N!==null&&(f.playbackState||(f.playbackState={}),f.playbackState.playbackPosition={streamTimeMillis:N}));a.player.publish("heartbeatRequest",f);X={timeout:3E4,onSuccess:function(ea){if(!a.B.isActive()&&G5(a)){var oa=
a.getVideoData(),Y=oa.lk&&a.W==null,R;oa.lk=!((R=ea.heartbeatAttestationConfig)==null||!R.requiresAttestation)||Y;Y=ea.playabilityStatus;R=JSON.stringify(Y)||"{}";ea.authenticationMismatch&&a.player.ma("authshear",{});var T=-1;var v=ea.playabilityStatus;v&&(a.player.eb("onHeartbeat",v),v.status==="OK"?T=ea.stopHeartbeat?2:0:v.status==="UNPLAYABLE"?T=1:v.status==="LIVE_STREAM_OFFLINE"&&(T=0));a.sequenceNumber&&T===-1||a.K.reset();a.sequenceNumber++;ea.heartbeatServerData&&(a.qa=ea.heartbeatServerData);
oa.DE=ea;(v=ea.playerCueRangeSet)&&g.QQ(oa,v);ea.playerCueRanges&&ea.playerCueRanges.length>0&&(oa.cueRanges=ea.playerCueRanges);var W,bb;((W=ea.progressBarConfig)==null?0:W.progressBarStartPosition)&&((bb=ea.progressBarConfig)==null?0:bb.progressBarEndPosition)&&(oa.progressBarStartPosition=ea.progressBarConfig.progressBarStartPosition,oa.progressBarEndPosition=ea.progressBarConfig.progressBarEndPosition);oa.compositeLiveIngestionOffsetToken=ea.compositeLiveIngestionOffsetToken;ea.compositeLiveStatusToken!==
oa.compositeLiveStatusToken&&(oa.compositeLiveStatusToken=ea.compositeLiveStatusToken);oa.publish("dataupdated");flb(a,ea,Y,R,T)}},
onError:function(ea){G5(a)&&H5(a,!0,"net-"+ea.status)},
onTimeout:function(){G5(a)&&H5(a,!0,"timeout")}};
g.ZP(b,g.KR(c)).then(function(ea){ea&&(X.vX="Bearer "+ea);g.Bv(a.oa,d,f,X)});
g.ua(V)})},flb=function(a,b,c,d,e){e===-1?(c="decode "+g.pc(d,3),H5(a,!1,c)):e===2?(I5(a),a.G=!0):(a.Z=0,a.B.stop(),e===1?(a.G=!1,c&&c.errorCode==="PLAYABILITY_ERROR_CODE_EMBARGOED"&&a.player.mp(!0),e="pe."+(c==null?void 0:c.errorCode)+";ps."+(c==null?void 0:c.status),a.player.Qf("heartbeat.stop",2,a.Zf(d),e),g.Et("heartbeatActionPlayerHalted",llb(c)),(b==null?0:b.videoTransitionEndpoint)&&c&&(b=b.videoTransitionEndpoint,(d=g.Q(b,g.bR))&&mlb(a,d,c,{itct:b==null?void 0:b.clickTrackingParams}))):(a.G=
!0,d=0,a.D&&c&&(d=Xkb(a,b,c),a.player.publish("livestatedata",c)),d?F5(a,d):F5(a)))},Xkb=function(a,b,c){var d=c.liveStreamability&&c.liveStreamability.liveStreamabilityRenderer,e=!(!d||!(d.switchStreamsImmediately||d.transitionTiming&&d.transitionTiming==="STREAM_TRANSITION_TIMING_IMMEDIATELY"));
b=nlb(a,b,d);var f=a.getVideoData(),h=a.player.getPlayerStateObject(a.getPlayerType()),l=h.isPlaying()&&!g.xR(f)&&!a.player.isAtLiveHead(a.getPlayerType());if(f.U().Xb()){var m,n=((m=a.player.Fe())==null?void 0:m.uc())||{};n.status=c.status||"";n.dvr=""+ +l;n["switch"]=""+ +e;n.ended=""+ +!(!d||!d.displayEndscreen);a.player.ma("heartbeat",n)}if(l&&!e)return b;e=d&&d.streamTransitionEndpoint&&g.Q(d.streamTransitionEndpoint,g.bR);if((d&&d.transitionTiming)==="STREAM_TRANSITION_TIMING_AT_STREAM_END")a.getVideoData().transitionEndpointAtEndOfStream=
e;else if(e&&mlb(a,e,c))return b;if(c.status.toUpperCase()==="OK"){e=d&&d.broadcastId;m=a.j&&a.j.liveStreamability&&a.j.liveStreamability.liveStreamabilityRenderer&&a.j.liveStreamability.liveStreamabilityRenderer.broadcastId;l=e!==m&&e!=null;if(!g.uR(f)||l){var p={video_id:f.videoId};f.DH&&(p.is_live_destination="1");a.player.L("web_player_heartbeat_request_watch_next")||(p.disable_watch_next=!0,p.raw_watch_next_response=f.getWatchNextResponse());p.autonav_state=f.autonavState;p.oauth_token=f.oauthToken;
p.force_gvi=f.Rn;p.vn=f.vn;f.K&&(p.vss_credentials_token=f.K,p.vss_credentials_token_type=f.Ln);f.qa&&(p.vvt=f.qa);d=void 0;g.uR(f)?l&&(d=new E5("broadcastIdChanged",m+","+e),a.sL("HEARTBEAT_ACTION_TRIGGER_IMMEDIATE","HEARTBEAT_ACTION_TRANSITION_REASON_BROADCAST_ID_CHANGED",c)):(e&&(d=new E5("formatsReceived",""+e)),a.sL("HEARTBEAT_ACTION_TRIGGER_IMMEDIATE","HEARTBEAT_ACTION_TRANSITION_REASON_LIVE_STREAM_WENT_ONLINE",c));a.player.loadVideoByPlayerVars(p,void 0,void 0,void 0,d);return b}a.player.Hg("heartbeat",
a.getPlayerType())}d&&d.displayEndscreen&&(a.offlineSlate?(a=a.offlineSlate,a.K=!0,a.Eb&&a.api.LC()):h.isBuffering()&&(f=((p=a.player.Fe())==null?void 0:p.uc())||{},a.player.ma("hbse",f,!0),a.player.LC(),a.player.eb("onLiveMediaEnded",c)));return b},nlb=function(a,b,c){return a.player.L("web_player_use_heartbeat_poll_delay_ms")&&(a=Number(b==null?void 0:b.pollDelayMs))?a:(c=Number(c==null?void 0:c.pollDelayMs))?c:0},H5=function(a,b,c){var d=a.player.U();
if(!a.B.isActive()){a.B.stop();a.Z++;var e=b?"heartbeat.net":"heartbeat.servererror";var f=a.getVideoData();if(f.hV||b&&!g.qR(a.getVideoData())&&!clb(a)&&f.isLivePlayback)f=!1;else{var h,l;((l=a.heartbeatParams)==null?0:l.retries)?h=a.heartbeatParams.retries:h=f.gV||5;f=a.Z>=h}f?(g.Et("heartbeatActionPlayerHalted",b?{enforcedPolicyToHaltOnNetworkFailure:!0}:llb()),(b=a.getVideoData())&&b.isLivePlayback?a.player.Qf(e,1,"\u89c6\u9891\u64ad\u653e\u5df2\u4e2d\u65ad\uff0c\u8bf7\u91cd\u8bd5\u3002",c):a.player.Qf(e,
1,"\u5f88\u62b1\u6b49\uff0c\u4e3a\u6b64\u89c6\u9891\u6388\u4e88\u8bb8\u53ef\u65f6\u51fa\u9519\u3002",c)):(d.L("html5_report_non_fatal_heartbeat_error")&&a.player.Ys(e,{msg:c}),F5(a,a.K.getValue()),g.ph(a.K))}},llb=function(a){var b={enforcedPolicyToHaltOnNetworkFailure:!1};
a&&(b.serializedServerContext=a.additionalLoggingData);return b},I5=function(a){a.Z=0;
a.B.stop();a.G=!1;a.sequenceNumber=0},Wkb=function(a){var b=a.getVideoData(),c=a.player.U();
if(b.isLivePlayback)if(g.aP(c.G)){a.D=!0;a.N=!0;if(!g.ZD(c)||g.XD(c))a.offlineSlate=new Skb(a.player),g.P(a,a.offlineSlate),g.SS(a.player,a.offlineSlate.element,4);(b=b.getPlayerResponse())&&b.playabilityStatus&&(a.j=b.playabilityStatus);var d;((d=a.j)==null?void 0:d.status)!=="UNPLAYABLE"&&(a.j?(d=nlb(a,void 0,a.j.liveStreamability&&a.j.liveStreamability.liveStreamabilityRenderer))?F5(a,d):F5(a,7500):F5(a,1E3))}else a.player.Qf("html5.unsupportedlive",2,"HTML5_NO_AVAILABLE_FORMATS_FALLBACK","nolive.1");
else g.Vb(b.Ca,"heartbeat")&&a.player.Hg("heartbeat",a.getPlayerType())},mlb=function(a,b,c,d){var e=b&&b.videoId;
return e?(a.player.Gp(e,Object.assign({},{autonav:"1"},d||{}),void 0,!0,!0,b,g.KR(a.getVideoData())),a.sL("HEARTBEAT_ACTION_TRIGGER_IMMEDIATE","HEARTBEAT_ACTION_TRANSITION_REASON_HAS_NEW_STREAM_TRANSITION_ENDPOINT",c),!0):!1},jlb=function(a){return(a=a.player.getProgressState(a.getPlayerType()).ingestionTime)&&isFinite(a)?""+Math.floor(a*1E3):null},klb=function(a){return(a=a.player.getCurrentTime(a.getPlayerType()))&&isFinite(a)?""+Math.floor(a*1E3):null},dlb=function(a){try{var b=JSON.parse(a);
return b!=null?b:void 0}catch(c){}},olb={ERAS:["BC",
"AD"],ERANAMES:["Before Christ","Anno Domini"],NARROWMONTHS:"JFMAMJJASOND".split(""),STANDALONENARROWMONTHS:"JFMAMJJASOND".split(""),MONTHS:"January February March April May June July August September October November December".split(" "),STANDALONEMONTHS:"January February March April May June July August September October November December".split(" "),SHORTMONTHS:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),STANDALONESHORTMONTHS:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
WEEKDAYS:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),STANDALONEWEEKDAYS:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTWEEKDAYS:"Sun Mon Tue Wed Thu Fri Sat".split(" "),STANDALONESHORTWEEKDAYS:"Sun Mon Tue Wed Thu Fri Sat".split(" "),NARROWWEEKDAYS:"SMTWTFS".split(""),STANDALONENARROWWEEKDAYS:"SMTWTFS".split(""),SHORTQUARTERS:["Q1","Q2","Q3","Q4"],QUARTERS:["1st quarter","2nd quarter","3rd quarter","4th quarter"],AMPMS:["AM","PM"],DATEFORMATS:["EEEE, MMMM d, y",
"MMMM d, y","MMM d, y","M/d/yy"],TIMEFORMATS:["h:mm:ss\u202fa zzzz","h:mm:ss\u202fa z","h:mm:ss\u202fa","h:mm\u202fa"],DATETIMEFORMATS:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],FIRSTDAYOFWEEK:6,WEEKENDRANGE:[5,6],FIRSTWEEKCUTOFFDAY:5};
olb={ERAS:["\u516c\u5143\u524d","\u516c\u5143"],ERANAMES:["\u516c\u5143\u524d","\u516c\u5143"],NARROWMONTHS:"1 2 3 4 5 6 7 8 9 10 11 12".split(" "),STANDALONENARROWMONTHS:"1 2 3 4 5 6 7 8 9 10 11 12".split(" "),MONTHS:"\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),STANDALONEMONTHS:"\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
SHORTMONTHS:"1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),STANDALONESHORTMONTHS:"1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),WEEKDAYS:"\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d".split(" "),STANDALONEWEEKDAYS:"\u661f\u671f\u65e5 \u661f\u671f\u4e00 \u661f\u671f\u4e8c \u661f\u671f\u4e09 \u661f\u671f\u56db \u661f\u671f\u4e94 \u661f\u671f\u516d".split(" "),
SHORTWEEKDAYS:"\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d".split(" "),STANDALONESHORTWEEKDAYS:"\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d".split(" "),NARROWWEEKDAYS:"\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),STANDALONENARROWWEEKDAYS:"\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),SHORTQUARTERS:["1\u5b63\u5ea6","2\u5b63\u5ea6","3\u5b63\u5ea6","4\u5b63\u5ea6"],QUARTERS:["\u7b2c\u4e00\u5b63\u5ea6",
"\u7b2c\u4e8c\u5b63\u5ea6","\u7b2c\u4e09\u5b63\u5ea6","\u7b2c\u56db\u5b63\u5ea6"],AMPMS:["\u4e0a\u5348","\u4e0b\u5348"],DATEFORMATS:["y\u5e74M\u6708d\u65e5EEEE","y\u5e74M\u6708d\u65e5","y\u5e74M\u6708d\u65e5","y/M/d"],TIMEFORMATS:["zzzz HH:mm:ss","z HH:mm:ss","HH:mm:ss","HH:mm"],DATETIMEFORMATS:["{1} {0}","{1} {0}","{1} {0}","{1} {0}"],FIRSTDAYOFWEEK:0,WEEKENDRANGE:[5,6],FIRSTWEEKCUTOFFDAY:6};
var alb=["ATTESTATION_ERROR_UNKNOWN","ATTESTATION_ERROR_VM_NOT_INITIALIZED","ATTESTATION_ERROR_VM_NO_RESPONSE","ATTESTATION_ERROR_VM_TIMEOUT","ATTESTATION_ERROR_VM_INTERNAL_ERROR"];g.k=Jkb.prototype;g.k.AY=olb.FIRSTDAYOFWEEK;g.k.BY=olb.FIRSTWEEKCUTOFFDAY;g.k.clone=function(){var a=new Jkb(this.date);a.AY=this.AY;a.BY=this.BY;return a};
g.k.getFullYear=function(){return this.date.getFullYear()};
g.k.getYear=function(){return this.getFullYear()};
g.k.getMonth=function(){return this.date.getMonth()};
g.k.getDate=function(){return this.date.getDate()};
g.k.getTime=function(){return this.date.getTime()};
g.k.getDay=function(){return this.date.getDay()};
g.k.getUTCFullYear=function(){return this.date.getUTCFullYear()};
g.k.getUTCMonth=function(){return this.date.getUTCMonth()};
g.k.getUTCDate=function(){return this.date.getUTCDate()};
g.k.getUTCDay=function(){return this.date.getDay()};
g.k.getUTCHours=function(){return this.date.getUTCHours()};
g.k.getUTCMinutes=function(){return this.date.getUTCMinutes()};
g.k.getTimezoneOffset=function(){return this.date.getTimezoneOffset()};
g.k.set=function(a){this.date=new Date(a.getFullYear(),a.getMonth(),a.getDate())};
g.k.setFullYear=function(a){this.date.setFullYear(a)};
g.k.setYear=function(a){this.setFullYear(a)};
g.k.setMonth=function(a){this.date.setMonth(a)};
g.k.setDate=function(a){this.date.setDate(a)};
g.k.setTime=function(a){this.date.setTime(a)};
g.k.setUTCFullYear=function(a){this.date.setUTCFullYear(a)};
g.k.setUTCMonth=function(a){this.date.setUTCMonth(a)};
g.k.setUTCDate=function(a){this.date.setUTCDate(a)};
g.k.add=function(a){if(a.years||a.months){var b=this.getMonth()+a.months+a.years*12,c=this.getYear()+Math.floor(b/12);b%=12;b<0&&(b+=12);a:{switch(b){case 1:var d=c%4!=0||c%100==0&&c%400!=0?28:29;break a;case 5:case 8:case 10:case 3:d=30;break a}d=31}d=Math.min(d,this.getDate());this.setDate(1);this.setFullYear(c);this.setMonth(b);this.setDate(d)}a.days&&(c=this.getYear(),b=c>=0&&c<=99?-1900:0,a=new Date((new Date(c,this.getMonth(),this.getDate(),12)).getTime()+a.days*864E5),this.setDate(1),this.setFullYear(a.getFullYear()+
b),this.setMonth(a.getMonth()),this.setDate(a.getDate()),A5(this,a.getDate()))};
g.k.toString=function(){var a=this.getFullYear(),b=a<0?"-":a>=1E4?"+":"";return[b+Fkb(Math.abs(a),b?6:4),Fkb(this.getMonth()+1,2),Fkb(this.getDate(),2)].join("")+""};
g.k.valueOf=function(){return this.date.valueOf()};var plb=new g.Vq("addUpcomingEventReminderEndpoint");var qlb=new g.Vq("removeUpcomingEventReminderEndpoint");var rlb=new g.Vq("updateUpcomingEventReminderButtonStateCommand");var Lkb=new g.Vq("upcomingEventReminderButtonRenderer"),Rkb=new g.Vq("upcomingEventReminderButtonStateRenderer");g.z(B5,g.XS);
B5.prototype.updateMenuItems=function(){var a=this,b=Kkb(this),c=0;c=0;for(var d={};c<b.length;d={SZ:void 0},c++){var e=this.C[c];e||(e=new g.S({I:"div",S:"ytp-reminder-menu-item",X:{role:"menuitem",tabindex:"0"},V:[{I:"div",S:"ytp-reminder-menu-item-icon",va:"{{icon}}"},{I:"div",S:"ytp-reminder-menu-item-label",va:"{{text}}"}]}),d.SZ=c,e.listen("click",function(h){return function(){var l=h.SZ;a.Mb();l=Kkb(a)[l];a.publish("reminderMenuItemClicked",l.serviceEndpoint||l.command)}}(d)),e.Ha(this.items),
this.C[c]=e);
var f=b[c];d=null;switch(f.icon&&f.icon.iconType){case "NOTIFICATIONS":d=Gkb();break;case "NOTIFICATIONS_NONE":d=Hkb();break;case "NOTIFICATIONS_ACTIVE":d=g.Xx()}f=f.text?g.Px(f.text):"";e.update({icon:d,text:f})}for(;c<this.C.length;)this.C.pop().dispose();c===0?this.Mb():this.qd(this.j)};
B5.prototype.hide=function(){this.j&&this.j.removeAttribute("aria-haspopup");g.XS.prototype.hide.call(this)};
B5.prototype.show=function(){this.j&&this.j.setAttribute("aria-haspopup","true");g.XS.prototype.show.call(this)};
B5.prototype.xa=function(){g.jg(this.C);g.XS.prototype.xa.call(this)};g.z(C5,g.S);
C5.prototype.K=function(){if(this.toggleButtonRenderer){var a=this.toggleButtonRenderer;a.isToggled?this.C(a.toggledServiceEndpoint):this.C(a.defaultServiceEndpoint);a.isToggled=!a.isToggled;D5(this)}else if(this.upcomingEventReminderButtonRenderer)if(this.j&&this.j.Eb)this.j.Mb();else{var b=Okb(this);b&&this.C(b.serviceEndpoint||b.command);b=((a=g.Q(b==null?void 0:b.command,g.Qy))==null?void 0:a.commands)||[];a:{a=g.w(b);for(var c=a.next();!c.done;c=a.next()){var d=b=void 0;if(c=(b=g.Q(c.value,g.Sbb))==
null?void 0:(d=b.popup)==null?void 0:d.menuPopupRenderer){a=c;break a}}a=void 0}this.j||(this.j=new B5(this.J,this.G),this.j.Ha(this.element),g.P(this,this.j),this.j.subscribe("reminderMenuItemClicked",this.C,this));b=this.j;b.menuPopupRenderer=a;b.updateMenuItems()}};
C5.prototype.C=function(a){var b=g.Q(a,plb),c=g.Q(a,qlb);if(a&&(b||c)){if(b){var d=b;var e="notification/add_upcoming_event_reminder"}else c&&(d=c,e="notification/remove_upcoming_event_reminder");if(e&&d&&d.params)for(Qkb(this,e,d.params),a=g.w(d.commands||[]),b=a.next();!b.done;b=a.next())if((b=b.value)&&g.Q(b,rlb)){this.B=g.Q(b,rlb).state;D5(this);break}}};g.z(Skb,g.S);g.k=Skb.prototype;g.k.getPlayerType=function(){if(this.api.getPresentingPlayerType()===8)return 1};
g.k.getVideoData=function(){return this.api.getVideoData(this.getPlayerType())};
g.k.Ra=function(a){var b,c,d=a==null?void 0:(b=a.liveStreamability)==null?void 0:(c=b.liveStreamabilityRenderer)==null?void 0:c.offlineSlate;if(d){this.B=a;b=d.liveStreamOfflineSlateRenderer;b.canShowCountdown?this.P3():Tkb(this,b);var e,f,h,l;if(c=a==null?void 0:(e=a.liveStreamability)==null?void 0:(f=e.liveStreamabilityRenderer)==null?void 0:(h=f.offlineSlate)==null?void 0:(l=h.liveStreamOfflineSlateRenderer)==null?void 0:l.thumbnail){e=0;f=null;h=c.thumbnails;for(l=0;l<h.length;l++)h[l].width>
e&&(e=h[l].width||0,f=h[l].url);f&&(this.background.style.backgroundImage="url("+f+")")}else this.background.style.backgroundImage="";b.actionButtons||b.reminderButton?(this.j||(this.j=new C5(this.api),this.j.Ha(this.Da("ytp-offline-slate-buttons")),g.P(this,this.j)),Mkb(this.j,b.actionButtons&&b.actionButtons[0],b.reminderButton)):this.j&&Mkb(this.j,null,null);this.B=a}else this.B=null;this.U3()};
g.k.U3=function(a){if(this.api.getPresentingPlayerType()===8)var b=!0;else{var c=this.api.getPlayerStateObject(),d=this.getVideoData();b=d.isLivePlayback&&(c.isBuffering()||g.U(c,2)||g.U(c,64));var e=d.autonavState===2&&g.U(c,2);c=c.isPlaying()&&!g.xR(d)&&!this.api.isAtLiveHead(void 0,!0);b=b&&!c&&!e}b&&this.B?this.Eb?(a==null?0:g.Oy(a,2))&&!this.getVideoData().Gm&&(g.Cp(this.element,"ytp-offline-slate-collapsed"),this.D.stop(),g.Cp(this.C,"ytp-offline-slate-bar-fade"),this.G.start()):(this.show(),
this.D.start(),this.api.publish("offlineslatestatechange"),this.K&&this.api.LC()):this.Eb&&(this.hide(),this.api.publish("offlineslatestatechange"))};
g.k.P3=function(){var a,b,c,d,e=(a=this.B)==null?void 0:(b=a.liveStreamability)==null?void 0:(c=b.liveStreamabilityRenderer)==null?void 0:(d=c.offlineSlate)==null?void 0:d.liveStreamOfflineSlateRenderer;e&&(a=Math.floor(g.Ya()/1E3),b=e.canShowCountdown&&Number(e.scheduledStartTime),!b||b<=a?(Tkb(this,e),this.countdownTimer.stop()):(Tkb(this,e,g.Xy(b-a)),g.tp(this.countdownTimer)))};
g.k.xa=function(){this.countdownTimer.dispose();this.countdownTimer=null;g.S.prototype.xa.call(this)};E5.prototype.B=function(a){return this.trigger&&a.trigger?this.module===a.module&&this.trigger===a.trigger&&this.j===a.j:!1};
E5.prototype.isExpired=function(){return(0,g.Wt)()-this.C>6E4};
E5.prototype.toString=function(){return this.module+":"+this.trigger+":"+this.j};g.z(Zkb,g.gY);g.k=Zkb.prototype;g.k.xa=function(){I5(this);this.player.kf("heartbeat");g.gY.prototype.xa.call(this)};
g.k.onCueRangeEnter=function(){this.N=!0;F5(this,2E3)};
g.k.bH=function(a){this.heartbeatParams=a;F5(this,2E3)};
g.k.r5=function(a){var b;this.player.getPresentingPlayerType()!==8&&((b=this.j)==null?void 0:b.status)!=="UNPLAYABLE"&&(g.U(a.state,2)||g.U(a.state,64)?(I5(this),this.D&&(this.N=!0,F5(this,1E3))):(g.U(a.state,1)||g.U(a.state,8))&&F5(this,2E3))};
g.k.s5=function(){this.player.getPresentingPlayerType()!==3&&F5(this,2E3)};
g.k.getPlayerType=function(){if(this.player.getPresentingPlayerType()===8)return 1};
g.k.getVideoData=function(){return this.player.getVideoData(this.getPlayerType())};
g.k.In=function(a){switch(a){case 4:case 3:return!1}return!0};
g.k.sL=function(a,b,c){a={trigger:a,reason:b};c&&(a.serializedServerContext=c.additionalLoggingData);g.Et("heartbeatActionPlayerTransitioned",a)};
g.k.Zf=function(a){var b="LICENSE",c=dlb(a);if(c)return c.reason||g.CY[b]||"";(a=a.match(elb))&&(a=Number(a[1]))&&(b=g.txa(a));return g.CY[b]||""};
g.k.qG=function(){return!!this.offlineSlate&&this.offlineSlate.Eb};
var elb=/^GLS\/1.0 (\d+) (\w+).*?\r\n\r\n([\S\s]*)$/;g.fY("heartbeat",Zkb);})(_yt_player);
