import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Pagination,
  Box
} from '@mui/material';

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
  const [homeQueryList, setHomeQueryList] = useState([]);
  const [displayHomes, setDisplayHomes] = useState([]);
  const [homesLoaded, setHomesLoaded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);

  const paginate = (page_number: number) => {
    setHomesLoaded(false);
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    const newList = homeQueryList.slice((page_number - 1) * itemsPerPage, page_number * itemsPerPage);
    setDisplayHomes(newList);
    setHomesLoaded(true);
  }

  useEffect(() => {
    if (props.homeList?.length > 0) {
        setHomeList(props.homeList);
        const newList = props.homeList.slice(0, itemsPerPage);
        console.log(Math.ceil(props.homeList.length/itemsPerPage));
        setTotalPages(Math.ceil(props.homeList.length/itemsPerPage));
        setDisplayHomes(newList);
        setHomeQueryList(props.homeList);
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

    const newList = searchResults.slice(0, itemsPerPage);
    setHomeQueryList(searchResults);
    setTotalPages(Math.ceil(searchResults.length/itemsPerPage));
    setDisplayHomes(newList);
    setHomesLoaded(true);
  }
  const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(page);
    if (page) {
      paginate(page);
    }
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
                <Box
                  display="flex"
                  justifyContent="center"
                  m="1rem"
                >
                  <Pagination
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    onChange={changePage}
                  />
                </Box>
            </div>: <div />
        }

    </div>
  )
}

export default HomeList;
