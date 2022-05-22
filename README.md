# Avalanche NFT collection Decentralization/Market Activity score
***
## Methodology
_Data is fetched from Covalent API, who in turns fetches data from specific marketplaces -more info [on their docs](https://www.covalenthq.com/docs/api/#/0/Get%20NFT%20market%20global%20view/USD/1)_

Market Activity score = Collection All-Time Transaction Count / Unique TokenIDs All-Time Sales Count
Decentralization score = Unique Wallet All-Time Purchase Count / Unique TokenIDs All-Time Sales Count

**NOTE: All-Time refers to the starting point of Covalent performing data archiving on Avalanche, which is 03/04**

***

## Usage
Select any collections you want to calculate Decentralization & Market Activity scores for. App loads up top 10 collections by Total Transaction Count

***

## Installation

`npm install --force`
`npm start`