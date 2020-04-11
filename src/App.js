import React,  {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from  'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';



function App() {

 // Setting states
 const [latest, setlatest] = useState([]);
 const [results, setResults] = useState([]);
 const [searchCountries , setSearchCountries] = useState("");



 //Fetching API from its Endpoint
useEffect(()=>{
  axios
  .all([
  axios.get("https://corona.lmao.ninja/all"),
  axios.get("https://corona.lmao.ninja/countries")
])

  .then(resArr =>{
    setlatest(resArr[0].data);
    setResults(resArr[1].data);
  })

  .catch(err => {
    console.log(err);
  });

},[])


const date = new Date(parseInt(latest.updated));
const lastupdated = date.toString();

const filterCountries = results.filter(item =>{
  return    searchCountries !== "" ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
   : item;
});

const countires = filterCountries.map(((data, i) =>{
  return(
<Card  key={i}  bg='light' text='dark' className='text-center' style={{margin:"10px"}}>
<Card.Img variant="top" src={data.countryInfo.flag} style={{height:"180px", width:"80%" , margin:"0 auto"}} />
    <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases: {data.cases}</Card.Text>
      <Card.Text>Deaths: {data.deaths}</Card.Text>
      <Card.Text>Recovered: {data.recovered}</Card.Text>
      <Card.Text>Today's cases: {data.todayCases}</Card.Text>
      <Card.Text>Today's Deaths: {data.todayDeaths}</Card.Text>
      <Card.Text>Active: {data.active}</Card.Text>
      <Card.Text>Critical: {data.critical}</Card.Text>

    </Card.Body>
    <Card.Footer>
      <small >Last updated {lastupdated}</small>
    </Card.Footer>

</Card>


  );
}));

var queries = [{
  columns: 2,
  query: 'min-width: 500px'
}, {
  columns: 3,
  query: 'min-width: 1000px'
}];



  return (
    <div>
     <CardDeck>
  <Card bg='secondary' text='white' className='text-center' style={{margin:"10px"}}>
    
      <Card.Body>
        <Card.Title>Cases</Card.Title>
        <Card.Text>{latest.cases}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small >Last updated {lastupdated}</small>
      </Card.Footer>

  </Card>
  <Card bg='danger' text='white' className='text-center' style={{margin:"10px"}} >
  
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text> {latest.deaths}</Card.Text>
    </Card.Body>

    <Card.Footer>
      <small >Last updated {lastupdated}</small>
    </Card.Footer>
  </Card>
  <Card bg='success' text='white' className='text-center' style={{margin:"10px"}} >

    <Card.Body>
      <Card.Title>Recoverd</Card.Title>
      <Card.Text>{latest.recovered}</Card.Text>
     
      
    </Card.Body>
    <Card.Footer>
      <small >Last updated {lastupdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Search a Country"  onChange={ e => setSearchCountries(e.target.value)}/>
  </Form.Group>
  
</Form>
<Columns queries={queries}  >{countires}</Columns>
    </div>
  );
}

export default App;
