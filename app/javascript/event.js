import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarApi from '@fullcalendar/google-calendar'
import weekGridPlugin from '@fullcalendar/timegrid'

document.addEventListener('turbolinks:load', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    plugins: [ dayGridPlugin, interactionPlugin, googleCalendarApi ],
  
    locale: 'ja',
    timeZone: 'Asia/Tokyo',
    firstDay: 1,
        headerToolbar: {
          start: '',
          center: 'title',
          end: 'today prev,next' 
        },
        expandRows: true,
        stickyHeaderDates: true,
        buttonText: {
           today: '今日'
        }, 
        allDayText: '終日',
        height: "auto",
 
        //日付をクリックした時に発生させるイベント
        dateClick: function(info){
          //クリックした日付の情報を取得
          const year  = info.date.getFullYear();
          const month = (info.date.getMonth() + 1);
          const day   = info.date.getDate();

          //ajaxでevents/newを着火させ、htmlを受け取ります
          $.ajax({
              type: 'GET',
              url:  '/events/new',
          }).done(function (res) {
              // 成功処理
              // 受け取ったhtmlをさっき追加したmodalのbodyの中に挿入します
              $('.modal-body').html(res);

              //フォームの年、月、日を自動入力
              $('#event_start_1i').val(year);
              $('#event_start_2i').val(month);
              $('#event_start_3i').val(day);

              $('#event_end_1i').val(year);
              $('#event_end_2i').val(month);
              $('#event_end_3i').val(day);

              //ここのidはevents/newのurlにアクセスするとhtmlがコードとして表示されるので、
              //開始時間と終了時間のフォームを表しているところのidを確認してもらうことが確実です

              $('#modal').fadeIn();

          }).fail(function (result) {
              // 失敗処理
              alert("failed");
          });
      },


  });

  calendar.render();
});
