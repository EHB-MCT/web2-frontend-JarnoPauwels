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
                `   <div class="rowContainer custom-rc">
                    <div class="row">
                        <div class="col">
                            <h1 id="gameName">${element.name}</h1>
                        </div>
                        <div class="col">
                           <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary custom-btn" data-bs-toggle="modal" data-bs-target="#${element.id}Modal">
                            Add Score
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="${element.id}Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Enter your name and score</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input id="userName" placeholder="Your Name" type="text">
                                    <input id="userScore" placeholder="Your Score" type="text">
                                </div>
                                <div class="modal-footer" id="addGame">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary custom-btn" onClick="addScore()">Add Score</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">    
                            <img id="gameImg" src="${element.image_url}" alt="">
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

    let htmlString = "";
    array.forEach(element => {
            htmlString += 
            `   <div class="rowContainer custom-rc">
                    <div class="row">
                        <div class="col">
                            <h1 id="gameName">${element.name}</h1>
                        </div>
                        <div class="col">
                        <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary custom-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Score
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Enter your name and score</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input id="userName" placeholder="Your Name" type="text">
                                    <input id="userScore" placeholder="Your Score" type="text">
                                </div>
                                <div class="modal-footer" id="addGame">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" onClick="addScore();" class="btn btn-primary custom-btn">Add Score</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">    
                            <img id="gameImg" src="${element.image_url}" alt="">
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
    // only works for the first object in array, i think i need to put this function in forEach but it doesnt work.
    let userName = document.getElementById("userName").value;
    let userScore = document.getElementById("userScore").value;
    let gameName = document.querySelector("#gameName").innerHTML;
    let gameDesc = document.querySelector("#gameDesc").parentElement.innerText;
    let gameImg  = document.getElementById("gameImg").src;
    console.log(userName, userScore, gameName, gameDesc);
    
        fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata`, {
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                    user: userName,
                    score: userScore,
                    img: gameImg,
                    game: gameName,
                    desc: gameDesc
            })
            
        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log(data);
            return data;
        }).catch(e => {
            console.log(e);
        });

        document.getElementById('addGame').addEventListener('submit', (e) => {
            e.preventDefault();
            addScore();
        });
        //alert("Score Added");
}