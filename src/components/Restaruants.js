

import React, { useState, useEffect } from 'react';
import axios from "axios";

function  Restaurants(){
    const URL = "https://mysterious-sands-47664.herokuapp.com/TopRamen" ;

    const [Restaurants,setRestaurants] = useState({
            ActualRestaurants:[],
            FilteredRestaurants:[] ,
            sortByRank: false ,
            sortByRestaurant : false ,
            sortByCountry : false ,
            searchItem : ""
        })

    useEffect(()=>{
        FetchRestaurants()
    },[])
    const FetchRestaurants = ()=>{
        axios.get(URL).then(restaurants=>{
            console.log('All Restaurants are:', restaurants.data)
            setRestaurants({
                ...Restaurants ,
                FilteredRestaurants : restaurants.data ,
                ActualRestaurants :  restaurants.data
            })
        })
    }
    const SortRestaurantsByRank =()=>{
       let newRankRestaurants = Restaurants.ActualRestaurants.sort((a,b)=>{
            return a["Top Ten"].split(" ") < b["Top Ten"].split(" ")
        })

        newRankRestaurants.sort((a,b)=>{
            return a["Top Ten"].split("#") > b["Top Ten"].split("#")
        })
        console.log('KOjja', newRankRestaurants )
        setRestaurants({
            ...Restaurants ,
            FilteredRestaurants: newRankRestaurants,
            sortByRank: true ,
            sortByRestaurant : false ,
            sortByCountry : false 
        })

        
    }
    const HandleSortingBY = (e)=>{
        if( e.target.name == "sortByCountry" ){
            setRestaurants({
                ...Restaurants ,
                sortByRank: false ,
                sortByRestaurant : false ,
                sortByCountry : true
            })
        }else if( e.target.name == "sortByRestaurant" ){
            
            setRestaurants({
                ...Restaurants ,
                sortByRank: false ,
                sortByRestaurant : true ,
                sortByCountry : false 
            })
        }else if( e.target.name == "sortByRank" ){
            SortRestaurantsByRank()
        }
    }
    const filterRestaurant =(e)=>{
    
        console.log( e.target.name , e.target.value )
        if( Restaurants.sortByCountry ){
            let newRestaurants = Restaurants.ActualRestaurants.filter( restaurant=>{
                if( restaurant.Country.toLowerCase().includes( e.target.value.toLowerCase() ) ){
                    return restaurant
                }
            })    
            setRestaurants({
                ...Restaurants,
                searchItem : e.target.value ,
                FilteredRestaurants: newRestaurants
            })
        }else if( Restaurants.sortByRestaurant ){
            let newRestaurants = Restaurants.ActualRestaurants.filter( restaurant=>{
                if( restaurant.Brand.toLowerCase().includes( e.target.value.toLowerCase() ) ){
                    return restaurant
                }
            })  
            setRestaurants({
                ...Restaurants,
                searchItem : e.target.value ,
                FilteredRestaurants: newRestaurants
            })
        }

        
    }
    const DisplayRestaurantsJSX = ()=>{
        return <div className="row" >
    
        { Restaurants.FilteredRestaurants.map( resturant =>{
          return(
            <div className="col-md-4" class="border" style
            ={{ margin:"20px" ,width:"25%" }} >
                <div class="e" >
                  <b>{resturant.Brand}</b><br />
                  <p className="overflow-auto" style={{ maxWidth: "260px" }}><b>Variety</b> :{ resturant.Variety } </p>
                  <p><b>style</b> :{ resturant.Style }</p>
                  <p><b>country</b> :{ resturant.Country }</p>
                  <p><b>Rank</b> :{ resturant["Top Ten"] }</p>
                </div>
            </div>
          )
        }) }

    </div>
    }
    return (
        <div className="pt-5" >
            <div style={{textAlign:"center" }} >
                <input style={{ marginLeft:"20px"}} type="radio" name="sortByRank" checked={ Restaurants.sortByRank } onChange={ HandleSortingBY } /> 
                Sort By Rank

                <input style={{ marginLeft:"20px"}} type="radio" name="sortByCountry" checked={ Restaurants.sortByCountry } onChange={ HandleSortingBY } /> 
                Search By Country

                <input style={{ marginLeft:"20px"}} type="radio" name="sortByRestaurant" checked={ Restaurants.sortByRestaurant } onChange={ HandleSortingBY } /> 
                Search By Restaurant

                <input style={{ marginLeft:"40px"}} type="text" placeholder="Search" name="serachItem" value={ Restaurants.searchItem } onChange={ filterRestaurant } /> <br /><br />

                <div class="container"style={{ padding:"50px" }} >
                    { Restaurants.length !== 0 ? DisplayRestaurantsJSX() : null }
                </div>
            </div>
        </div>
    )
}

export default Restaurants ;