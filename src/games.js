window.onload = function(){
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
                                <h1><a href="" id="linkTo">Add Scores</a></h1>
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
                            <h1>${element.name}</h1>
                        </div>
                        <div class="col">
                            <h2><a href="" id="linkTo">Add Scores</a></h2>
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

//         //`${element.id}`
//         // let sectionString = "";
//         // document.getElementById('linkTo').addEventListener("click", (e) => {
//         //     console.log(e);
//         //     document.getElementById('dataContainer').innerHTML = "";
//         //     document.getElementById('section').style.display = "block";
//         //     sectionString += 
//         //         `   <div class="rowContainer">
//         //                 <div class="row">
//         //                     <div class="col">
//         //                         <h1>${element.name}</h1>
//         //                     </div>
//         //                     <div class="col">
//         //                         <h1><a href="#section" id="linkTo">See Scores</a></h1>
//         //                     </div>
//         //                 </div>
//         //                 <div class="row">
//         //                     <div class="col">    
//         //                         <img src="${element.image_url}" alt="">
//         //                     </div>  
//         //                     <div class="col">       
//         //                         <p>Description: ${element.description}</p>
//         //                     </div>
//         //                 </div>
//         //             </div>        
//         //         `;
//         //     document.getElementById('section').innerHTML = sectionString;
//         // }); 

    });
};