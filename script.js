
document.addEventListener('DOMContentLoaded', main);

function main() {
  displayRamens();   
  addSubmitListener();   
}


function displayRamens() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        renderRamenImage(ramen);
      });
    })
    .catch(error => console.error('Error fetching ramens:', error));
}
 
function renderRamenImage(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');

  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));

  ramenMenu.appendChild(img);
}

// 3) When a ramen image is clicked, show its details in #ramen-detail
function handleClick(ramen) {
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const nameElement = document.querySelector('#ramen-detail .name');
  const restaurantElement = document.querySelector('#ramen-detail .restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// 4) Handle submission of the new ramen form
function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Build a new ramen object from the form fields
    const newRamen = {
      name: e.target.name.value,
      restaurant: e.target.restaurant.value,
      image: e.target.image.value,
      rating: e.target.rating.value,
      comment: e.target['new-comment'].value
    };

    // Display the new ramen in the #ramen-menu by creating a new <img>
    renderRamenImage(newRamen);

    // Clear the form
    form.reset();
  });
}
