# Virtualized Infinite Scroll Implementation

This project implements an efficient virtualized scrolling mechanism using vanilla JavaScript to dynamically load and display large datasets. It ensures that only the visible items within the viewport are rendered, optimizing performance and memory usage. The script fetches data from a backend server and manages scrolling dynamically with a buffer of items for smooth transitions as the user scrolls.

## Features

- **Virtualized Scrolling**: Only visible items are rendered, avoiding performance degradation with large datasets.
- **Infinite Scroll**: Automatically loads additional data as the user scrolls.
- **Dynamic Pagination and Caching**: Caches recently loaded pages to minimize API calls and optimize performance.
- **Customizable Parameters**: Easily adjustable item height, page size, and buffer size.

## Prerequisites

- **Backend Server**: The frontend code assumes a backend server running at `http://localhost:3001` with an endpoint `/pagination?page={page}&limit={limit}` that returns paginated JSON data. The server response should follow this format:
  
  ```json
  {
    "totalItems": 100000,
    "data": [
      { "name": "Item 1", "value": 100 },
      { "name": "Item 2", "value": 200 },
      ...
    ]
  }

## Running backend server
Change directory(or cd) to task1 folder and run the below commands 