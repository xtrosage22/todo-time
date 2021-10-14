//get a reference to the join now button
const button = document.querySelector('.add-btn');

//get a reference to the pop-up wrapper
const popup = document.querySelector('.popup-wrapper');

//get a reference to the pop-up close icon
const popupClose = document.querySelector('.popup-close');

//get a reference to the popup form
const popupForm = document.querySelector('.popup-form')

//get a reference to the entries div 
const entries = document.querySelector('.entries')

//get a reference to the todo entry div
const entry = document.querySelector('.act-activity')

//get a reference to the search-input div
const search = document.querySelector('.search-input')

//create a template that will inject into the entries template
function entriesTemplate(activity,date) {
    const html =
    ` <tr>
    <td>${activity}</td>
    <td>${date}</td>
    <td class="trash">Delete</td>
  </tr>`

    entries.innerHTML += html
}


//add a click event to the button
button.addEventListener('click', () => {

    //change the display none in the css to display block. This makes the popup visible
    popup.style.display = 'block';
});

//add an event listener to the div that containes the X.This closes the popup when it is clicked
popupClose.addEventListener('click', () => {
    //this makes the popup disappear
    popup.style.display = 'none';
});

popupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const dueDate = popupForm.date.value
    //.trims() removes all white spaces
    const activity = popupForm.activity.value.trim();

    //if the form is empty do not submit otherwise submit it
    if (activity.length && dueDate.length) {
        entriesTemplate(activity, dueDate)
        popupForm.reset();
    }
  
})

//delete entries 
entries.addEventListener('click', (e) => {
    if (e.target.classList.contains('trash')) {
        e.target.parentElement.remove()
    }
});


//create a function that grabs the term and matches it to the activities
function filterActivities(term) {

    //Array.from converts the HTML collection into a Nodelist.This allows us to loop over the activities and grab the inner text. Then we match the input term to the activity if they do not match add the filtered class to the div to remove the activity  but if they do not match remove the filtered class to show the activity 
    Array.from(entries.children)
        .filter((activity) => !activity.textContent.includes(term))
        .forEach((activity) => {
        activity.classList.add('filtered')
        })
    
    Array.from(entries.children)
        .filter((activity) => activity.textContent.includes(term))
        .forEach((activity) => {
        activity.classList.remove('filtered')
    })
}

//filtering
//the keyup event tracks everything that is inputed into the search
search.addEventListener('keyup', () => {
    //get the activity that the user types in 
    const term = search.value.trim().toLowerCase();
    console.log(term)
    filterActivities(term)
})
