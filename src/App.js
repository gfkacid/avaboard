import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { NFTChart } from "./components/NFTChart";
import "./styles.css";

export default function App() {

  const [collections,setCollections] = useState({});
  const [NFTChartData,SetNFTChartData] = useState({});
  const [selectOptions, setSelectOptions] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchNFTCollectionsData = async() => {
    const url = "https://api.covalenthq.com/v1/43114/nft_market/?key="+process.env.REACT_APP_COVALENT_KEY+"&format=JSON&page-size=1000"
    const res = await fetch(url);
    const data = await res.json();
    let calculatedData = [];
    let options = [];
    // sort by transaction count all time
    data.data.items.sort((a,b) => b.transaction_count_alltime - a.transaction_count_alltime);
    setCollections(data.data.items)
    // calculate {x,y} for each collection
    data.data.items.slice(0,10).forEach(collection => {
      calculatedData.push(formatCollectionData(collection))
    });
    data.data.items.forEach((collection,i) => {
      options.push({value: i, label: collection.collection_name})
    })
    console.log(calculatedData);
    SetNFTChartData(calculatedData);
    setSelectOptions(options)
  }
  
  const formatCollectionData = (collection) => {
    let nftimg = 'circle'
    if(collection.first_nft_image !== null){
      nftimg = new Image(80,80)
      nftimg.src = collection.first_nft_image
      
    }
    const data = {
      label: collection.collection_name,
      pointStyle: nftimg,
      data: [
        {
          x: parseFloat(((collection.transaction_count_alltime / collection.unique_token_ids_sold_count_alltime) - 1).toFixed(2)) * 100,
          y: parseFloat((collection.unique_wallet_purchase_count_alltime/collection.unique_token_ids_sold_count_alltime).toFixed(2)) * 100
        }
      ]
      
    }
    return data
  }

  const collectionListUpdated = (selections) => {
    setSelected(selections)
    let chartData = [];
    selections.forEach((selection) => {
      chartData.push(formatCollectionData(collections[selection.value]))
    })
    SetNFTChartData(chartData)
  }

  useEffect(() => {
    fetchNFTCollectionsData();
  }, []);

  return (
    <div className="App">
      <div>
        <h2>NFT Collection Decentralization / Market Activity Score</h2>
        <p>
          Select any collections you want to calculate Decentralization &amp; Market Activity scores for.<br></br>
          App loads up with top 10 collections by Total Transaction Count
        </p>
      </div>

      <MultiSelect
          options={selectOptions}
          value={selected}
          onChange={collectionListUpdated}
          labelledBy="Select"
        />
      {NFTChartData.length > 0 && 
      <div>
        <NFTChart chartData={NFTChartData}/>
      </div>
      }
    </div>
  );
}
