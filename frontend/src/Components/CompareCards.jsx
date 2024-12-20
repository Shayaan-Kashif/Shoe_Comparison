import React, { useContext, useEffect } from 'react';
import '../Styles/CompareCards.css';
import { ApparelContext } from '../Context/ApparelContext';


const CompareCards = ({title, thumbnail, price, brand }) => {

    const {loadChange, setLoadChange,selectedNum,setSelectedNum,selectedApparel,setSelectedApparel,setSelectedApparel2,selectedApparel2} = useContext(ApparelContext);
    
useEffect(()=>{
  sessionStorage.removeItem('Cards');

},[])

    const handleRemove = ()=>{
        if(window.confirm("Are you sure you want to remove this apparel?")){

            const Key = `Compare List`;

            const storedApparels = JSON.parse(localStorage.getItem(Key)) || [];

            const indexToRemove = storedApparels.findIndex((apparel) => {
                const firstValue = Object.values(apparel)[0];
                return firstValue === title;
              });
            

              if (indexToRemove !== -1) {
                storedApparels.splice(indexToRemove, 1); 
              }
            
              //saving the list back into localstorage 
              localStorage.setItem(Key, JSON.stringify(storedApparels));
    

              setLoadChange(loadChange+1);

        }
        

    }

    

    const handleSelect = ()=>{

      const existingCompareCards = JSON.parse(sessionStorage.getItem("Cards")) || [];
      console.log(existingCompareCards);

      const index = existingCompareCards.findIndex(item => item.title === title);
      console.log(index);

      if (index !== -1) {
        alert("Apperal already is being compared");


      } else {

        const card = {
          title: title
        }

        existingCompareCards.push(card);

        sessionStorage.setItem("Cards", JSON.stringify(existingCompareCards));


        const Key = `Compare List`;

        const storedApparels = JSON.parse(localStorage.getItem(Key)) || [];

        const indexToFind = storedApparels.findIndex((apparel) => {
            const firstValue = Object.values(apparel)[0];
            return firstValue === title;
          });

          setLoadChange(loadChange+1);

        if(selectedApparel.length === 0 && selectedApparel2.length === 0){
            setSelectedApparel(storedApparels[indexToFind]);

        }

        else if(selectedApparel.length !== 0 && selectedApparel2.length === 0){
          setSelectedApparel2(storedApparels[indexToFind]);

        }

        else if(selectedApparel.length === 0 && selectedApparel2.length !== 0){
          setSelectedApparel(storedApparels[indexToFind]);

        }

        else if(selectedApparel.length !== 0 && selectedApparel2.length !== 0){

          if(selectedNum === 0){
            const existingCompareCards = JSON.parse(sessionStorage.getItem("Cards")) || [];

            const index = 0;

            if (index !== -1) {
              existingCompareCards.splice(index, 1);
            }

          sessionStorage.setItem("Cards", JSON.stringify(existingCompareCards));


            setSelectedApparel(storedApparels[indexToFind]);
            setSelectedNum(1);
            
          }
          else{
            const existingCompareCards = JSON.parse(sessionStorage.getItem("Cards")) || [];

            const index = 0;

            if (index !== -1) {
              existingCompareCards.splice(index, 1);
            }

          sessionStorage.setItem("Cards", JSON.stringify(existingCompareCards));


            setSelectedApparel2(storedApparels[indexToFind]);
            setSelectedNum(0);


          }

        }

        

    }
  }


  return (
    <>
        <div className='CompareCard'>
          <h3 className="title">{title}</h3>
          <div className="content">
              <img src={thumbnail} alt={title} className="thumbnail" />
              <div className="info">
                  <p><strong>Price: </strong>{price != null ? "$"+price : "N/A"}</p>
                  <p><strong>Brand: </strong>{brand}</p>
              </div>
              <div className='action-buttons'>
                  <button id="remove" onClick={handleRemove}>Remove</button>
                  <button id="select" onClick={handleSelect}>Select</button>
              </div>
          </div>
        </div>
    </>
  );
};

export default CompareCards;
