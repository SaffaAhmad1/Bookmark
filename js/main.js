var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");

var bookmarkList = [];
if(localStorage.getItem("bookmark")){
    bookmarkList = JSON.parse(localStorage.getItem("bookmark"))
    displayBookmark()
}

function addBookmark(){
    var bookmark = {
        name : nameInput.value,
        url : urlInput.value,
    }
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmark" , JSON.stringify(bookmarkList))
    validForm()
    displayBookmark();
    clearForm();
}

function validForm(){
    if(urlInput == ""){
        document.getElementById("bookmarkURL").style.color = red;
    }
}

function displayBookmark(){
    var temp = ""
    for(var i =0 ; i < bookmarkList.length ; i++){
        temp+= `<tr>
        <td>`+[i+1] +`</td>
        <td>`+bookmarkList[i].name +`</td>
        <td><a href="`+bookmarkList[i].url +`" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td><button  onclick="deleteBookmark(`+[i] +`)" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
    </tr>`
    }

    document.getElementById("myData").innerHTML = temp;
}


function deleteBookmark(x){
    bookmarkList.splice(x,1)
    localStorage.setItem("bookmark" , JSON.stringify(bookmarkList))
    displayBookmark();
}
function clearForm(){
    nameInput.value=""
    urlInput.value = ""
}