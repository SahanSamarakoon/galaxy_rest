import classes from "./AvailableMeals.module.css";
import Card from "../Common/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import {useEffect, useState} from "react";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const {isLoading, sendRequest : fetchMeals, error} = useHttp();

    useEffect(() => {
        const transformMeals = (mealsObj) => {
            const loadedMeals = [];
            for (const mealKey in mealsObj) {
                loadedMeals.push({
                    id: mealKey,
                    name: mealsObj[mealKey].name,
                    description: mealsObj[mealKey].description,
                    price: mealsObj[mealKey].price
                });
            }
            setMeals(loadedMeals);
        };
        fetchMeals({url: 'https://resturent-afdaa-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'}, transformMeals);
    }, [fetchMeals]);

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    if (isLoading) return (<section className={classes.mealsLoading}><p>Loading...</p></section>)
    if (error !== null ) return (<section className={classes.mealsError}><p>{error}</p></section>)

    return (<section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>)
};

export default AvailableMeals;