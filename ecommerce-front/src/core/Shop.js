import React, { useEffect, useState } from "react";
import Layout from "./layout";
import { getCategories } from "../admin/apiAdmin";
import { getFilteredProducts } from "../core/apiCore";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Card from "./Card";


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };


    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };





    return (
        <Layout title="Shop Page" description="Search and find books of your choice" className="container-fluid">
                <div className="row">
                        <div className="col-3">
                            <h4>Filter by categories</h4>
                            <ul>
                                <CheckBox categories={categories} 
                                handleFilters={filters=>
                                    handleFilters(filters,"category")
                                }
                            />
                            </ul>   
                            <h4>Filter by prices</h4>     
                        <ul>

                            
                        <RadioBox prices={prices} 
                                handleFilters={filters=>
                                    handleFilters(filters,"price")
                                    
                                }
                            />
                            
                        </ul>                      
 
                        </div>

                                
                        <div className="col-8">
                            <h2 className="mb-4">Products</h2>
                            <div className="row">
                                {filteredResults.map((product,i)=>(
                                   <div key={i} className="col-4 mb-3">
                                        <Card  product={product} ></Card>
                                    </div>
                                    ))}
                            </div>
                        </div>
                </div>
        </Layout>
    )
}

export default Shop; 