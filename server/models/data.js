const Location = require("./locationSchema");

const countriesData = [
  {
    country: "India",
    states: [
      { name: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli"] },
      { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
    ],
  },
  {
    country: "USA",
    states: [
      {
        name: "California",
        cities: ["Los Angeles", "San Francisco", "San Diego"],
      },
      { name: "New York", cities: ["New York City", "Buffalo", "Rochester"] },
    ],
  },
  {
    country: "Canada",
    states: [
      { name: "Ontario", cities: ["Toronto", "Ottawa", "Hamilton"] },
      { name: "British Columbia", cities: ["Vancouver", "Victoria", "Surrey"] },
    ],
  },
  {
    country: "Australia",
    states: [
      {
        name: "New South Wales",
        cities: ["Sydney", "Newcastle", "Wollongong"],
      },
      { name: "Queensland", cities: ["Brisbane", "Gold Coast", "Cairns"] },
    ],
  },
  {
    country: "Germany",
    states: [
      { name: "Bavaria", cities: ["Munich", "Nuremberg", "Augsburg"] },
      { name: "Berlin", cities: ["Berlin"] },
    ],
  },
  {
    country: "France",
    states: [
      {
        name: "Île-de-France",
        cities: ["Paris", "Versailles", "Boulogne-Billancourt"],
      },
      {
        name: "Provence-Alpes-Côte d'Azur",
        cities: ["Marseille", "Nice", "Toulon"],
      },
    ],
  },
  {
    country: "Japan",
    states: [
      { name: "Tokyo", cities: ["Tokyo", "Shinjuku", "Shibuya"] },
      { name: "Osaka", cities: ["Osaka", "Sakai", "Higashiosaka"] },
    ],
  },
  {
    country: "Brazil",
    states: [
      { name: "São Paulo", cities: ["São Paulo", "Campinas", "Santos"] },
      {
        name: "Rio de Janeiro",
        cities: ["Rio de Janeiro", "Niterói", "Nova Iguaçu"],
      },
    ],
  },
  {
    country: "South Africa",
    states: [
      { name: "Gauteng", cities: ["Johannesburg", "Pretoria", "Soweto"] },
      { name: "Western Cape", cities: ["Cape Town", "Stellenbosch", "Paarl"] },
    ],
  },
  {
    country: "Italy",
    states: [
      { name: "Lombardy", cities: ["Milan", "Bergamo", "Brescia"] },
      { name: "Lazio", cities: ["Rome", "Latina", "Frosinone"] },
    ],
  },
];

async function populateLocationData() {
  try {
    await Location.deleteMany({});
    await Location.insertMany(countriesData);
    console.log("Country, state, and city data added.");
  } catch (error) {
    console.error("Error adding location data:", error);
  }
}

module.exports = { populateLocationData };
