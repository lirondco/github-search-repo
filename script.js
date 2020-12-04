const baseUrl = "https://api.github.com/users/"

//  https://api.github.com/users/USERNAME/repos - le format de l'URL

const compileResults = function (json) {
$('#results').empty();
for (let i = 0; i < json.length; i++) {
    $('#results').append(
        `<ul>
        <li>Repo Name: ${json[i].name}</li>
        <li>Repo URL: <a href="${json[i].html_url}">${json[i].html_url} </a></li>
        </ul>`
    )
}
}

const searchUser = function (username) {
const searchURL = `${baseUrl}${username}/repos`;
fetch(searchURL)
.then(response => {
    if(response.ok) {
        return response.json();
    }
    throw new Error (response.statusText);
})
.then(responseJson => compileResults(responseJson))
.catch(err => {
    $('#error-message').text(`Uh oh. Something went wrong: ${err.message}`)
})
}
 

const handleSearch = function() {
    $('.search-form').submit(event=>{
        event.preventDefault();
        const searchResult = $('#search-user').val();
        searchUser(searchResult);
    })
}

const main = function () {
handleSearch()
}

$(main);