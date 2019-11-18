$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `
                <div class="main__contents__message">
                  <div class="main__contents__message__info">
                    <div class="main__contents__message__info__user">
                      ${message.user_name}
                    </div>
                    <div class="main__contents__message__info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="main__contents__message__text">
                    ${message.body}
                    ${image}
                  </div>
                </div>
                `

    return html;
  }
  $('.main__form__box').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__contents').append(html);
      $('form')[0].reset();
      $('.main__form__box__submit-btn').prop('disabled', false);
      $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
})