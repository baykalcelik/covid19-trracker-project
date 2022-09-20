import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Statistics from './components/Statistics';
import GlobalStatistics from './components/GlobalStatistics';







function App() {

  const [ulkeler, setUlkeler] = useState([]);

  const [infected, setInfected] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [tarih, setTarih] = useState("");

  const [global, setGlobal] = useState(false);
  const [country, setCountry] = useState(false);

  const [globalData, setGlobalData] = useState([{tarih:"", toplamInfected:0, toplamDeaths:0 }])

  const [countryData, setCountryData] = useState([
      {
        name: 'Infected',
        Infected: 0,
      },
      {
        name: 'Recovered',
        Recovered: 0,
      },
      {
        name: 'Deaths',
        Deaths: 0,
      },
    ]
  );


  async function getData(url, fonktarih){
    let veri = await fetch(url + fonktarih);
    let data = await veri.json();
    return data;
  }

  async function createData(){

    let globalVeri = [];
    // let bugun = new Date().getDate() - 2;
    let bugun = 1;
    let fonktarih="";
    let buay = parseInt(new Date().getMonth() + 1);
    let buyil = parseInt(new Date().getFullYear());
    
    // console.log("bu ay: ", buay);
    // console.log("bu yıl: ", buyil);

    for(let x = 0; x < 12; x++ ){
      if(buay - x === 0) {buay = 12 + buay; buyil = buyil - 1;} 
      fonktarih = (buay - x)  + "-" + bugun + "-" + buyil;

      let verimiz = await getData("https://covid19.mathdro.id/api/daily/", fonktarih);
      // console.log("asyncden gelen verimiz : ", verimiz);
        let toplamInfected = 0;
        let toplamDeaths = 0;
        for(let y = 0; y < verimiz.length; y++){
          toplamInfected += parseInt(verimiz[y].confirmed);
          toplamDeaths += parseInt(verimiz[y].deaths);
        }
        // console.log("for içindeki fonktarih : ", fonktarih);
        
        globalVeri.push({tarihx:fonktarih, toplamInfected:toplamInfected, toplamDeaths:toplamDeaths });
        setGlobalData([...globalVeri]);
    }
    
    // console.log("fonksiyonun içindeki veri : ", globalVeri);
    return globalVeri;
    }

    




  useEffect(()=>{
      fetch("https://covid19.mathdro.id/api").then(res=>res.json()).then(result=>{
          fetch(""+result.countries).then(res=>res.json()).then(result=>{
            setUlkeler([...result.countries]);
            // console.log("ülkeler : ",  ulkeler);
          });
      });
  }, []);



  return (
    <div className="App">
        <img className="mainPicture" src={require(""+'./components/image.png')} alt="alternate"/>

        <div className='cards'>
        <Card statType="Infected" recordAnnounced={infected} actualDate={tarih}/>
        <Card statType="Recovered" recordAnnounced={recovered} actualDate={tarih}/>
        <Card statType="Deaths" recordAnnounced={deaths} actualDate={tarih}/>
        
        </div>

        <select className="ulkeler" defaultValue="global"  onChange={(ev)=>{

          if(ev.target.value === "global") {
              // console.log("global seçildi");

            fetch("https://covid19.mathdro.id/api/").then(res=>res.json()).then(res=>{

              console.log(res);
              setInfected(res.confirmed.value);
              setRecovered(res.recovered.value);
              setDeaths(res.deaths.value);
              setTarih(new Date(res.lastUpdate).toLocaleDateString() );

              let veri = createData();
              // console.log("createdata dan gelen veri : ", veri);
              // setGlobalData([...veri]);
              // console.log("setGlobalData dan sonra globalData : ", globalData);
              setGlobal(true); setCountry(false);
            });
              


          }else{
            // console.log("ülke seçildi");

            setGlobal(false); setCountry(true);
            // console.log("istek url : ", "https://covid19.mathdro.id/api/countries/" + ev.target.value);

            fetch("https://covid19.mathdro.id/api/countries/" + ev.target.value).then(res=>res.json()).then(res=>{

              setInfected(res.confirmed.value);
              setRecovered(res.recovered.value);
              setDeaths(res.deaths.value);
              setTarih(new Date(res.lastUpdate).toLocaleDateString() );

              setCountryData([
                {
                  name: 'Infected',
                  Infected: res.confirmed.value,
                },
                {
                  name: 'Recovered',
                  Recovered: res.recovered.value,
                },
                {
                  name: 'Deaths',
                  Deaths: res.deaths.value,
                },
              ])


          
            });
          }
          // console.log("seçilen ülke : ", ev.target.value);
          // console.log("country : ", country.toString()); 
          // console.log("global : ", global.toString());

          
          }}>
          <option value="global">Global</option>
          {ulkeler.map((item, index)=> <option className='options' key={index} value={item.name}>{item.name}</option>  )}
        </select>

        <div className='chartArea'>
        {country && <Statistics data={countryData}/>}
        {global && <GlobalStatistics globalData={globalData}/>}
        </div>
        

    </div>
  );
}

export default App;
