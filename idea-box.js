$(function () {
  for (var i = 0; i < localStorage.length; i++){
    var $parsedItems = getStoredItems(localStorage.key(i));
    prependCard($parsedItems);
    $('article').slice(10).hide();
  }
  $('.completed').hide();
});

function getStoredItems (id) {
  return JSON.parse(localStorage.getItem(id));
}

function Item(id, status='', title, body, quality="normal") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.status = status;
  this.quality = quality;
}

$('#save-button').on('click', function() {
  var $itemTitle = $('#title-input').val();
  var $itemContent = $('#body-input').val();
  var $id = $.now();
  var $status = '';
  var $quality = 'normal';
  var newItem = new Item($id, $status, $itemTitle, $itemContent, $quality);
  localStorage.setItem($id, JSON.stringify(newItem));
  prependCard(newItem);
  resetInputs();
  $('article').slice(10).hide();
});

function prependCard(obj) {
  $('#display-side').prepend(
    `<article class='item-card ${obj.status}' id=${obj.id}>
      <div class='title-line'>
        <div  id='line-1'>
          <h2 class='card-title' contenteditable='true'>${obj.title}</h2>
          <button id='delete-button'>
          </button>
        </div>
        <p id='card-body' contenteditable='true'>${obj.body}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-button'>
        </button>
        <button id='downvote-button'>
        </button>
        <p id='quality-line'>importance:  <span id="qual" class="srch-trgt">${obj.quality}</span></p>
      </div>
      <div id='line-4'>
        <button type="submit" class="task-btns" id='completed-task'>completed task</button>
      </div>
     </article`);
}

$('#show-more-todos').on('click', function(){
  $('article').slice(10).show();
})

$('#show-completed-task').on('click', function () {
    $('#display-side').prepend($('.completed').show());
})

function resetInputs (){
  $('#title-input').val('');
  $('#body-input').val('');
  $('#save-button').prop('disabled', true);
}

$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  switch($qualityText.text()){
    case 'none':
    $qualityText.text('low'); break
    case 'low':
    $qualityText.text('normal'); break
    case 'normal':
    $qualityText.text('high'); break
    case 'high':
    $qualityText.text('critical'); break
    default:
    $qualityText.text('critical'); break
  }
  var idValue = $(this).closest('.item-card').attr('id');
  var $quality = $qualityText.text();
  var parsedItem = JSON.parse(localStorage.getItem(idValue));
  parsedItem.quality = $quality;
  localStorage.setItem(idValue, JSON.stringify(parsedItem));
});

$('#display-side').on('click', '#downvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  switch($qualityText.text()){
    case 'critical':
    $qualityText.text('high'); break
    case 'high':
    $qualityText.text('normal'); break
    case 'normal':
    $qualityText.text('low'); break
    case 'low':
    $qualityText.text('none'); break
    default:
    $qualityText.text('none'); break
  }
  var idValue = $(this).closest('.item-card').attr('id');
  var parsedItem = JSON.parse(localStorage.getItem(idValue));
  var $quality = $qualityText.text();
  parsedItem.quality = $quality;
  localStorage.setItem(idValue, JSON.stringify(parsedItem));
});

$('.crit-btn, .high-btn, .norm-btn, .low-btn, .none-btn').on('click', function() {
    var searchBtn = $(this).text().toLowerCase();
    $('.srch-trgt').each(function() {
      var searchText = $(this).text().toLowerCase();
      if (!!searchText.match(searchBtn)) {
        $(this).closest('.item-card').toggle(true);
      }else {
        $(this).closest('.item-card').toggle(false);
      }
    });
});

$('.show-all-btn').on('click', function () {
  $('#display-side').prepend($('.item-card').show());
  $('#display-side').prepend($('.completed').hide());
  $('article').slice(10).hide();
})

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.item-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});

$('#display-side').on('focus', '.card-title, #card-body', function() {
  var key = $(this).closest('.item-card').attr('id')
  var itemBox = JSON.parse(localStorage.getItem(key));
  $(this).on('keydown', function(event) {
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })

  $(this).on('blur', function() {
    itemBox.title = $(this).closest('.item-card').find('.card-title').text();
    itemBox.body = $(this).closest('.item-card').find('#card-body').text();
    localStorage.setItem(key, JSON.stringify(itemBox));
  })
})

$('#search').on('keyup', function() {
    var searchInput = $(this).val().toLowerCase();
    $('.title-line').each(function() {
      var searchText = $(this).text().toLowerCase();
      if (!!searchText.match(searchInput)) {
        $(this).closest('.item-card').toggle(true);
      }else {
        $(this).closest('.item-card').toggle(false);
      }
    });
});

$('#title-input, #body-input').on('keyup', function () {
  if ($('#title-input').val() !== "" && $('#body-input').val() !== ""){
    $('#save-button').prop('disabled', false);
  } else {
    $('#save-button').prop('disabled', true);
  }
})

$('#display-side').on('click',  '#completed-task', function() {
    var key = $(this).closest('.item-card').attr('id');
    var itemCard = JSON.parse(localStorage.getItem(key));
    if ($(this).closest('.item-card').hasClass('completed')){
      itemCard.status = '';
      localStorage.setItem(key, JSON.stringify(itemCard))
      $(this).closest('.item-card').removeClass('completed');
    } else {
      itemCard.status = 'completed';
      localStorage.setItem(key, JSON.stringify(itemCard))
      $(this).closest('.item-card').addClass('completed');
  }
})
