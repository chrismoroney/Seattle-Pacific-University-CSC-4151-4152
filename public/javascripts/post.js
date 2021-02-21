function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books';


var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ecShowTable").innerHTML = CreateTable(JSON.parse(this.responseText));
        // var item = document.createElement('li');
        // item.textContent = JSON.parse(this.responseText);
        // messages.appendChild(item);
        // window.scrollTo(0, document.body.scrollHeight);
    }
};

xhttp.open("GET", url,
    true);
xhttp.send();

// document.getElementById("ecFindBook").addEventListener("click",
//     function(){
//         var e = document.getElementById("ecFindChoice");
//
//         var match = true;
//
//         if(e.options[e.selectedIndex].value == "isbn"){
//             var isbn = document.getElementById("ecFindInput").value;
//             var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books/'+isbn;
//             // var url = 'http://localhost:5000/api/books/'+isbn;
//
//             var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//             match = re.exec(isbn);
//         }else{
//             var author = document.getElementById("ecFindInput").value;
//             var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books?author='+author;
//             // var url = 'http://localhost:5000/api/books?author='+author;
//         }
//
//         if(match) {
//             var xhttp = new XMLHttpRequest();
//
//             xhttp.onreadystatechange = function () {
//                 if (this.readyState == 4 && this.status == 200) {
//                     document.getElementById("ecShowTable").innerHTML = CreateTable(JSON.parse(this.responseText));
//                 }else{
//                     document.getElementById("ecShowTable").innerHTML = '<b>Book with ISBN '+isbn+
//                         ' not found!</b>';
//                 }
//             };
//
//             xhttp.open("GET", url,
//                 true);
//             xhttp.send();
//         }else{
//             alert("Invalid ISBN format!");
//         }
//     })
//
// document.getElementById("ecSubmitNewBook").addEventListener("click",
//     function(){
//         var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books';
//         var match = true;
//
//         // var url = 'http://localhost:5000/api/books';
//
//         let name = document.getElementById("ecNamePost").value;
//         let author = document.getElementById("ecAuthorPost").value;
//         let isbn = document.getElementById("ecisbnPost").value;
//         let price = document.getElementById("ecPricePost").value;
//
//         var params = 'Name='+name+'&Author='+author+'&ISBN='+isbn+'&Price='+price;
//
//         var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//         match = re.exec(isbn);
//
//         if(match){
//             if(!name || !author || !isbn || !price){
//                 alert("Missing fields!");
//             }else {
//                 var xhttp = new XMLHttpRequest();
//
//                 xhttp.onreadystatechange = function () {
//                     if (this.readyState == 4 && this.status == 200) {
//                         alert("Book added!");
//                         window.location.href = 'extra_credit';
//                     }
//                 };
//
//                 xhttp.open("POST", url,
//                     true);
//                 xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//                 xhttp.send(params);
//             }
//         }else{
//             alert("Invalid ISBN!");
//         }
//     }
// )
//
// function removeBook(isbn){
//     var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books/'+isbn;
//     // var url = 'http://localhost:5000/api/books/'+isbn;
//     var xhttp = new XMLHttpRequest();
//
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             alert("Book Removed!");
//             window.location.href = '/extra_credit';
//         }
//     };
//     xhttp.open("DELETE", url,
//         true);
//     xhttp.send();
// }
//
// function updateRow(name, author, isbn, price){
//     console.log(isbn);
//     document.getElementById(isbn).innerHTML =
//         '<td><input type="text" id="ecnameUpdate" name="ecnameUpdate" value="'+name+'"></td>' +
//         '<td><input type="text" id="ecauthorUpdate" name="ecauthorUpdate" value="'+author+'"></td>' +
//         '<td id="ecisbnUpdate">'+isbn+'</td>' +
//         '<td><input type="text" id="ecpriceUpdate" name="ecpriceUpdate" value="'+price+'"></td>' +
//         '<td><button id="ecUpdateButton" onclick="ecUpdateBook()" class="btn btn-primary">Update</button></td>'
// }
//
// function ecUpdateBook(){
//
//     var match = true;
//
//     let name = document.getElementById("ecnameUpdate").value;
//     let author = document.getElementById("ecauthorUpdate").value;
//     let isbn = document.getElementById("ecisbnUpdate").innerText;
//     let price = document.getElementById("ecpriceUpdate").value;
//
//     var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//     match = re.exec(isbn);
//
//     if(!match){
//         alert("Invalid ISBN format!");
//     }else if(!name | !author | !isbn | !price){
//         alert("Missing fields!");
//     }else {
//         // var url = 'http://localhost:5000/api/books/' + isbn;
//         var url = 'https://csc3221-final-project-back-end.herokuapp.com/api/books/'+isbn;
//
//
//         var params = 'Name=' + name + '&Author=' + author + '&ISBN=' + isbn + '&Price=' + price;
//
//         var xhttp = new XMLHttpRequest();
//
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 alert("Book updated!");
//                 window.location.href = 'extra_credit';
//             }
//         };
//
//         xhttp.open("PATCH", url,
//             true);
//         xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhttp.send(params);
//     }
// }
//
//
// function CreateTable(data){
//     let retVal = '';
//
//
//     retVal =
//         '	<table class="table"> \n' +
//         '<thead>' +
//         '<tr>' +
//         // '<th></th>' +
//         '<th> Title </th>' +
//         '<th> Author </th>' +
//         '<th> ISBN </th>' +
//         '<th> Price </th>' +
//         '<th></th>' +
//         '<th></th>' +
//         '</tr>' +
//         '</thead>' +
//         '	<tbody> \n'
//
//     ;
//
//     for (let book in data){
//         retVal +=
//             '<tr id="'+data[book]["ISBN"]+'"> \n' +
//             // '<td><input type="checkbox" id="'+data[book]["ISBN"]+'"></td>' +
//             '<td>' + data[book]["Name"] + '</td> \n' +
//             '<td>' + data[book]["Author"] + '</td> \n' +
//             '<td>' + data[book]["ISBN"] + '</td> \n' +
//             '<td>$' + data[book]["Price"].toFixed(2) + '</td> \n' +
//             '<td><button type="button" class="btn btn-danger" id="ecRemove" onclick="removeBook(\'' +
//             data[book]["ISBN"] + '\')">Delete</button></td>\n' +
//             // '</tr> \n' +
//             '<td><button type="button" class="btn btn-primary" onclick="updateRow('+
//             '\'' + data[book]["Name"]+ '\'' +
//             ',\'' + data[book]["Author"] + '\'' +
//             ',\'' + data[book]["ISBN"] + '\'' +
//             ',\'' + data[book]["Price"] + '\'' +
//             ')">Edit</button></td>' +
//             '</tr> \n';
//     }
//     retVal +=
//         '</tbody> \n' +
//         '</table> \n';
//
//     return retVal;
// }