function Item(id, status='', title, body, quality="normal") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.status = status;
  this.quality = quality;
}

function prependCard(obj) {
  $('#display-side').prepend(
    `<div class='item-card ${obj.status}' id=${obj.id}>
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
     </div>`);
}
// $(document).ready(function () {
//   if(localStorage.length > 10){
//     for(var i = (localStorage.length - 10); i < localStorage.length; i++) {
//       var parsedobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
//       displayParsed(parsedobj);
//     }
//   } else {
//     loadAll()
//   }
// });
//
// function loadAll() {
//   for(var i = 0; i < localStorage.length; i++) {
//     var parsedobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
//     displayParsed(parsedobj)
//   }
// };

$(document).ready(function () {
  for(var i=0;i<localStorage.length;i++) {
    var $storedIdeas = getStoredIdeas(localStorage.key(i));
    prependCard($storedIdeas)
  }
    $('.completed').hide();
})

function getStoredIdeas (id) {
  return JSON.parse(localStorage.getItem(id));
}

$('#show-completed-task').on('click', function () {
    $('#display-side').prepend($('.completed').show());
})

$('#save-button').on('click', function() {
  var $itemTitle = $('#title-input').val();
  var $itemContent = $('#body-input').val();
  var $id = $.now();
  var $status = '';
  var $quality = 'normal';
  var newItem = new Item($id, $status, $itemTitle, $itemContent);
  localStorage.setItem($id, JSON.stringify(newItem));
  prependCard(newItem);
  $('#title-input').val('');
  $('#body-input').val('');
});

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
  var $whatIsGrabbed = $(this).closest('.item-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  var $quality = $qualityText.text();
  parselsitem.quality = $quality;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
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
  var $whatIsGrabbed = $(this).closest('.item-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  var $quality = $qualityText.text();
  parselsitem.quality = $quality;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
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

$('#display-side').on('click', '#delete-button', function() {
  var $whatIsDeleted = $(this).closest('.item-card');
  $whatIsDeleted.remove();
  var idValue = $whatIsDeleted.attr('id');
  localStorage.removeItem(idValue);
});

$('#display-side').on('blur', '.card-title', function () {
  var $itemTitle = $(this).text();
  var $whatIsGrabbed = $(this).closest('.item-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  parselsitem.title = $itemTitle;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

$('#display-side').on('blur', '#card-body', function () {
  var $itemContent = $(this).text();
  var $whatIsGrabbed = $(this).closest('.item-card');
  var idValue = $whatIsGrabbed.attr('id');
  var lsitem = localStorage.getItem(idValue);
  var parselsitem = JSON.parse(lsitem);
  parselsitem.body = $itemContent;
  var stringedit = JSON.stringify(parselsitem);
  localStorage.setItem(idValue, stringedit);
});

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
  var $itemTitle = $('#title-input');
  var $itemContent = $('#body-input');
  if ($itemTitle.val() !== "" && $itemContent.val() !== ""){
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

$('#show-more-todos').on('click', function () {

})
