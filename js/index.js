document.addEventListener("DOMContentLoaded", () => {
    const breedsSelect = document.getElementById("breeds");
    const dogImage = document.getElementById("dog-image");

    // Fetch a list of dog breeds from the API
    fetch("https://dog.ceo/api/breeds/list")
        .then((response) => response.json())
        .then((data) => {
            const breeds = data.message;
            breeds.push("random");
            breedsSelect.innerHTML = breeds.map((breed) => `<option value="${breed}">${breed}</option>`).join("");
        })
        .catch((error) => console.error("Error fetching breeds:", error));

    // Function to fetch and display a random dog image
    function fetchRandomDog() {
        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data.message;
                dogImage.src = imageUrl;
            })
            .catch((error) => console.error("Error fetching random dog image:", error));
    }

    // Event listener for breed selection
    breedsSelect.addEventListener("change", () => {
        const selectedBreed = breedsSelect.value;
        if (selectedBreed === "random") {
            fetchRandomDog();
        } else {
            fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
                .then((response) => response.json())
                .then((data) => {
                    const imageUrl = data.message;
                    dogImage.src = imageUrl;
                })
                .catch((error) => console.error(`Error fetching ${selectedBreed} dog image:`, error));
        }
    });

    // Fetch and display a random dog image on page load
    fetchRandomDog();
});
