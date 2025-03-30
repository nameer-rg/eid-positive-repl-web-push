
export interface DestinationType {
  region: string;
  title: string;
  image: string;
  description: string;
}

export const destinations: DestinationType[] = [
  {
    region: "lakshadweep",
    title: "Lakshadweep",
    image: "https://images.unsplash.com/photo-1572025310208-2fd6b91764c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrc2hhZHdlZXB8ZW58MHwwfDB8fHww",
    description: "Paradise where nature thrives"
  },
  {
    region: "kashmir",
    title: "Kashmir",
    image: "https://images.unsplash.com/photo-1627894485229-ff2c619723e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fEthc2htaXJ8ZW58MHwwfDB8fHww",
    description: "Heaven where beauty lives"
  },
  {
    region: "thailand",
    title: "Thailand",
    image: "https://images.unsplash.com/photo-1572529593091-6c05c37cacc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRoYWlsYW5kfGVufDB8MHwwfHx8MA%3D%3D",
    description: "Land of smiles and adventure"
  },
  {
    region: "singapore",
    title: "Singapore",
    image: "https://images.unsplash.com/photo-1580438816338-969175d4b367?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNpbmdhcG9yZXxlbnwwfDB8MHx8fDA%3D",
    description: "City where innovation blooms"
  },
  {
    region: "middle-east",
    title: "Middle East",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
    description: "Where tradition meets luxury"
  },
  {
    region: "india",
    title: "India",
    image: "https://images.unsplash.com/photo-1519998994457-43c1f2c8460b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGluZGlhfGVufDB8MHwwfHx8MA%3D%3D",
    description: "Country of culture and diversity"
  }
];
