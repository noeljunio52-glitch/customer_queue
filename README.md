# Customer Queue Challenge

**Course:** CC104 – Data Structures and Algorithms (Course Term Project, Project 4)
**Section:** BSIT WMT 2-2
**Group:** _Group XX_

## Group Members

| Name | Contribution |
|------|--------------|
| Noel D. Junio | _fill in_ |
| _Member 2_ | _fill in_ |
| _Member 3_ | _fill in_ |
| _Member 4_ | _fill in_ |

## Game Objective

Run a service counter. Customers join a waiting line and must be served in the **same order they arrived**. Serve **10 customers** to win.

## Screenshots

| Gameplay | Win | Mobile |
|---|---|---|
| ![Gameplay](assets/screenshots/gameplay.png) | ![Win](assets/screenshots/win.png) | ![Mobile](assets/screenshots/mobile.png) |

## Gameplay Instructions

1. Press **Add Customer** to add a new customer to the **back** of the waiting line. Each customer gets a unique number (Customer 1, Customer 2, ...).
2. The yellow **Next customer (peek)** box shows who is at the front of the line, without removing them. The front customer is also marked **FRONT**.
3. Press **Serve Customer** to serve the customer at the **front**. They move to the Service Counter.
4. If the line is empty, serving is blocked and a warning is shown.
5. The **Waiting**, **Served** and **Target** counters and the progress bar update after every action.
6. After **10 customers** are served, the game shows a success message and the Add/Serve buttons are disabled.
7. Press **Reset** at any time to start over.

## Launch Instructions

No installation, server, database or internet connection is needed.

1. Download or clone the repository (on a phone, extract the zip first or use a single-file build).
2. Open **`index.html`** in a web browser.

Bootstrap 5 (`css/bootstrap.min.css`) and jQuery 3 (`js/jquery.min.js`) are stored in the project folder so the game works offline.

## Project Structure

```
CC104-Game-Project/
├── index.html            page structure (Bootstrap layout)
├── css/
│   ├── bootstrap.min.css Bootstrap 5 (local copy)
│   └── style.css         game visuals
├── js/
│   ├── jquery.min.js     jQuery 3 (local copy)
│   └── game.js           queue data structure + game logic
├── assets/screenshots/   screenshots used in this README
└── README.md
```

## Data Structure

A **queue**, implemented with a JavaScript **array** named `queue` in `js/game.js`. A queue follows **FIFO** (first-in, first-out): the first customer added is the first customer served.

```js
let queue = [];                    // ["Customer 1", "Customer 2", "Customer 3"]
queue.push("Customer 4");          // enqueue: add to the back
let next = queue[0];               // peek: look at the front
let served = queue.shift();        // dequeue: remove from the front
```

## Algorithms / Operations

| Operation | What it does | Code | Function |
|---|---|---|---|
| Enqueue | Adds a customer to the back of the line, using a counter so every number is unique | `queue.push("Customer " + nextNumber)` | `addCustomer()` |
| Peek | Reads the front customer without removing them; returns `null` if the line is empty | `queue[0]` | `peek()` |
| Dequeue | Removes and returns the front customer (first in, first out) | `queue.shift()` | `serveCustomer()` |
| Empty check | Blocks serving when `queue.length === 0` and shows a warning | `if (queue.length === 0)` | `serveCustomer()` |
| Display in arrival order | Loops from index 0 to the end and draws each customer left to right | `for (let i = 0; i < queue.length; i++)` | `render()` |
| Win check | After each serve, success when `served >= 10` | `if (served >= TARGET)` | `serveCustomer()` |

## Key Functions

- `addCustomer()` – enqueue
- `peek()` – peek
- `serveCustomer()` – dequeue, count served, check the win, block an empty queue
- `resetGame()` – clear the queue, numbering, counters and message
- `render()` – redraw the line, peek, counter, counts and progress bar using jQuery

## Error Handling (invalid actions)

- Serving an empty queue is blocked with a warning message.
- After winning, Add and Serve are disabled (and ignored by the code) until Reset.

## Technologies

HTML5 · CSS3 · Bootstrap 5 · JavaScript · jQuery 3
