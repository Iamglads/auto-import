const carsDOM = document.querySelector(".display__car");

class Cars {
    async getCars() {
        try {
            let result = await fetch("cars.json");
            let data = await result.json();

            let cars = data.items;
            cars = cars.map(car => {
                const { marque, model, prix, moteur, puissance } = car.fields;
                const { id } = car.sys;
                const image = car.fields.image.fields.file.url;

                return { marque, model, prix, image, id, moteur, puissance};
            });
            return cars;
        } catch (error) {
            console.log(error);

        }
    }
}

//display cars 

class UI {
    displayCars(cars) {
        let result = "";
        cars.forEach(car => {
            result += `
            <article>
            <img src="${car.image}" alt="">
            <div>
                <div class="modelBrand">
                    <h4> ${car.marque}</h4>
                    <h5> ${car.model}</h5>
                    <span class="price">${car.prix} €</span>
                    <div class="iconCars">
                        <p> <i class="fas fa-gas-pump"> ${car.moteur}</i></p>
                        <p><i class="fas fa-tachometer-alt"> ${car.puissance} cv</i></p>
                    </div>
                    <button class="btn-cars"> Consulter </button>
                </div>
                
            </div>
        </article>`

        });

        carsDOM.innerHTML = result;
    }
}

//local storage 

class Storage {
    static saveCars(cars) {
        localStorage.setItem("cars", JSON.stringify(cars));
        return cars.find(car => car.id === id);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const cars = new Cars();

    //recuperer les voitures
    cars
        .getCars()
        .then(cars => {
            ui.displayCars(cars);
            Storage.saveCars(cars);
        });
});