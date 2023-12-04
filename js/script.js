const bookNowBttn = document.getElementsByClassName('book-now-button')
const userPreview = document.getElementById('user--preview')
const logoutBttn = document.getElementById('logout')

let userData = null;
const storedData = getCookie('formData');
const storedFormData = JSON.parse(storedData);
userData = storedFormData;

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}


function redirectToCheckout() {
    // Redirect to the checkout page
    window.location.href = '../html/checkout.html';
}

if (userData == null) {
    // Loop through all elements with the class 'book-now-button' and add a class to hide them
    for (let i = 0; i < bookNowBttn.length; i++) {
        bookNowBttn[i].classList.add('hidden');
        logoutBttn.innerHTML = 'SIGNIN'
        logoutBttn.addEventListener('click',login)
    }
} else {
    if(userPreview) {
        userPreview.classList.remove('hidden');
        userPreview.innerHTML = '';
        userPreview.innerHTML =  userData.name
        userPreview.classList.add('hidden')
    }
    
    if(logoutBttn) {
        logoutBttn.addEventListener('click',logout)
    }

}
console.log(userData);
function logout() {
    userData = null;
    window.location.href = '../index.html';
}

function login() {
    window.location.href = '../html/signin.html';
}



// checkout functionality

function submitForm() {
    // Get the values from the form
    const selectedDay = document.getElementById('day').value;
    const duration = document.getElementById('duration').value;

    // Create an object to store form data
    const formData = {
        selectedDay: selectedDay,
        duration: duration
    };

    // Convert the object to a JSON string
    const formDataJSON = JSON.stringify(formData);

    // Store the JSON string in a cookie
    document.cookie = `reservationData=${formDataJSON}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;

    // Log to console (you can remove this in a real application)
    console.log(`Form data stored in cookie: ${formDataJSON}`);
    
    alert('submitted successfully!');
    setTimeout(function () {
        // Navigate to index.html after 2 seconds
        window.location.href = '../index.html';
    }, 1000);
}
