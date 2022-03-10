const draggableList = document.querySelector('#draggable_list');
const check = document.querySelector('#check');

const richestPeople = [
     'Milo',
     'Nico',  
     'LB',
     'Mr. Meowgi',
     'Lord Meowdemort',
     'Mylo Theotokopolous',
     'Mr. Moo',
     'Mr. Moon',
     'Shantay',
     'Usnavy' 
];

// store list items 
const listItems = [];
let dragStartIndex;

createList();

// insert items > DOM 

function createList(){
    [...richestPeople]
        .sort(()=> Math.random() - Math.random())
        .forEach((person, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                <p class="person-name">${person}</p> 
                </div> 
            `; 
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart(){
    console.log('event: ', 'dragstart'); 
    dragStartIndex = this.closest('li').getAttribute('data-index');
    console.log(dragStartIndex);

}
function dragEnter(){
    // console.log('event: ', 'dragenter'); 
    this.classList.add('over');

}
function dragLeave(){
    // console.log('event: ', 'dragleave'); 
    this.classList.remove('over');

}
function dragOver(e){
    // console.log('event: ', 'dragover'); 
    e.preventDefault(); 
}
function dragDrop(){
    // console.log('event: ', 'drop'); 
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over', 'wrong','right');
}

// swap list items 
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItem = document.querySelectorAll('.draggable_list li');

    draggables.forEach( draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItem.forEach( item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    }

    );
}


// check order of items on click 
function checkOrder() {
    listItems.forEach((listItem,index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) { 
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });

}

check.addEventListener('click', checkOrder); 