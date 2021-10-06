import React, { useState, useEffect } from 'react';

function HomeList (props: any) {
  const [homeList, setHomeList] = useState([]);
  const [displayHomes, setDisplayHomes] = useState([]);
  const [homesLoaded, setHomesLoaded] = useState(false);
  const [searchAddress, setSearchAddress] = useState(String);
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
    console.log(event.currentTarget.value);
    const searchTerm = event.currentTarget.value;
    setSearchAddress(searchTerm);
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
  const getResults = () => {
    setHomesLoaded(false);
    const searchTest = RegExp(searchAddress ? searchAddress.toUpperCase() : '');
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
                    <div 
                        style={{
                            width: '500px',
                            margin:'auto',
                            height: '42px',
                            borderRadius: '50px',
                            backgroundColor: '#FFF',
                        }}
                    >
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
                        <button onClick={getResults}>Submit</button>
                    </div>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    width: '90%',
                    margin: 'auto',
                }}>
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
                </div>
            </div>: <div />
        }

    </div>
  )
}

export default HomeList;
