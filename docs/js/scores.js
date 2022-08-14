window.onload = function(){
        fetch(`https://web2-courseproject-jarno.herokuapp.com/games`, {
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log('Success:', data);
            var array = data;
            console.log(array);
    
            let htmlString = ` `;
            array.forEach(element => {
                    htmlString += 
                    `   
              <div class="grid-item" >
                <img class="column-gameImg" id="gameImg" src="${element.img}" alt="">
                <div class="grid-icon" >

                <div class="wrapper">
                    <div id="deleteGame" >
                        <button type="submit" class="icon-ref" id="deleteGame" onClick="deleteScore()" onsubmit="window.location.reload()">
                            <i class="fa-solid fa-trash-can"></i>
                            <span class="tooltiptext">Delete</span>
                        </button>
                        
                        <button class="icon-ref" id="myBtn" value="${element._id}">
                            <i class="fa-solid fa-circle-info"></i>
                            <span class="tooltiptext">Info</span>
                        </button>
                    </div>
                </div>

                            <div id="myModal" class="modal">
                                <div class="modal-content" >
                                    <div class="modal-header">
                                        <h2 class="modal-title" id="gameName">${element.game}</h2>
                                        <div class="modal-wrapper">
                                            <button class="icon-modal-add" type="submit" onClick="deleteScore()" onSubmit="window.location.reload()">
                                                <i class="fa-solid fa-trash-can" ></i>
                                                <span class="tooltiptext">Delete</span>
                                            </button>
                                            <span class="close">&times;</span>
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <img id="gameImg" src="${element.img}" alt="">
                                    </div>
                                    <div class="modal-footer">
                                        <p id="gameDesc">${element.desc}</p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>       
                `;
                document.getElementById('scoreContainer').innerHTML = htmlString;

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
        });
}

async function deleteScore (){
  // Only deletes first object in array
  let id  = document.getElementById("myBtn").value;
  
  console.log (id);
  
    //deleteGame
      fetch(`https://web2-courseproject-jarno.herokuapp.com/games/${id}`, {
          mode: 'cors',
          method: "DELETE",
          headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
                  _id: id
          })
      }).then(response => {
          return response.json()
      }).then(async data => {
          console.log(data);
      });
      document.getElementById('deleteGame').addEventListener('submit', (e) => {
      e.preventDefault();

    }); 
    //alert("Score Deleted");

    
}
