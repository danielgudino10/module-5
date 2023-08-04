
var currentDayEl = document.querySelector("#currentDay");
var now = dayjs();
currentDayEl.textContent = now.format("dddd, MMMM D, YYYY h:mm A");

// Color-code time blocks based on whether they are in the past, present, or future
var timeBlocks = document.querySelectorAll(".time-block");
for (var i = 0; i < timeBlocks.length; i++) {
  var timeBlock = timeBlocks[i];
  var hour = parseInt(timeBlock.id.split("-")[1]);
  if (hour < now.hour()) {
    timeBlock.classList.add("past");
  } else if (hour === now.hour()) {
    timeBlock.classList.add("present");
  } else {
    timeBlock.classList.add("future");
  }
}

// Save events to local storage when the save button is clicked
var saveButtons = document.querySelectorAll(".saveBtn");
for (var i = 0; i < saveButtons.length; i++) {
  var saveButton = saveButtons[i];
  saveButton.addEventListener("click", function () {
    var timeBlock = this.parentElement;
    var hour = timeBlock.id.split("-")[1];
    var eventText = timeBlock.querySelector(".description").value;
    localStorage.setItem(hour, eventText);
  });
}

// Load events from local storage when the page is refreshed
var timeBlocks = document.querySelectorAll(".time-block");
for (var i = 0; i < timeBlocks.length; i++) {
  var timeBlock = timeBlocks[i];
  var hour = timeBlock.id.split("-")[1];
  var eventText = localStorage.getItem(hour);
  if (eventText) {
    timeBlock.querySelector(".description").value = eventText;
  }
}
// Set the start and end times for the work day
var start = moment('9:00am', 'h:mma');
var end = moment('5:00pm', 'h:mma');

// Loop through each hour of the work day
for (var hour = start; hour <= end; hour.add(1, 'hour')) {
  // Create a new time block element
  var block = $('<div>').addClass('time-block');

  // Set the text of the time block to the current hour
  block.text(hour.format('h:mma'));

  // Add the appropriate color class based on whether the hour is in the past, present, or future
  if (hour.isBefore(now, 'hour')) {
    block.addClass('past');
  } else if (hour.isSame(now, 'hour')) {
    block.addClass('present');
  } else {
    block.addClass('future');
  }

  // Add the time block element to the page
  $('.container-fluid').append(block);
}

// When a time block is clicked, allow the user to enter an event and save it to local storage
$('.time-block').on('click', function() {
  var event = prompt('Enter an event:');
  localStorage.setItem($(this).text(), event);
});

// Load any saved events from local storage and display them in the appropriate time block
$('.time-block').each(function() {
  var event = localStorage.getItem($(this).text());
  if (event) {
    $(this).append($('<div>').addClass('event').text(event));
  }
});

// Display the current day at the top of the calendar
$('#currentDay').text(now.format('dddd, MMMM D'));

// Add the appropriate color class to each time block based on whether it is in the past, present, or future
$('.time-block').each(function() {
  var hour = moment($(this).attr('id'), 'hour-h');
  if (hour.isBefore(now, 'hour')) {
    $(this).addClass('past');
  } else if (hour.isSame(now, 'hour')) {
    $(this).addClass('present');
  } else {
    $(this).addClass('future');
  }
});
