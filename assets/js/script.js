const headerUrl = '../../components/header.html';

fetch(headerUrl)
    .then(response => response.text())
    .then(data => {
        document.getElementById('headerComponent').innerHTML = data;
    })
    .catch(error => console.error('Error loading header component:', error));
        