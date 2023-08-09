import { configApiDataConvertor, ConvertToAcplPayload, ConvertToPayoutPayload, ConvertToCommissionPayload, converFetchedAcplData } from "./dataFormat"
import mockPolicies from "./policiesData.json"
import mockCertficate from "./certificateData.json"
import mockTransaction from "./paymentData.json"
import mockTickets from './cancelTickets.json'
import mockRefunds from './refundPolicies.json'

const statesList = [
  { label: "U.P.", value: "Uttar Pradesh" },
  { label: "Haryana", value: "Haryana" },
  { label: "Punjab", value: "Punjab" },
  { label: "Bihar", value: "Bihar" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Telangana", value: "Telangana" },
  { label: "Kerala", value: "Kerala" },
  { label: "Assam", value: "Assam" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Kolkata", value: "Kolkata" }
]

const cities = {
  UttarPradesh: [
    { label: "Lucknow", value: "Lucknow" },
    { label: "Prayagraj", value: "Prayagraj" },
    { label: "Kanpur", value: "Kanpur" },
    { label: "Agra", value: "Agra" },
    { label: "Bareli", value: "Bareli" }
  ],
  Haryana: [
    { label: "Gurugram", value: "Gurugram" },
    { label: "Faridabad", value: "Faridabad" },
    { label: "Rohtak", value: "Rohtak" },
    { label: "Hisar", value: "Hisar" },
    { label: "Ambala", value: "Ambala" }
  ],
  Punjab: [
    { label: "Amritsar", value: "Amritsar" },
    { label: "Ludhiana", value: "Ludhiana" },
    { label: "Jalandhar", value: "Jalandhar" },
    { label: "Kapurthala", value: "Kapurthala" },
    { label: "Bathinda", value: "Bathinda" }
  ],
  Bihar: [
    { label: "Patna", value: "Patna" },
    { label: "Darbhanga", value: "Darbhanga" },
    { label: "Gaya", value: "Gaya" },
    { label: "Katihar", value: "Katihar" },
    { label: "Muzaffarpur", value: "Muzaffarpur" }
  ],
  MadhyaPradesh: [
    { label: "Jabalpur", value: "Jabalpur" },
    { label: "Indore", value: "Indore" },
    { label: "Bhopal", value: "Bhopal" },
    { label: "Seoni", value: "Seoni" },
    { label: "Gwalior", value: "Gwalior" }
  ],
  Telangana: [
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Warangal", value: "Warangal" },
    { label: "Karimnagar", value: "Karimnagar" },
    { label: "Nalgonda", value: "Nalgonda" },
    { label: "Nizamabad", value: "Nizamabad" }
  ],
  Kerala: [
    { label: "Kochi", value: "Kochi" },
    { label: "Thrisar", value: "Thrisar" },
    { label: "Kollam", value: "Kollam" },
    { label: "Kannur", value: "Kannur" },
    { label: "Kottayam", value: "Kottayam" }
  ]
}

const states = [
  { label: "U.P.", value: "UttarPradesh" },
  { label: "Haryana", value: "Haryana" },
  { label: "Punjab", value: "Punjab" },
  { label: "Bihar", value: "Bihar" },
  { label: "Madhya Pradesh", value: "MadhyaPradesh" },
  { label: "Telangana", value: "Telangana" },
  { label: "Kerala", value: "Kerala" }
]

const statesListDB = [
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "Haryana", value: "Haryana" },
  { label: "Punjab", value: "Punjab" },
  { label: "Bihar", value: "Bihar" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Telangana", value: "Telangana" },
  { label: "Kerala", value: "Kerala" },
  { label: "Delhi", value: "Delhi" },
  { label: "Uttrakhand", value: "Uttrakhand" },
  { label: "Assam", value: "Assam" },
  { label: "Arunchal Pradesh", value: "Arunchal Pradesh" },
  { label: "Karnataka", value: "Karnataka" }
]

//! Make Errors In Bulk End

const globalTestingDealerList = [
  {
    id: 16,
    oem_id: 59,
    acpl_team_id: null,
    name: "Tezzz HERO-MOTO",
    dealer_type: "DEALER",
    email: "afsaklkl@aegis.com",
    mobile: "9778342490",
    city: "Bangalore",
    state: "Karnataka",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: null,
    dealership_wallet_id: 33,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-24T07:17:25.000Z",
    updated_at: "2023-05-24T07:17:25.000Z"
  },
  {
    id: 15,
    oem_id: 59,
    acpl_team_id: null,
    name: "Nav TVS",
    dealer_type: "DEALER",
    email: "asfafxss@aegis.com",
    mobile: "9778342490",
    city: "Kerala",
    state: "Kerala",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: null,
    dealership_wallet_id: 31,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-24T07:07:23.000Z",
    updated_at: "2023-05-24T07:07:23.000Z"
  },
  {
    id: 14,
    oem_id: 59,
    acpl_team_id: null,
    name: "Iron Bajaj",
    dealer_type: "DEALER",
    email: "asfafs@aegis.com",
    mobile: "9778342490",
    city: "Panchkula",
    state: "Punjab",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: null,
    dealership_wallet_id: 30,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-24T07:00:58.000Z",
    updated_at: "2023-05-24T07:00:58.000Z"
  },
  {
    id: 13,
    oem_id: 59,
    acpl_team_id: null,
    name: "Foo Honda",
    dealer_type: "DEALER",
    email: "afshjva@aegis.com",
    mobile: "9778342490",
    city: "Bareli",
    state: "Uttar Pradesh",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: null,
    dealership_wallet_id: 0,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-24T06:09:07.000Z",
    updated_at: "2023-05-24T06:09:07.000Z"
  },
  {
    id: 12,
    oem_id: 59,
    acpl_team_id: null,
    name: "ABC Suzuki",
    dealer_type: "DEALER",
    email: "afshva@aegis.com",
    mobile: "9778342490",
    city: "Indore",
    state: "Madhya Pradesh",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: null,
    dealership_wallet_id: 0,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-24T06:07:11.000Z",
    updated_at: "2023-05-24T06:07:11.000Z"
  }
]

const globalTestingSubDealerList = [
  {
    id: 11,
    oem_id: 59,
    acpl_team_id: null,
    name: "Tan Vespa",
    dealer_type: "SUB-DEALER",
    email: "sadasd@aegis.com",
    mobile: "9778342490",
    city: "Kolkata",
    state: "Kolkata",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: 1,
    dealership_wallet_id: 0,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-19T07:00:01.000Z",
    updated_at: "2023-05-19T07:00:01.000Z"
  },
  {
    id: 10,
    oem_id: 59,
    acpl_team_id: null,
    name: "Yin Royal Enfield",
    dealer_type: "SUB-DEALER",
    email: "oluf@aegis.com",
    mobile: "9778342490",
    city: "Katihar",
    state: "Bihar",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: 1,
    dealership_wallet_id: 0,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-16T12:20:53.000Z",
    updated_at: "2023-05-16T12:20:53.000Z"
  },
  {
    id: 8,
    oem_id: 59,
    acpl_team_id: null,
    name: "Pre Jawa",
    dealer_type: "SUB-DEALER",
    email: "hasf@aegis.com",
    mobile: "9778342490",
    city: "Delhi",
    state: "Delhi",
    address: "Place some",
    pincode: "112212",
    master_dealership_id: 1,
    dealership_wallet_id: 0,
    payout_type: "FULL PAY",
    distributor_id: 3,
    rto_id: 1,
    is_deleted: 0,
    created_at: "2023-05-16T12:13:39.000Z",
    updated_at: "2023-05-16T12:13:39.000Z"
  }
]

const soloTxList = [
  { sender: "Tez HERO", receiver: "Foo Hero", status: 1, date: "23/05/2023", txType: 1 },
  { sender: "Tez HERO", receiver: "Aryan Hero", status: 2, date: "23/05/2023", txType: 2 },
  { sender: "Tez HERO", receiver: "Nav HERO_MOTO", status: 3, date: "23/05/2023", txType: 3 },
  { sender: "Tez HERO", receiver: "PreHero", status: 2, date: "23/05/2023", txType: 3 },
  { sender: "Tez HERO", receiver: "TanHero", status: 3, date: "23/05/2023", txType: 2 },
  { sender: "Tez HERO", receiver: "Tezzz Moto", status: 1, date: "23/05/2023", txType: 1 },
  { sender: "Tez HERO", receiver: "PWN HERO", status: 2, date: "23/05/2023", txType: 1 },
  { sender: "Tez HERO", receiver: "TanHero", status: 3, date: "23/05/2023", txType: 2 },
  { sender: "Tez HERO", receiver: "Tezzz Moto", status: 1, date: "23/05/2023", txType: 1 },
  { sender: "Tez HERO", receiver: "PWN HERO", status: 2, date: "23/05/2023", txType: 1 }
]

const accessToken = "eyJraWQiOiJIS09XK2dJaGJSNFVjQTNzZUk4RmJHdnByUzVQekJ5bERvQlZxMUl6TGRNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YWYwYmEyMi1jMGRmLTRhZTMtYWUwZS1kNGI2YWM4NTQxZDEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX0F3UWd0bnlrOSIsImNsaWVudF9pZCI6IjdhcGVtZGJuMTUyMzcxZGxoaGIyazJpcjFzIiwib3JpZ2luX2p0aSI6ImU2YzZiZTU3LTkzNDktNGFkMS1hZjc4LTFhODM5MzE3MWU4NSIsImV2ZW50X2lkIjoiNWE0NjUyZmEtMjU4My00ZWFjLWI1YTQtZmI0YzdhZDkyYzdlIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY5MDc0MjYwMiwiZXhwIjoxNjkwODI5MDAyLCJpYXQiOjE2OTA3NDI2MDIsImp0aSI6ImJlZDJmMmM3LWZkY2ItNGM3OS1iYWVhLTYzNDVhOTllMzA2MCIsInVzZXJuYW1lIjoiOWFmMGJhMjItYzBkZi00YWUzLWFlMGUtZDRiNmFjODU0MWQxIn0.OrtN_eFbdMmZ3LuSEi6hWx_o6DUe4AnVrrojXaKTQR9cXlAAqlivDQDeE0YO_DztDDHkN4uQWmDWH1VceMVWntWjB0IUujjM_D5EU8yV4D6hfpqS263xos8GfLecK_JovrvT4ghundK0ahsDG1D84CcptOTQH-rAABCqsWOP1AUe7s4D1hu5q4NJMpWT8uVRlV_xJ9IAXwfrSJPSYp99zuPb5iotodU6SjaQxEGClULvYMma6PK_SJM46x7NddtzK0PHp3lhCaYEg-pvPCQ8yx1NawIJ0VafDLmjdVWNWiXdpdqSrJmddHFHLNcxIj0QkxpACS65ocSxmH4Dp4pt7w"

export {
  statesListDB,
  accessToken,
  configApiDataConvertor,
  mockPolicies,
  mockCertficate,
  mockTransaction,
  mockTickets,
  mockRefunds,
  statesList,
  states,
  cities,
  globalTestingDealerList,
  globalTestingSubDealerList,
  soloTxList,
  ConvertToAcplPayload,
  ConvertToPayoutPayload,
  ConvertToCommissionPayload,
  converFetchedAcplData
}
