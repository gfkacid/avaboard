import { Scatter } from 'react-chartjs-2';

const options = {
    scales: {
        x: {
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Market Activity score'
            }
        },
        y: {
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Decentralization score'
            }
        }
    },
    plugins: {
        title: {
          display: true,
          text: "Avalanche NFT Collections"
        },
        legend: {
          display: true,
          position: "bottom"
        }
      }
}

export const NFTChart = ({ chartData }) => {
    return (
      <div>
        <Scatter options={options} data={{datasets:chartData}}/>
    </div>
    );
};