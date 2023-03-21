/* 4. Fastest ship
Usando https://swapi.dev/ como fuente de data, crear función, que retornará un string:
- Aceptara un argumento tipo entero, que indicará la cantidad de pasajeros requerida.
- Debera calcular sobre todas los starships
- Retornara el nombre la nave que coincida con los siguientes parámetros:
- Tiene la capacidad para transportar los pasajeros indicados
- Puede viajar por al menos 1 semana.
- Fue parte de la trilogía original (4, 5, 6)
- Si más de una nave coincide con dichos parámetros, debera retornar la mas rapida. */
const starships = async (pasajeros, page) => {
    const starships=[];
    try{
        const apiRequest = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
        if(apiRequest.status === 200)
            {
                const resApi = await apiRequest.json();
                //console.log(resApi.results);
                if (resApi.results.length<=0)
                    return console.log("no hay nada");

                resApi.results.forEach( ship => {
                    if(ship.passengers > pasajeros)
                    {
                        //console.log(`la nave es ${ship.name} -> ${pasajeros} / ${ship.passengers}`);
                        starships.push(ship);
                        //console.log(ship);
                    }
                });
                const filteredShips = normalizarNave(starships);
                console.log("+++++++++++++++++");
                console.log(filteredShips);
                console.log("+++++++++++++++++");
                renderPlanetPassengers(filteredShips);
                return bestShip(filteredShips.filter(e => !isNaN(e.speed) && e.consumables!=="unknown"));
            }else
                console.log("no hay naves disponibles");
        }
        catch(e){
            console.error(e);
        }
};

const bestShip = ships =>{
    if(ships.length<1)
        return console.log("no hay naves disponibles");
    

    for (const ship of ships) {
        if(ship.consumables[0] >= 7 && ship.consumables[1] === "days")
            return console.log(`la mejor nave es -> ${ship.name} <-`);
        if(ship.consumables[0] >= 1 && ship.consumables[1] !== "days")
            return console.log(`la mejor nave es -> ${ship.name} <-`);
    }
};

const normalizarNave = ships => {
    let ship;
    ship = ships.map(e => {
        return {
        name: e.name,
        consumables: e.consumables.split(" "),
        speed: e.max_atmosphering_speed,
        passengers: e.passengers,
        films: e.films.join().split("/").filter(e => e.length===1).map(e => parseInt(e,10))
        }
    });

    return validarTrilogia(ship.filter(e => e.speed!=="unknown"));
};

const validarTrilogia = ships =>{
    const ship=[];
    ships.forEach(e => {
        e.films.forEach(film => {
            if(film>=4 && film<=6)
                ship.push(e)
        })
    });

    return speedToInt(Array.from(new Set(ship)));
};

const speedToInt= ship => {
    const nave= ship.map(e => {
        return {
            name: e.name,
            consumables: e.consumables,
            speed: parseInt(e.speed,10),
            passengers: e.passengers,
            films: e.films
            }
    });
    return nave.sort((a,b)=> a.speed - b.speed).reverse();
};

const renderPlanetPassengers = planet => {
    container.innerHTML = `
    <div class="render">
        <h2>Planeta: ${planet[0].name}</h2>
        <p>Pasajeros: ${planet[0].passengers}</p>
        <p>Films: ${planet[0].films}</p>
        <p>Capacidad de viaje: ${planet[0].consumables}</p>
        <p>Velocidad: ${planet[0].speed}</p>
    </div>`;   
}

//starships(0,1);


/* 5. Planet by terrain
Usando https://swapi.dev/ como fuente de data, crear función, que retornará un string:
- Aceptara un argumento tipo string, que indicará el tipo de terreno.
- Retornara el nombre del planeta que coincida con los siguientes parámetros:
- Coincide el tipo de terreno especificado como parámetro.
-Si más de un planeta coincide con dichos parámetros, deberá retornar el que posea más
población. */
const container = document.querySelector('.container');
const planet1 = async (terreno) => {
    const terrainList =[],planets=[];
    let validarTerreno=true;
    const apiRequest = await fetch("https://swapi.dev/api/planets");
    const resApi = await apiRequest.json();

    resApi.results.forEach(planet => {
        terrainList.push(planet.terrain);
    });
    
    for(let i=0;i<resApi.results.length;i++){
        if(resApi.results[i].terrain.search(terreno) !== -1)
                planets.push(resApi.results[i]);
        
    }
    const sortPlanets = planets.sort((a,b) => a.population-b.population);
    console.log(`el planeta es ${sortPlanets[sortPlanets.length-1].name}`);
    renderPlanet(sortPlanets.reverse());
    //console.log(terrainList);
};

const renderPlanet = planet => {
        container.innerHTML = `
        <div class="render">
            <h2>planeta: ${planet[0].name}</h2>
            <p>terreno: ${planet[0].terrain}</p>
            <p>poblacion: ${planet[0].population}</p>
        </div>`;
         /* planet.forEach(e => {
        container.innerHTML += `
        <div style="border: 1px solid black">
            <h2>planeta: ${e.name}</h2>
            <p>terreno: ${e.terrain}</p>
            <p>poblacion: ${e.population}</p>
        </div>`;
    }); */
       
}

//planet1("mountains");