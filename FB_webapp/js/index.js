var idGame = 'cuestionario';
var firestore = firebase.firestore();
var t1p1,t2p1
var settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);    
    

var makeid = function() {
		var text = "";
		//var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var possible = "0123456789";
		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	};

function randomNumber(){
    alert(makeid());
}

function createGame(){
    var newGame = makeid();
     firestore.collection(newGame).add({

    team1:{
        p1:"",
        p2:"",
        p3:"",
        timeAnswer:""
    },   
    team2:{
        p1:"",
        p2:"",
        p3:"",
        timeAnswer:""
    }
})
.then(function(docRef) {
        
    console.log("Document written with ID: ", docRef.id);
       idGame = docRef.id;
    
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});   
      
}


function loadData(){
    firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log("ID",doc.id);
        console.log("data",doc.data());
    });
});
    
    

}
/*
var loadData = () => {
    
    firestore.collection("26839").get().then((querySnapshot) => {
        console.log(querySnapshot.data());
    });
}
*/



//firebase.database().ref("26839/eopUiANzBwYlo8FZYdEO").get();

function joinGame(){

     firestore.collection("26839").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
           if(doc.data().team1.p1.name == ""){
            setPlayer1();
            playerNum = 1;
            
        }else{
            setPlayer2();
            playerNum = 2;
        }
    });
    
     });
    
    $("#textoPlayer").html("<h2>¡Listo! esperando al otro jugador</h2>");
}  

function deleteData(){
         var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
             scorep1:0,
             scorep2:0,
            startgame:false,
            team1:{
            p1:{
                name:"",
            }
            }, team2:{
            p1:{
                name:"",
            } 
            }
        });
    
        $("#Iniciar").show();
}

function setPlayer1(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
    //var ide = pin.doc("eopUiANzBwYlo8FZYdEO").collection("team1").doc("p1")
        ide.update({
            team1:{
            p1:{
                name:$("#enterName").val()
            }
            }
        });
}
function setPlayer2(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            team2:{
            p1:{
                name:$("#enterName").val()
                } 
            }
        });
}

function InitGame(){
        var pin = firestore.collection("26839");
    var ide = pin.doc("eopUiANzBwYlo8FZYdEO")
        ide.update({
            startgame:
            1
            
        });
    
    $("#Iniciar").hide();
    $("#Scene1").hide();
   $("#Scene2").show();
}


    function sendScore(scoreAnswer){
        
        var pin = firestore.collection("26839");
        var ide = pin.doc("eopUiANzBwYlo8FZYdEO");
        if(playerNum == 1){
            ide.update({
            scorep1:
            scoreAnswer
            
            });
        }else{
            ide.update({
            scorep2:
            scoreAnswer
            
            });  
        }

    }
 
var realTime  = () => {

    firestore.collection("26839").doc("eopUiANzBwYlo8FZYdEO")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
        $("#t1p1").text(doc.data().team1.p1.name);
          if(doc.data().team1.p1.name != ""){
            $("#team1").find("h2").html("¡Listo!");
          }else{
             $("#team1").find("h2").html("Oponente 1"); 
          }
        $("#t2p1").html(doc.data().team2.p1.name);
        if(doc.data().team2.p1.name != ""){
            $("#team2").find("h2").html("¡Listo!");
          }else{
             $("#team2").find("h2").html("Oponente 2"); 
          }
        $("#Scorep1").find("span").html(doc.data().scorep1);
        $("#Scorep2").find("span").html(doc.data().scorep2);
        if(doc.data().startgame == 1){
            $("#enterGamePlayer").hide();
            $("#Preguntas").show();
        }else{
            $("#enterGamePlayer").show();
            $("#Preguntas").hide();
        }

    });
  
}

realTime();
