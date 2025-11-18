const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

document.getElementById('google-btn').addEventListener('click', () => {
    firebase.auth().signInWithPopup(googleProvider);
});

document.getElementById('github-btn').addEventListener('click', () => {
    firebase.auth().signInWithPopup(githubProvider);
});