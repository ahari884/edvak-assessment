// Getting the viewport div from html to render and for scroll event listener
const viewport = document.getElementById('viewport');
// In this element div, we will render the content by pagination
const content = document.getElementById('content');
const itemHeight = 40; // height of each item rendered
const viewportHeight = 600;
const numOfItemsPerPage = 100;  // Number of items per page
let totalItems = 0;
let bufferItems = numOfItemsPerPage * 3; // Buffer items to load above and below the viewport
let cachedPages = {};

// Function to fetch data from the server
async function fetchData(page) {
    // if page with items already caught in cache, then return the items
    if(cachedPages[page]) {
        return cachedPages[page]
    }
    const response = await fetch(`http://localhost:3001/pagination?page=${page}&limit=${numOfItemsPerPage}`);
    const data = await response.json();
    totalItems = data.totalItems;
    return data.data;
}

// Function to render items in the viewport based on the current scroll position
async function renderItems() {
    const scrollTop = viewport.scrollTop;
    const startItemIndex = Math.floor(scrollTop / itemHeight);// First item visble in viewpoert
    const endItemIndex = startItemIndex + Math.floor(viewportHeight / itemHeight) + bufferItems; // Last item visible in viewport

    // Calculating the range of pages to load based on the visible item range
    const startPage = Math.floor(startItemIndex / numOfItemsPerPage) + 1;
    const endPage = Math.floor(endItemIndex / numOfItemsPerPage) + 1;

    let items = [];
    // replace the cached pages with new pages
    let newCachedPages = {};
    for (let page = startPage; page <= endPage; page++) {
        const pageItems = await fetchData(page);
        newCachedPages[page] = pageItems;
        items = items.concat(pageItems);
    }
    cachedPages = newCachedPages;

    const fragment = document.createDocumentFragment();
   
    // Adding content and style to each and every iterm
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.style.top = `${(startItemIndex + index) * itemHeight}px`;
        itemDiv.style.width = '100%';
        itemDiv.style.border = '1px solid grey';
        itemDiv.style.padding = '3px';
        itemDiv.style.textAlign = 'center';
        itemDiv.style.color = 'white';
        itemDiv.style.height =  'auto';
        itemDiv.style.backgroundColor = index % 2 ?'cadetblue': 'burlywood';
        itemDiv.innerText = `${item.name} - ${Math.floor(item.value)}`;
        itemDiv.innerText = `${item.name} - ${item.value}`;
        fragment.appendChild(itemDiv);
    });

    
    content.innerHTML = '';  // Clearing the html to replace with new items loaded
    content.appendChild(fragment); // Replace the current content with the newly loaded items
    content.style.height = `${totalItems * itemHeight}px`; // Set total height for scroll bar
}

// Adding scroll event listener to load items dynamically on scroll
viewport.addEventListener('scroll', renderItems);

// Initial load
renderItems();
