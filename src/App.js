import { useEffect, useState } from 'react';
import './App.css';

function App() {


  const [products,setProduct]=useState([]);
  
  // to display the 10 product per page
  const[page,setPage]=useState(1)

  //get the total pages or product given by backend
  const[totalpage,setTotalPage]=useState(0)

  function selectPagehandler(pageNo){ 
    if(pageNo>=1 && pageNo<=totalpage  && page!=pageNo)
     { 
      setPage(pageNo);
    }
  }

  const fetchProduct=async()=>{
    const res=await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10}`);
    let data=await res.json();
    if(data && data.products){     
      setTotalPage(data.total/10)
      data=data.products;
      setProduct(data);
    }
  }
  // fetchProduct();
  useEffect(()=>{
    fetchProduct();
  },[page]);

  return (
    <div className="App">
      {products.length>0 && 
        <div className='products'>
          {
            products.map((pro)=>{
              return(
                <span className='products__single' key={pro.id}>
                  <img src={pro.thumbnail} alt={pro.title}/>
                  <span>{pro.title}</span>
                </span>
              );
            })
          }
        </div>
      }

      {products.length>0 && 
        <div className='pagination'>
          <span 
            onClick={()=>selectPagehandler(page-1)}
            className={page>1?"":"hidePaginationBtn"}
          >◀️</span>
          {[...Array(totalpage)].map((_, i) => {
          return <span className={page===i+1?"selectedPage":""} key={i} onClick={() => selectPagehandler(i+1)}>{i + 1}</span>
          })}
          <span 
            onClick={()=>selectPagehandler(page+1)}
            className={page<totalpage?"":"hidePaginationBtn"}
          >▶️</span>
        </div>
      }
    </div>
  );
}

export default App;
