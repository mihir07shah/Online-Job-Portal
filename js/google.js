var employer = false;

function GoogleLogin(user) {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function() {
        //after login;
        window.alert("DONE");
        if (user == 'employer') {
            window.location.href = "profileEmployer.html";
        } else if (user == 'employee') {
            window.location.href = "profileEmployee.html";
        }
    }).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    })
}

function GoogleLogout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.alert("SIGNED OUT SUCCESSFULLY");
        window.location.href = "homepage.html"
    }).catch(function(error) {
        // An error happened.
        var errorMessage = error.message;
        alert(errorMessage);
    });

}