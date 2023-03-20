/*
1. Fetch & order
Usando https://randomuser.me/ como fuente de data, crear una función que retorne un arreglo:
- Debe retornar 10 personas.
- Las personas deberán estar ordenadas por primer nombre. 
*/
const users = async () => {
    const usersList = [];
    try {
        const llamadaAPI = await fetch("https://randomuser.me/api/?results=10");

        const users = await llamadaAPI.json();
        
        users.results.forEach(user => {
            usersList.push(user.name.first);
        });
        console.log(usersList.sort());
    }
    catch(e){
        return console.error(e);
    }
        
};
//users();



/*
2. Fetch & find
Usando https://randomuser.me/ como fuente de data, crear función, que acepte como
argumento una edad y retorne la data de la persona:
- Retornará 1 sola persona.
- La persona a retornar será mayor de la edad especificada como argumento.
*/
const usersAge = async (edad) => {

    const llamadaAPI = await fetch(`https://randomuser.me/api/?age=100`);
    const users = await llamadaAPI.json();

    const usersList = users.results;
    console.log(users);
    for (const user of usersList) {
        if(user.dob.age > edad){
            return console.log(user);
            break;
        }
        else
            {console.log("no hay usuarios con a "+ edad + " en esta busqueda");}
    }
};
//usersAge(60);


/*
3. Fetch & count
Usando https://randomuser.me/ como fuente de data, crear función, que retornará un
char/string:
- Deberá obtener 5 personas.
- En base a los nombres deberá calcular cual es la letra más utilizada en los nombres
completos de las 5 personas.
*/

const charsUsers = async () => {
    const usersList = [], persona=[];
    try {
        const llamadaAPI = await fetch("https://randomuser.me/api/?results=5");
        const users = await llamadaAPI.json();
        const nombreChar =[];
        users.results.forEach(user => {
            usersList.push(user.name.first);
        });
        usersList.forEach(element => {
            persona.push({nombre: element, letra: charCount(element)});
        });
        
        console.log(persona);
    }
    catch(e){
        return console.error(e);
    }
        
};

const charCount = text => {
    let palabra=[];
    for (const char of text) {
        let count = 0;
        for(let i=0;i <text.length; i++){
            if(char===text[i])
                count++;
        }
        palabra.push({letra: char, repeticiones: count});
    }
    return palabra.sort((a, b) => a.repeticiones - b.repeticiones).reverse()[0];
};

//charsUsers();