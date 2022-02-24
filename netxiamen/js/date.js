var mouthChange=0;
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

// let responseData =[
//     {
//         day: '1',
//         list: [
//             {
//                 time: '19:50',
//                 name: '装逼佬',
//                 checkName: '俞强强',
//                 job: 'UI',
//             }
//         ]
//     },
//     {
//         day: '8',
//         list: [
//             {
//                 time: '14:50',
//                 name: '装逼佬',
//                 checkName: '俞强强',
//                 job: 'UI',
//             }
//         ]
//     },
//     {
//         day: '17',
//         list: [
//             {
//                 time: '19:50',
//                 name: '装逼佬1',
//                 checkName: '俞强强',
//                 job: 'UI',
//             },
//             {
//                 time: '15:50',
//                 name: '装逼佬2',
//                 checkName: '俞强强',
//                 job: 'UI',
//             },
//             {
//                 time: '12:50',
//                 name: '装逼佬3',
//                 checkName: '俞强强',
//                 job: 'UI',
//             },
//             {
//                 time: '15:50',
//                 name: '装逼佬4',
//                 checkName: '俞强强',
//                 job: 'UI',
//             }
//         ]
//     },
// ]

$(document).on('click','.calendar-day-single',function(){

    let numberDate = '';
    if($(this).attr('id').indexOf('before')>=0)
        calendarBack()
    else if ($(this).attr('id').indexOf('after')>=0)
        calendarGo()
    else
        numberDate = $(this).attr('id').replace('now','');
    for(let i = 0; i<responseData.length;i++){
        if(responseData[i].day==numberDate){
            $('.calendar-right-head-time').text($('#timeNow')[0].innerHTML+'-'+numberDate)
            let daySelect = $(this).find('div')[0].innerHTML.replace('共','').replace('名','')
            $('.calendar-right-head-person').text('共'+daySelect+'名面试安排')


            if($('#now'+numberDate).attr('class').indexOf('singel-active')>=0){
                $('#now'+numberDate).removeClass('singel-active');
                $('.calendar-right').removeClass('show-calendar-right');
            }else{
                $('.calendar-day-single').removeClass('singel-active');
                $('.calendar-right').removeClass('show-calendar-right');
                $('#now'+numberDate).addClass('singel-active');
                $('.calendar-right').addClass('show-calendar-right');
            }
            break
        }else{
            $('.calendar-day-single').removeClass('singel-active');
            $('.calendar-right').removeClass('show-calendar-right');
        }
    }


});

$(document).on('click','.calendar-right-head-icon',function(){
    $('.calendar-right').removeClass('show-calendar-right');
});

$(document).on('click','.is-today',function(){
    changeToToday()
//        这里样例调用借口获取数据data

    calendarInset(responseData)
});

//    数据插入

function calendarInset(data){
    for(let x in data){
        if(data[x].list){
            $('#now'+data[x].day).append('<div class="detail-all">共'+ data[x].list.length +'名</div>')
            if(data[x].list.length>3){
                for(let y=0;y<3;y++){
                    $('#now'+data[x].day).append('<div class="date-detail">'+data[x].list[y].time+' '+data[x].list[y].name+'-'+data[x].list[y].job+'-'+data[x].list[y].checkName+'</div>')
                }
                $('#now'+data[x].day).append('<div class="date-detail-person">更多'+ (data[x].list.length-1) +'名</div>')
            }else{
                for(let y=0;y<data[x].list.length;y++){
                    $('#now'+data[x].day).append('<div class="date-detail">'+data[x].list[y].time+' '+data[x].list[y].name+'-'+data[x].list[y].job+'-'+data[x].list[y].checkName+'</div>')
                }
            }
        }
    }
}

(function () {
    changeToToday()
})();

function changeToToday() {

//      纪律前后月份制空
    mouthChange=0;
    let d = new Date();
//        年
    let year = d.getFullYear();
//        月
    let mouth = d.getMonth()+1;
//        当前月天数
    let days = getMouthDays(d);
//        天数数组集合
    let daysJson = new Array();
//        当月的第一天
    let firstDay = new Date(year+'-'+mouth+'-'+'1');
//        当月的最后一天
    let lastDay = new Date(year+'-'+mouth+'-'+days);
//        当月的第一天  星期几
    let weekFirstDay = firstDay.getDay();
//        当月的最后一天  星期几
    let weekLastDay = lastDay.getDay();

//      today按钮
    $('.is-today').attr('class','is-today yes-today');
    $('#timeNow')[0].innerHTML=year+'-'+mouth;
//       设置日期
    for(var i=1;i<=days;i++){
        let day = new Date(year+'-'+mouth+'-'+i);
        let dayWeek = day.getDay();
        let nowYear = new Date().getFullYear();
        let nowMonth = new Date().getMonth();
        let nowDay = new Date().getDate();
        let dayObject;
        if(nowDay==i && (nowMonth+1)==mouth && nowYear==year){
            dayObject = {
                day: i,
                type: 'now',
                class: 'today'
            }
        }else{
            dayObject = {
                day: i,
                type: 'now',
                class: 'now'
            }

        }
        daysJson.push(dayObject)
//            if(0<dayWeek && dayWeek<6){
//                daysJson.push(dayObject)
//            }
    }
//        设置上一个月
    let lastMouthD = d.setMonth(d.getMonth()-1)
//        得到上一个月的天数
    let lastMouthDays = getMouthDays(d)
//        设置上一个月当前页面显示的天数
    if(0<weekFirstDay){
        for(var i = 0;i<weekFirstDay;i++){
            let dayObject = {
                day: lastMouthDays,
                type: 'before',
                class: 'before'
            }

            daysJson.insert(0,dayObject)
            lastMouthDays--
        }
    }
//        设置下一个月当前页面显示的天数
    if(weekLastDay<6){
        for(var i = 1;i<=(6-weekLastDay);i++){
            let dayObject = {
                day: i,
                type: 'after',
                class: 'after'
            }

            daysJson.insert(daysJson.length,dayObject)
        }
    }

//        渲染日历
    let calenderDom = '';
    for(let i=0;i<daysJson.length;i++){
        let idName = daysJson[i].type+daysJson[i].day;
        if(i%7==0){
            if(i==0){
                calenderDom += '<div class="calendar-day-list"><div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }else {
                calenderDom += '</div><div class="calendar-day-list"><div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }
        }else{
            if(i==(daysJson.length-1)){
                calenderDom += '<div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div></div>'
            }else{
                calenderDom += '<div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }
        }
    }
    $('#calendarDay')[0].innerHTML=calenderDom;
}
//    对应月份天数获取
function getMouthDays(data){

    var year = data.getFullYear();
    var mouth = data.getMonth()+1;
    var days;

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
        days = year % 4 == 0 ? 29 : 28;

    }
    else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
    }
    else {
        //其他月份，天数为：30.
        days = 30;

    }
    return days
}
//    回到上一个月
function calendarBack(){
    $('.calendar-day').attr('class','calendar-day left')
    mouthChange-=1;
    let date = new Date()
    date.setMonth(date.getMonth()+mouthChange)
    calendarSet(date)
}
//    去下一个月
function calendarGo(){
    $('.calendar-day').attr('class','calendar-day right')
    mouthChange+=1;
    console.log(mouthChange)
    let date = new Date()
    date.setMonth(date.getMonth()+mouthChange)
    calendarSet(date)
}


function calendarSet(date){
    let d = date;
//        年
    let year = d.getFullYear();
//        月
    let mouth = d.getMonth()+1;
//        当前月天数
    let days = getMouthDays(d);
//        天数数组集合
    let daysJson = new Array();
//        当月的第一天
    let firstDay = new Date(year+'-'+mouth+'-'+'1');
//        当月的最后一天
    let lastDay = new Date(year+'-'+mouth+'-'+days);
//        当月的第一天  星期几
    let weekFirstDay = firstDay.getDay();
//        当月的最后一天  星期几
    let weekLastDay = lastDay.getDay();


    let nowYear = new Date().getFullYear();
    let nowMonth = new Date().getMonth();
    let nowDay = new Date().getDate();
    if((nowMonth+1)==mouth && nowYear==year){
//      today按钮
        $('.is-today').attr('class','is-today yes-today');
    }else{
//      today按钮
        $('.is-today').attr('class','is-today');
    }

    $('#timeNow')[0].innerHTML=year+'-'+mouth;
//       设置日期
    for(var i=1;i<=days;i++){
        let day = new Date(year+'-'+mouth+'-'+i);
        let dayWeek = day.getDay();
        let dayObject;
        if(nowDay==i && (nowMonth+1)==mouth && nowYear==year){
            dayObject = {
                day: i,
                type: 'now',
                class: 'today'
            }
        }else{
            dayObject = {
                day: i,
                type: 'now',
                class: 'now'
            }

        }
        daysJson.push(dayObject)
//            if(0<dayWeek && dayWeek<6){
//                daysJson.push(dayObject)
//            }
    }
//        设置上一个月
    let lastMouthD = d.setMonth(d.getMonth()-1)
//        得到上一个月的天数
    let lastMouthDays = getMouthDays(d)
//        设置上一个月当前页面显示的天数
    if(0<weekFirstDay){
        for(var i = 0;i<weekFirstDay;i++){
            let dayObject = {
                day: lastMouthDays,
                type: 'before',
                class: 'before'
            }

            daysJson.insert(0,dayObject)
            lastMouthDays--
        }
    }
//        设置下一个月当前页面显示的天数
    if(weekLastDay<6){
        for(var i = 1;i<=(6-weekLastDay);i++){
            let dayObject = {
                day: i,
                type: 'after',
                class: 'after'
            }

            daysJson.insert(daysJson.length,dayObject)
        }
    }
//        渲染日历
    let calenderDom = '';
    for(let i=0;i<daysJson.length;i++){
        let idName = daysJson[i].type+daysJson[i].day;
        if(i%7==0){
            if(i==0){
                calenderDom += '<div class="calendar-day-list"><div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }else {
                calenderDom += '</div><div class="calendar-day-list"><div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }
        }else{
            if(i==(daysJson.length-1)){
                calenderDom += '<div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div></div>'
            }else{
                calenderDom += '<div id="'+ idName +'" class="calendar-day-single '+ daysJson[i].class +'"><span class="date">'+daysJson[i].day+'</span></div>'
            }
        }
    }
    $('#calendarDay')[0].innerHTML=calenderDom;
}