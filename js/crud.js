var nameIP, emailIP, typeIP, workIP, addressIP;
var id = sessionStorage.getItem("id");
id = id.slice(0, id.search('@'));

function Ready() {
    nameIP = document.getElementById('name').value;
    emailIP = document.getElementById('email').value;
    typeIP = document.getElementById('type').value;
    workIP = document.getElementById('work').value;
    addressIP = document.getElementById('address').value;
}

function insert(user) {
    Ready();
    if (user == 'employer')
        rt = 'Employers/';
    else if (user == 'employee')
        rt = 'Employees/';
    firebase.database().ref(rt + id).set({
        CompanyName: nameIP,
        CompanyEmail: emailIP,
        CompanyType: typeIP,
        CompanyWork: workIP,
        CompanyAddress: addressIP,
        List: 0
    });
    if (user == 'employee') {
        window.location.href = "feed.html";
    }
}

// function show() {
//     console.log("IN");
//     firebase.database().ref('Employers/' + 'virubhosale112').on('value', function(snapshot) {

//         console.log(snapshot.val().CompanyName);

//         document.getElementById('nameDisplay').innerHTML = "NAME:" + snapshot.val().CompanyName;
//         document.getElementById('emailDisplay').innerHTML = "EMAIL:" + snapshot.val().CompanyEmail;
//         document.getElementById('typeDisplay').innerHTML = "TYPE:" + snapshot.val().CompanyType;
//         document.getElementById('addressDisplay').innerHTML = "ADDRESS:" + snapshot.val().CompanyAddress;
//         document.getElementById('workDisplay').innerHTML = "WORK:" + snapshot.val().CompanyWork;

//         // document.getElementById('feed').innerHTML = "<br><hr>";
//     });
// }

var rootRef = firebase.database().ref();
var employerRef = rootRef.child("Employers/");

function show() {
    console.log("IN");
    var i = 1;
    employerRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            // console.log(child.key + ' ' + child.val());

            para1 = document.createElement('p');
            para1.setAttribute("id", "nameDisplay" + i);
            node1 = document.createTextNode(i + ")NAME:" + child.val().CompanyName);
            para1.appendChild(node1);
            para1.appendChild(document.createElement("br"));

            para2 = document.createElement('p');
            para2.setAttribute("id", "emailDisplay" + i);
            node2 = document.createTextNode("EMAIL:" + child.val().CompanyEmail);
            para2.appendChild(node2);
            para2.appendChild(document.createElement("br"));

            para3 = document.createElement('p');
            para3.setAttribute("id", "typeDisplay" + i);
            node3 = document.createTextNode("TYPE:" + child.val().CompanyType);
            para3.appendChild(node3);
            para3.appendChild(document.createElement("br"));

            para4 = document.createElement('p');
            para4.setAttribute("id", "addressDisplay" + i);
            node4 = document.createTextNode("ADDRESS:" + child.val().CompanyAddress);
            para4.appendChild(node4);
            para4.appendChild(document.createElement("br"));

            para5 = document.createElement('p');
            para5.setAttribute("id", "workDisplay" + i);
            node5 = document.createTextNode("WORK:" + child.val().CompanyWork);
            para5.appendChild(node5);
            para5.appendChild(document.createElement("br"));

            applyButton = document.createElement('button');
            applyButton.setAttribute("id", child.key);
            applyButton.textContent = "APPLY";
            applyButton.addEventListener('click', function() { apply(this) }, false);

            feed = document.getElementById("feed");
            feed.appendChild(para1);
            feed.appendChild(para2);
            feed.appendChild(para3);
            feed.appendChild(para4);
            feed.appendChild(para5);
            feed.appendChild(applyButton);

            feed.appendChild(document.createElement("hr"));

            i += 1
        });
    });
}

function apply(i) {
    console.log(i.id);
    n = Math.random() * 1000;
    firebase.database().ref('Employers/' + i.id + '/List/').push({
        EmployeeId: id
    });
}

function showRequests() {
    var requestRef = employerRef.child(id + '/List/');
    requestRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            console.log(child.val().EmployeeId);


            para1 = document.createElement('p');
            node1 = document.createTextNode("Employee Id:" + child.val().EmployeeId);
            para1.appendChild(node1);
            para1.appendChild(document.createElement("br"));

            entries = document.getElementById('entries');
            entries.appendChild(para1);
        });
    });
}