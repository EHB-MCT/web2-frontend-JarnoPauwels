// ID OF BUTTON NEEDS TO BE UNIQUE FOR MODAL AND ADDSCORE

window.onload = function(){

    document.getElementById('dataContainer').innerHTML = "";
    // document.getElementById('dataContainer').style.display = "block";

    async function displayRandomGames(){
        const response = await fetch(`https://api.boardgameatlas.com/api/search?order_by=rank&ascending=true&client_id=zKw4L2EcTf`);
        const game = await response.json();
        console.log(game.games);
    
        var array = game.games;
        let htmlString = 
            `  
            `;
        array.forEach(element => {
            //let i = 0;
            //var infoId = i++;
            var infoId = "infoBtn" + Math.random().toString(16).slice(2);
            var modalId = "modalId" + Math.random().toString(16).slice(2);
            htmlString +=
                `        
            <div class="grid-item">
                <img class="column-gameImg" src="${element.image_url}" alt="">
                <div class="grid-icon">

                     
                     <div class="wrapper">
                       <a class="icon-ref" type="submit" id="addGame" onClick="addScore(), changeIcon(this)">
                           <i class="plus fa-solid fa-plus"></i>
                           <i class="check fa-solid fa-check"></i>
                           <span class="tooltiptext">Add to My Games</span>
                       </a>
                       <a class="icon-ref" id="myBtn">
                           <i class="fa-solid fa-circle-info"></i>
                           <span class="tooltiptext">Info</span>
                       </a>
                     </div>
                   
                            

                            <div id="myModal" class="modal">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h2 class="modal-title" id="gameName">${element.name}</h2>
                                    <div class="modal-wrapper">
                                        <a class="icon-modal-add" type="submit" id="addGame" onClick="addScore()">
                                            <i class="fa-solid fa-plus"></i>
                                            <span class="tooltiptext">Add to My Games</span>
                                        </a>
                                        <span class="close">&times;</span>
                                    </div>    
                                  </div>
                                  <div class="modal-body">
                                    <img id="gameImg" src="${element.image_url}" alt="">
                                  </div>
                                  <div class="modal-footer">
                                    <p id="gameDesc">${element.description}</p>
                                  </div>
                                </div>
                            </div>
                    </div>
                </div> 
                        
            ` ;
            
                document.getElementById('dataContainer').innerHTML = htmlString; 
                // script here works on first button
                var modal = document.getElementById("myModal");
                //var modal = document.getElementById(modalId);
                var btn = document.getElementById("myBtn");
                //var btn = document.getElementById(infoId);
                var span = document.getElementsByClassName("close")[0];
                
                btn.onclick = function() {
                    console.log(btn);
                    modal.style.display = "block";
                }
                
                span.onclick = function() {
                    modal.style.display = "none";
                }
                
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            
            });
            
        }   
    displayRandomGames()

}

function changeIcon(anchor) {
  anchor.closest('.wrapper').classList.toggle('active');
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
                 `        
            <div class="grid-item">
                <img class="column-gameImg" src="${element.image_url}" alt="">
                <div class="grid-icon">

                     
                     <div class="wrapper">
                       <a class="icon-ref" type="submit" id="addGame" onClick="addScore(), changeIcon(this)">
                           <i class="plus fa-solid fa-plus"></i>
                           <i class="check fa-solid fa-check"></i>
                           <span class="tooltiptext">Add to My Games</span>
                       </a>
                       <a class="icon-ref" id="myBtn">
                           <i class="fa-solid fa-circle-info"></i>
                           <span class="tooltiptext">Info</span>
                       </a>
                     </div>
                   
                            

                            <div id="myModal" class="modal">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h2 class="modal-title" id="gameName">${element.name}</h2>
                                    <div class="modal-wrapper">
                                        <a class="icon-modal-add" type="submit" id="addGame" onClick="addScore()">
                                            <i class="fa-solid fa-plus"></i>
                                            <span class="tooltiptext">Add to My Games</span>
                                        </a>
                                        <span class="close">&times;</span>
                                    </div>    
                                  </div>
                                  <div class="modal-body">
                                    <img id="gameImg" src="${element.image_url}" alt="">
                                  </div>
                                  <div class="modal-footer">
                                    <p id="gameDesc">${element.description}</p>
                                  </div>
                                </div>
                            </div>
                    </div>
                </div> 
                        
            ` ;
            
                document.getElementById('dataContainer').innerHTML = htmlString; 
                // script here works on first button
                var modal = document.getElementById ("myModal");
                //var modal = document.getElementById(modalId);
                var btn = document.getElementById ("myBtn");
                //var btn = document.getElementById(infoId);
                var span = document.getElementsByClassName("close")[0];
                
                btn.onclick = function() {
                    console.log(btn);
                    modal.style.display = "block";
                }
                
                span.onclick = function() {
                    modal.style.display = "none";
                }
                
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
        });
}

async function addScore(){
    // only works for the first object in array, i think i need to put this function in forEach but it doesnt work.
    // let userName = document.getElementById("userName").value;
    // let userScore = document.getElementById("userScore").value;
    let gameName = document.querySelector("#gameName").innerHTML;
    let gameDesc = document.querySelector("#gameDesc").parentElement.innerText;
    let gameImg  = document.getElementById("gameImg").src;
    console.log(gameName, gameDesc);
    
        fetch(`https://web2-courseproject-jarno.herokuapp.com/games`, {
        mode: 'cors',
        method: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({
                    // user: userName,
                    // score: userScore,
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

        document.getElementById("addGame").addEventListener('submit', (e) => {
            e.preventDefault();
            addScore();
            console.log("game added");
        });
        // alert("Score Added");
}

