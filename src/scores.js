window.onload = function(){
    fetch(`https://web2-courseproject-jarno.herokuapp.com/coursedata`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },

        }).then(response => {
            return response.json()
        }).then(async data => {
            console.log('Success:', data);
            //Add succes message
        });
}