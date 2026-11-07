/* =====================================================================
   CC104 – Data Structures and Algorithms
   Project 4: Customer Queue Challenge

   DATA STRUCTURE : a QUEUE, stored in a JavaScript array called `queue`
   RULE           : FIRST-IN, FIRST-OUT (FIFO) – the customer who arrived
                    first must be served first
   OPERATIONS     : enqueue (push), dequeue (shift), peek (queue[0])
   ===================================================================== */

const TARGET = 10;          // serve this many customers to win

let queue = [];             // the waiting line: ["Customer 1", "Customer 2", ...]
let nextNumber = 1;         // gives every customer a unique queue number
let served = 0;             // total customers served so far
let nowServing = null;      // who is at the service counter right now

/* ---------------------------------------------------------------------
   QUEUE OPERATIONS
   --------------------------------------------------------------------- */

/* ENQUEUE: add a new customer at the BACK of the line. */
function addCustomer() {
  if (served >= TARGET) return;                 // game already won
  queue.push("Customer " + nextNumber);         // enqueue
  showMessage("Customer " + nextNumber + " joined the line.", "info");
  nextNumber++;                                 // next customer gets a new number
  render();
}

/* PEEK: look at the FRONT customer without removing them. */
function peek() {
  if (queue.length === 0) return null;
  return queue[0];
}

/* DEQUEUE: remove and serve the customer at the FRONT of the line. */
function serveCustomer() {
  if (served >= TARGET) return;                 // game already won

  if (queue.length === 0) {                     // guard: cannot serve an empty queue
    showMessage("The line is empty! Add a customer first.", "warning");
    return;
  }

  nowServing = queue.shift();                   // dequeue (first in, first out)
  served++;

  if (served >= TARGET) {
    showMessage("You win! You served all " + TARGET + " customers in the right order.", "success");
  } else {
    showMessage("Served " + nowServing + ".", "success");
  }
  render();
}

/* RESET: start over. */
function resetGame() {
  queue = [];
  nextNumber = 1;
  served = 0;
  nowServing = null;
  showMessage("New game! Add customers, then serve them from the front of the line.", "info");
  render();
}

/* ---------------------------------------------------------------------
   DISPLAY (jQuery updates the page from the data)
   --------------------------------------------------------------------- */

function render() {
  // Waiting line, in arrival order (index 0 = front)
  const $line = $("#line").empty();
  if (queue.length === 0) {
    $line.append('<div class="empty-text">Nobody is waiting</div>');
  }
  for (let i = 0; i < queue.length; i++) {
    const $c = $("<div>").addClass("customer").text(queue[i]);
    if (i === 0) $c.addClass("front");
    $line.append($c);
  }

  // Peek
  $("#peek").text(peek() === null ? "none" : peek());

  // Service counter
  $("#counter").text(nowServing === null ? "No one yet" : "Now served: " + nowServing);

  // Counters and progress
  $("#waiting").text(queue.length);
  $("#served").text(served);
  $("#target").text(TARGET);
  $("#progress-bar").css("width", (served / TARGET * 100) + "%");
  $("#progress-wrap").attr("aria-valuenow", served);

  // After winning, only Reset is useful
  const won = served >= TARGET;
  $("#add-btn, #serve-btn").prop("disabled", won);
}

function showMessage(text, kind) {
  $("#message")
    .removeClass("alert-info alert-success alert-warning alert-danger")
    .addClass("alert-" + kind)
    .text(text);
}

/* ---------------------------------------------------------------------
   START-UP
   --------------------------------------------------------------------- */
$(function () {
  $("#add-btn").on("click", addCustomer);
  $("#serve-btn").on("click", serveCustomer);
  $("#reset-btn").on("click", resetGame);
  resetGame();
});
