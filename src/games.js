window.onload = function(){

    document.getElementById('dataContainer').innerHTML = "";
    document.getElementById('dataContainer').style.display = "block";

    async function displayRandomGames(){
        const response = await fetch(`https://api.boardgameatlas.com/api/search?name=?&pretty=true&client_id=zKw4L2EcTf`);
        const game = await response.json();
        console.log(game.games);
    
        var array = game.games;
    
        let htmlString = 
            `  
                <div class="d-flex justify-content-center">
                    <h2>Recommended Games</h2>
                </div>
            `;
        array.forEach(element => {
                htmlString += 
                `   <div class="rowContainer">
                        <div class="row">
                            <div class="col">
                                <h1>${element.name}</h1>
                            </div>
                            <div class="col">
                                <h1><a href="" id="linkTo">Add Score</a></h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">    
                                <img src="${element.image_url}" alt="">
                            </div>  
                            <div class="col">       
                                <p>Description: ${element.description}</p>
                            </div>
                        </div>
                    </div>        
                `;
            document.getElementById('dataContainer').innerHTML = htmlString;
        });
    }
    displayRandomGames()
}

async function getGames(){
    // get name
    document.getElementById('gameInput').addEventListener('submit', (e) => {
    e.preventDefault();
    });
    const name = document.getElementById('gameInputField').value;

    console.log(name);
    const response = await fetch(`https://api.boardgameatlas.com/api/search?name=${name}&pretty=true&client_id=zKw4L2EcTf`);
    const game = await response.json();
    console.log(game.games);

    var array = game.games;

    // your scores add score


    let htmlString = "";
    array.forEach(element => {
            htmlString += 
            `   <div class="rowContainer">
                    <div class="row">
                        <div class="col">
                            <h1 id="gameName">${element.name}</h1>
                        </div>
                        <div class="col">
                            <form id="addGame">         
                                <button type="submit" onclick="addScore();">Add Score</button>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">    
                            <img src="${element.image_url}" alt="">
                        </div>  
                        <div class="col">       
                            <p id="gameDesc">${element.description}</p>
                        </div>
                    </div>
                </div>        
            `;
        document.getElementById('dataContainer').innerHTML = htmlString;
    });
}


async function addScore(){
    let gameName = document.querySelector("#gameName").innerHTML;
    let gameDesc = document.querySelector('#gameDesc').parentElement.innerText;
    console.log(gameName, gameDesc);

        fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    user: "dwdddqqqq2",
                    score: "wwdd",
                    game: gameName,
                    desc: gameDesc
            })
        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log(data);
        });

        document.getElementById('addGame').addEventListener('submit', (e) => {
        e.preventDefault();
    });

}