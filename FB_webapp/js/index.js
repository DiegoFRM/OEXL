const idGame = 'cuestionario';
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);    
    

function guardar(){
     firestore.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
    address:{
        calle:"Calle",
        numero:1
    }
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});   
}

/*
function loadData(){
    firestore.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log("ID",doc.id);
        console.log("data",doc.data());
    });
});

}*/

var loadData = () => {
    firestore.collection("users").doc(idGame).get().then((querySnapshot) => {
        console.log(querySnapshot.data());
    });
}

var update  = () => {
    let users = firestore.collection("users");
    users.doc(idGame).set({
        first: "Diego",
        last: "Rojas",
        born: 1987,
        address:{
            calle:"Calle",
            numero:100
        }  
    });
    
}

var realTime  = () => {
    
    firestore.collection("users").doc(idGame)
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });
}

realTime();