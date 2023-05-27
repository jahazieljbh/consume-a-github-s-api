async function fetchProfile(username) {
  try {
    const apiUrl = `https://api.github.com/users/${username}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Verificar y validar los datos antes de mostrar el perfil
    if (data && Object.keys(data).length !== 0) {
      displayProfile(data);
    } else {
      throw new Error('No profile data available');
    }
  } catch (error) {
    displayError(error.message);
  }
}

function displayProfile(profile) {
  const profileContainer = document.getElementById('profileContainer');
  profileContainer.innerHTML = '';

  const avatar = document.createElement('img');
  avatar.src = profile.avatar_url;
  avatar.alt = `${profile.login}'s avatar`;

  const username = document.createElement('h2');
  username.textContent = profile.login;

  const fields = [
    { label: 'Name', value: profile.name },
    { label: 'Bio', value: profile.bio },
    { label: 'Company', value: profile.company },
    { label: 'Blog', value: profile.blog },
    { label: 'Location', value: profile.location },
    { label: 'Followers', value: profile.followers },
    { label: 'Following', value: profile.following },
    { label: 'Public Repositories', value: profile.public_repos },
    { label: 'Email', value: profile.email },
    { label: 'Hireable', value: profile.hireable },
    { label: 'Gitbub', value: profile.html_url },
    { label: 'Twitter', value: profile.twitter_username }
  ];

  profileContainer.appendChild(avatar);
  profileContainer.appendChild(username);

  fields.forEach(field => {
    if (field.value !== null && field.value !== "") {
      const fieldElement = document.createElement('p');
  
      if (field.label === 'Twitter') {
        const link = createLinkElement(`https://twitter.com/${field.value}`, '_blank', 'fab fa-twitter', '#00acee');
        fieldElement.appendChild(link);
      } else if (field.label === 'Gitbub') {
        const link = createLinkElement(`${field.value}`, '_blank', 'fab fa-github', '#000000');
        fieldElement.appendChild(link);
      } else {
        fieldElement.textContent = `${field.label}: ${field.value}`;
      }
  
      profileContainer.appendChild(fieldElement);
    }
  });
}

function createLinkElement(href, target, className, color) {
  const link = document.createElement('a');
  link.href = href;
  link.target = target;
  link.className = className;
  link.style.color = color;
  link.style.textDecoration = 'none';
  return link;
}

function displayError(errorMessage) {
  const errorContainer = document.getElementById('errorContainer');
  errorContainer.textContent = errorMessage;
}

const form = document.getElementById('githubForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.getElementById('usernameInput');
  const username = input.value.trim();
  if (username !== '') {
    fetchProfile(username);
    input.value = '';
  }
});

function checkInput() {
  const usernameInput = document.getElementById('usernameInput');
  const viewProfileBtn = document.getElementById('viewProfileBtn');

  if (usernameInput.value.trim() !== '') {
    viewProfileBtn.disabled = false;
  } else {
    viewProfileBtn.disabled = true;
  }
}

function openModal() {
  var modal = document.getElementById('modal-1');
  var overlay = document.querySelector('.modal__overlay');
  var container = document.querySelector('.modal__container');
  
  overlay.classList.add('is-open');
  container.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeModalOnEsc);
}

function closeModal() {
  var modal = document.getElementById('modal-1');
  var overlay = document.querySelector('.modal__overlay');
  var container = document.querySelector('.modal__container');
  
  overlay.classList.remove('is-open');
  container.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', closeModalOnEsc);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function continueAction() {
  // Aquí puedes realizar la acción deseada al hacer clic en "Continue" en el modal
}

document.querySelector('.modal__container').addEventListener('click', function(event) {
  event.stopPropagation();
});

document.getElementById('modal-1').addEventListener('click', function(event) {
  if (event.target.classList.contains('modal__close')) {
    closeModal();
  }
});

// Obtener el elemento del año actual
const currentYearElement = document.getElementById('current-year');

// Obtener el año actual
const currentYear = new Date().getFullYear();

// Actualizar el contenido del elemento con el año actual
currentYearElement.textContent = currentYear;
