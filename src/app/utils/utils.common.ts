export const getBrokersList = {
    'default': 'Default',
    'amera': 'Amera',
    'abcinsurance': 'Abc Insurance',
    'americanLogistics': 'American Logistics',
    'arn': 'Angel Ride Network',
    'access2Ride': 'Access2Care',
    'callthecar': 'Call The Car',
    'caloptima': 'CalOptima',
    'epic': 'EPIC',
    'iehp': 'IEHP',
    'lcp': 'LCP',
    'logisticscare': 'Logisticare',
    'medex': 'Medex',
    'first': 'MTM',
    'mas': 'MAS',
    'medicaid': 'Medicaid',
    'modivcare': 'Modivcare',
    'medtrans': 'NMN',
    'onecall': 'One Call',
    'ride2md': 'Ride2MD',
    'united': 'Southeastrans',
    'saferide': 'Safe Ride',
    'tncarrier': 'Tennessee Carriers',
    'welltrans': 'Welltrans',
    'vapremier': 'Va Premier',
    'veyo': 'Veyo', 
    'providearide' : 'Provide A Ride',
    'wellmed' : 'WellMed',
  };

  export const getShiftDays = [
    { label: "Mon", day: 1 },
    { label: "Tue", day: 2 },
    { label: "Wed", day: 3 },
    { label: "Thu", day: 4 },
    { label: "Fri", day: 5 },
    { label: "Sat", day: 6 },
    { label: "Sun", day: 0 }
  ];

  
export const CAPACITY: any = ['1', '2', '3', '4', '5', '6', '7'];

export const FUELTYPES: any = [
  { value: "petrol", key: "Petrol" },
  { value: "diesel", key: "Diesel" },
  { value: "octane", key: "HighOctane" },
  { value: "hybrid", key: "Hybrid" },
  { value: "ev", key: "EV" }
];

export const BODYTYPES: any = [
  { value: "minicut", key: "Mini Cut" },
  { value: "fullcut", key: "Full Cut" }
];

export function getAddressDetails(locationData:any) {
  let address: any = {
    aptOrSuite:'',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  };
  locationData.address_components.forEach((component:any) => {
    if (component.types.includes("street_number")) {
      address.street = component.long_name;
    } else if (component.types.includes("route")) {
      address.street = address.street ? address.street+" " + component.long_name : component.long_name;
    } else if (component.types.includes("subpremise")) {
      address.aptOrSuite = "#"+ component.long_name;
    }  else if (component.types.includes("locality")) {
      address.city = component.long_name;
    } else if (component.types.includes("administrative_area_level_1")) {
      address.state = component.short_name;
    } else if (component.types.includes("postal_code")) {
      address.zipCode = component.long_name;
    }
  });

  return address;
}
