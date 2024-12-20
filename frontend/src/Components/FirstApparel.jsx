import React, {useContext, useEffect, useState } from 'react';
import '../Styles/FirstApparel.css';
import { ApparelContext } from '../Context/ApparelContext';



const FirstApparel = () => {
    const {selectedApparel,setSelectedApparel} = useContext(ApparelContext);
    const [stockXBestPrice,setStockXBestPrice] = useState("Best Reseller Price");
    const [flightClubBestPrice,setFlightClubBestPrice] = useState("Best Reseller Price");
    const [goatBestPrice,setGoatBestPrice] = useState("Best Reseller Price");
    const [lowest_index, setLowst_index] = useState(-1);
    

    const handleClear = ()=>{
        setSelectedApparel([]);

    const existingCompareCards = JSON.parse(sessionStorage.getItem("Cards")) || [];
      console.log(existingCompareCards);

      const index = existingCompareCards.findIndex(item => item.title === selectedApparel.title);
      console.log(index);

      if (index !== -1) {
        existingCompareCards.splice(index, 1);
      }

      sessionStorage.setItem("Cards", JSON.stringify(existingCompareCards));
    }

    const handleAddWishlist = ()=>{
        const existingWishlist = JSON.parse(localStorage.getItem("Wishlist")) || [];
        const index = existingWishlist.findIndex(item => item.title === selectedApparel.title);
        if (index !== -1) {
            alert("Item already on Wishlist");
        }

        else{
            const shoe = {
                id: selectedApparel.id,
                thumbnail: selectedApparel.thumbnail,
                title: selectedApparel.title,
                price: selectedApparel.price,
                brand: selectedApparel.brand,
                stockXPrice: selectedApparel.stockXPrice,
                stockXLink: selectedApparel.stockXLink,
                flightClubPrice: selectedApparel.flightClubPrice,
                flightClubLink: selectedApparel.flightClubLink,
                goatPrice: selectedApparel.goatPrice,
                goatLink: selectedApparel.goatLink,
                description: selectedApparel.description
            };
    
            
            existingWishlist.push(shoe);
            localStorage.setItem("Wishlist", JSON.stringify(existingWishlist));

        }
        
    }

    useEffect(()=>{
        const prices = [selectedApparel.stockXPrice, selectedApparel.flightClubPrice, selectedApparel.goatPrice];

        const findLowestPriceIndex = (prices) => {
            let lowestIndex = -1;
            let lowestValue = Infinity;

            for (let i = 0; i < prices.length; i++) {
                if (prices[i] !== null && prices[i] < lowestValue) {
                    lowestValue = prices[i];
                    lowestIndex = i;
                }
            }

            return lowestIndex;
        };

        const lowestIndex = findLowestPriceIndex(prices);

        setLowst_index(lowestIndex);



    },[selectedApparel.title]);


    return (
        <>
            <div className='firstApparel-view'>
                <h2>Apparel 1</h2>
                {selectedApparel.length !== 0 ?(
                <>
                    <img src={selectedApparel.thumbnail} alt={selectedApparel.name} width="130" height= "110"></img>
                    <p className='retial'><strong>Retail Price: </strong>{selectedApparel.price != null ? "$"+selectedApparel.price : "Price Not Provided"}</p>


                    <div className='stockx-prices'>
                        <p><strong>StockX: </strong>{selectedApparel.stockXPrice != null ? "$"+selectedApparel.stockXPrice : "N/A"}</p>
                        <p className='BP'>{lowest_index === 0? stockXBestPrice: ""}</p>
                    </div>

                    <div className='flightClub-prices'>
                        <p><strong>FlightClub: </strong>{selectedApparel.flightClubPrice != null ? "$"+selectedApparel.flightClubPrice : "N/A"}</p>
                        <p className='BP'>{lowest_index === 1? flightClubBestPrice: ""}</p>
                    </div>

                    
                    <div className='goat-prices'>
                        <p><strong>Goat: </strong>{selectedApparel.goatPrice != null ? "$"+selectedApparel.goatPrice : "N/A"}</p>
                        <p className='BP'>{lowest_index === 2? goatBestPrice: ""}</p>
                    </div>
                    
                   
                    
                    <div className='des'>
                        <p><strong>Description: </strong>{selectedApparel.description ? selectedApparel.description : "Description Not Provided"}</p>
                    </div>
                    


                    <div className='action'>
                        <button id="clear" onClick={handleClear}>Clear Selection</button>
                        <button id="wish" onClick={handleAddWishlist}>Add to Wishlist</button>
                    </div>
                    
                </>
            ):<p>Select an Apparel</p>
                }
            </div>
            
        </>
    );
};

export default FirstApparel;
