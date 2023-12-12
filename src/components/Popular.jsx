import React, { useEffect, useState } from 'react';

function Popular() {

    const [popular, setPopular] = useState([]);
    const getPopular = async () => {
        try {
            const apiKey = "c52bff4eb082421eab6ce3aab455ab3e";

            console.log(apiKey);
            if (!apiKey) {
                console.error("API key not found. Make sure to set REACT_APP_API_KEY in your environment.");
                return;
            }

            const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data.recipes);
            setPopular(data.recipes)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getPopular();
    }, []);

    return (
        <div>
            {popular.map(({ id, title, image }) => {
                return (
                    <div key={id}>
                        <p>{title}</p>
                        <img src={image} alt={title} />
                    </div>
                )
            })}
        </div>
    )
}

export default Popular;
