var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");
var validBtn = document.getElementById("valid-btn");
var closeElement = document.getElementById("close");



nameInput.addEventListener('keyup', validName )
function validName(){
    var regexName = /^[A-Za-z0-9]{3,}$/
    if(regexName.test(nameInput.value)){
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        return true
    }else{
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        return false
    }
}



urlInput.addEventListener('keyup', validURL )
function validURL(){
    var regexURL = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    if(regexURL.test(urlInput.value)){
        urlInput.classList.add("is-valid")
        urlInput.classList.remove("is-invalid")
        return true
    }else{
        urlInput.classList.add("is-invalid")
        urlInput.classList.remove("is-valid")
        return false
    }
}


closeElement.addEventListener('click' ,closeModal  )
function closeModal(){
    boxModal.style.display = "none"
}

var bookmarkList = [];
if(localStorage.getItem("bookmark")){
    bookmarkList = JSON.parse(localStorage.getItem("bookmark"))
    displayBookmark()
}

function addBookmark(){
    if(validName() && validURL()){
        var bookmark = {
            name : nameInput.value,
            url : urlInput.value,
        }
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmark" , JSON.stringify(bookmarkList))
        displayBookmark();
        clearForm();
        nameInput.classList.remove("is-valid")
        urlInput.classList.remove("is-valid")
    }else{
        boxModal.style.display = "flex"
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