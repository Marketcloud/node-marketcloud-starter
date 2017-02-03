(function($){var day_ms=24*60*60,hour_ms=60*60,minute_ms=60,lang={rus:{second:['секунда','секунды','секунд'],minute:['минута','минуты','минут'],hour:['час','часа','часов'],day:['день','дня','дней']},eng:{second:['sec','secs'],minute:['min','mins'],hour:['hour','hours'],day:['day','days'],},};$.fn.syotimer=function(options){defaultTimer={year:2014,month:7,day:31,hour:0,minute:0,second:0,periodic:false,periodInterval:7,periodUnit:'d',dayVisible:true,dubleNumbers:true,effectType:'none',lang:'eng',headTitle:'',footTitle:'',afterDeadline:function(timerBlock){timerBlock.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>');}};var settings=$.extend(defaultTimer,options||{});var el=this;return el.each(function(){var obj=$(this);init(obj,settings);(function timeout(){$('.second .tab-val',obj).css('opacity',1);Now=new Date();DeadDate=new Date(settings.year,settings.month-1,settings.day,settings.hour,settings.minute,settings.second);different=Math.floor((DeadDate.getTime()-Now.getTime())/1000);
if(settings.periodic){switch(settings.periodUnit){case'd':unit_ms=day_ms;break;case'h':unit_ms=hour_ms;break;case'm':unit_ms=minute_ms;break;case's':unit_ms=1;break;}
differentUnits=Math.abs(Math.ceil((DeadDate.getTime()-Now.getTime())/(unit_ms*1000) ) ); // кол-во полных единиц времени между текущей датой и дедлайном 
if(different>=0){dUnits=differentUnits%settings.periodInterval;dUnits=(dUnits==0)?settings.periodInterval-1:dUnits-1;}else
dUnits=settings.periodInterval-differentUnits%settings.periodInterval;addUnits=different%unit_ms;if((addUnits==0)&&(different<0))
dUnits--;alls=Math.abs(dUnits*unit_ms+ addUnits);}else
alls=different;if(alls>=0){dd=Math.floor(alls/day_ms);alls=alls%day_ms;dh=Math.floor(alls/hour_ms);alls=alls%hour_ms;dm=Math.floor(alls/minute_ms);alls=alls%minute_ms;ds=Math.floor(alls);if(settings.dayVisible){$('.day .tab-val',obj).html(dd);$('.day .tab-metr',obj).html(declOfNum(dd,lang[settings.lang].day,settings.lang));$('.hour .tab-val',obj).html(format2(dh,settings.dubleNumbers));$('.hour .tab-metr',obj).html(declOfNum(dh,lang[settings.lang].hour,settings.lang));}else{dh+=dd*24;$('.hour .tab-val',obj).html(format2(dh,settings.dubleNumbers));$('.hour .tab-metr',obj).html(declOfNum(dh,lang[settings.lang].hour,settings.lang));}
$('.minute .tab-val',obj).html(format2(dm,settings.dubleNumbers));$('.minute .tab-metr',obj).html(declOfNum(dm,lang[settings.lang].minute,settings.lang));$('.second .tab-val',obj).html(format2(ds,settings.dubleNumbers));$('.second .tab-metr',obj).html(declOfNum(ds,lang[settings.lang].second,settings.lang));switch(settings.effectType){case'none':setTimeout(function(){timeout();},1000);break;case'opacity':$('.second .tab-val',obj).animate({opacity:0.1},1000,'linear',timeout);break;}}else{settings.afterDeadline(obj);}})();});};function init(elem,options){timer_html='<div class="timer-head-block">'+options.headTitle+'</div>';timer_html+='<div class="timer-body-block">';if(options.dayVisible){timer_html+='\
            <div class="table-cell day">\
                <div class="tab-val">0</div>\
                <div class="tab-metr"></div>\
            </div>';}
timer_html+='\
            <div class="table-cell hour">\
                <div class="tab-val">00</div>\
                <div class="tab-metr"></div>\
            </div>\
            <div class="table-cell minute">\
                <div class="tab-val">00</div>\
                <div class="tab-metr"></div>\
            </div>\
            <div class="table-cell second">\
                <div class="tab-val">00</div>\
                <div class="tab-metr"></div>\
            </div>';timer_html+='</div>';timer_html+='<div class="timer-foot-block">'+options.footTitle+'</div>';elem.addClass('timer').html(timer_html);headBlock=$('.timer-head-block',elem);bodyBlock=$('.timer-body-block',elem);footBlock=$('.timer-foot-block',elem);timerBlocks={headBlock:headBlock,bodyBlock:bodyBlock,footBlock:footBlock,};elem=$.extend(elem,timerBlocks);}
function format2(ANumber,isUse){isUse=(isUse=='')?isUse:true;return((ANumber<=9)&&isUse)?("0"+ANumber):(""+ANumber);}
function declOfNum(number,titles,lang){switch(lang){case'rus':cases=[2,0,1,1,1,2];return titles[(number%100>4&&number%100<20)?2:cases[(number%10<5)?number%10:5]];case'eng':return titles[(number==1)?0:1];}}})(jQuery);