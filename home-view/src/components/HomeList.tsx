import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const GridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 1200px;
  margin: auto;
  @media (max-width: 1250px) {
    width: 90%;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`
const SearchBar = styled.div`
  width: 500px;
  margin: auto;
  height: 42px;
  border-radius: 50px;
  background-color: #FFF;
  @media (max-width: 750px) {
    width: 90%;
  }
`

function HomeList (props: any) {
  const [homeList, setHomeList] = useState([]);
  const [displayHomes, setDisplayHomes] = useState([]);
  const [homesLoaded, setHomesLoaded] = useState(false);
  useEffect(() => {
    if (props.homeList?.length > 0) {
        console.log(props.homeList);
        setHomeList(props.homeList);
        setDisplayHomes(props.homeList);
        setHomesLoaded(true);
    }
  }, [props.homeList])
  const searchList = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchTerm = event.currentTarget.value;
    setHomesLoaded(false);
    const searchTest = RegExp(searchTerm ? searchTerm.toUpperCase() : '');
    const searchResults: any = [];
    homeList.forEach((home: any) => {
        console.log(home);
        if (searchTest.test(String(home.ADDRESS).toUpperCase())) {
          searchResults.push(home);
        }
    });
    setDisplayHomes(searchResults);
    setHomesLoaded(true);
  }

  return (
    <div>
        {homesLoaded ? 
            <div>
                <div style={{ padding: '10px', backgroundColor: '#999'}}>
                    <SearchBar>
                        <input
                            onChange={searchList}
                            placeholder="search home addresses"
                            style={{
                                width: '80%',
                                height: '38px',
                                border: 'none',
                                outline: '0',
                            }}
                        />
                    </SearchBar>
                </div>
                <GridBox>
                {displayHomes.map((home: any) => {
                    return (
                        <div
                            style={{
                                margin: '10px',
                                padding: '20px',
                                backgroundColor: '#DDD',
                                borderRadius: '10px',
                                textAlign: 'left'
                            }}
                        >
                            <h3>Address: {home.ADDRESS}</h3>
                            <h4>City: {home.CITY}</h4>
                            <h4>Status: {home.STATUS}</h4>
                            <h4>Price: ${home.PRICE}   </h4>
                        </div>
                    );
                })}
                </GridBox>
            </div>: <div />
        }

    </div>
  )
}

export default HomeList;
