function Item(id, title, body, quality="normal") {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function prependCard($id, $itemTitle, $itemContent, $quality) {
  $('#display-side').prepend(
    `<div class='item-card' id=${$id}>
      <div class='title-line'>
        <div  id='line-1'>
          <h2 class='card-title' contenteditable='true'>${$itemTitle}</h2>
          <button id='delete-button'>
          </button>
        </div>
        <p id='card-body' contenteditable='true'>${$itemContent}</p>
      </div>
      <div id='line-3'>
        <button id='upvote-button'>
        </button>
        <button id='downvote-button'>
        </button>
        <p id='quality-line'>importance:  <span id="qual">${$quality}</span></p>
      </div>
      <div id='line-4'>
        <button type="submit" id='completed-task'>Completed Task</button>
        <button type="submit" id='show-completed
        -task'>Show Completed Task</button>
      </div>
     </div>`);
}

$(document).ready(function () {
  for(var i=0;i<localStorage.length;i++) {
      var obj = localStorage.getItem(localStorage.key(i));
      var parsedobj = JSON.parse(obj);
      var $itemTitle = parsedobj.title;
      var $itemContent = parsedobj.body;
      var $id = parsedobj.id;
      var $quality = parsedobj.quality;
      prependCard($id, $itemTitle, $itemContent, $quality);
  }
});

$('#save-button').on('click', function() {
  var $itemTitle = $('#title-input').val();
  var $itemContent = $('#body-input').val();
  var $id = $.now();
  var $quality = 'normal';
  var newItem = new Item($id, $itemTitle, $itemContent);
  var stringifiedItem = JSON.stringify(newItem);
  localStorage.setItem($id, stringifiedItem);
  prependCard($id, $itemTitle, $itemContent, $quality);
  $('#title-input').val('');
  $('#body-input').val('');
});

$('#display-side').on('click', '#upvote-button', function () {
  var $qualityText = $(this).siblings('#quality-line').children();
  if ($qualityText.text() === 'swill') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('genius');
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
  if ($qualityText.text() === 'genius') {
    $qualityText.text('plausible');
  } else if ($qualityText.text() === 'plausible') {
    $qualityText.text('swill');
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

$('#completed-task').on('click', function(e) {
    e.preventDefault();
    console.log("hello world!");
    // var $cardBody = $('#card-body');
    // if ($cardBody.val() !== " ") {
    //  $('#cardBody').css('textDecoration', 'line-through');
    // $('#cardBody').prop('disabled', true);
  // }
      //on page reload addclass hide card
      // $(this).load(function () {
      // $('#completed-task').addclass('hide');

  });

})

// $('#show-completed-task').on('click' function () {
//    $(this).addclass('show');
// })
