import React from "react"
import { Table } from 'semantic-ui-react'



export const OilDilutions = () => {
const oil_dilutions= [
  {   "oil_liquid_amount": "1 tsp",   "fl_oz": "1/16 fl oz",   "dilute_2_5": "2-3 drops",   "dilute_5": "4-6 drops" },
  {   "oil_liquid_amount": "1 tbsp",   "fl_oz": "1/2 fl oz",   "dilute_2_5": "7-8 drops",   "dilute_5": "14-16 drops" },
  {   "oil_liquid_amount": "2 tbsp",   "fl_oz": "1 fl oz",   "dilute_2_5": "15 drops",   "dilute_5": "30 drops" },
  {   "oil_liquid_amount": "1 cup",   "fl_oz": "8 fl oz",   "dilute_2_5": "1/5 fl oz",   "dilute_5": "2/5 fl oz" },
  {   "oil_liquid_amount": "1 pint",   "fl_oz": "16 fl oz",   "dilute_2_5": "2/5 fl oz",   "dilute_5": "4/5 fl oz" },
  {   "oil_liquid_amount": "1 quart",   "fl_oz": "32 fl oz",   "dilute_2_5": "4/5 fl oz",   "dilute_5": "1 3/5 fl oz" }
]
const TableRows = () => {
  return  oil_dilutions.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.oil_liquid_amount}</Table.Cell>
      <Table.Cell>{item.fl_oz}</Table.Cell>
      <Table.Cell>{item.dilute_2_5}</Table.Cell>
      <Table.Cell>{item.dilute_5}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Amount of Carrier Oil or Other Liquid</Table.HeaderCell>
          <Table.HeaderCell>Fluid Ounces</Table.HeaderCell>
          <Table.HeaderCell>Amount of Essential Oils for 2.5% Dilution</Table.HeaderCell>
          <Table.HeaderCell>Amount of Essential Oils for 5% Dilution</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}
    
export const StandardWeightToVolume = () => {
const standard_weight_to_volume= [
  {   "potency": "1:2",   "onces_herb_perM_qrt": 16,   "strength": "very strong" },
  {   "potency": "1:4",   "onces_herb_perM_qrt": 8,   "strength": "strong" },
  {   "potency": "1:5",   "onces_herb_perM_qrt": 6.4,   "strength": "standard" },
  {   "potency": "1:6",   "onces_herb_perM_qrt": 5.2,   "strength": "weak" },
  {   "potency": "1:10",   "onces_herb_perM_qrt": 1.6,   "strength": "very weak, often used for toxic botanicals" }
]
const TableRows = () => {
  return  standard_weight_to_volume.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.potency}</Table.Cell>
      <Table.Cell>{item.onces_herb_perM_qrt}</Table.Cell>
      <Table.Cell>{item.strength}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Potency</Table.HeaderCell>
          <Table.HeaderCell>Ounces of Herb to Add per Quart of Menstruum</Table.HeaderCell>
          <Table.HeaderCell>Strength</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
  
}
    
export const SolventWeights = () => {
const solvent_weights= [
  {   "substance": "Water",   "weight_per_gallon": "8 lb (128 fl oz or 16 cups)",   "weight_per_quart": "2 lb (32 fl oz or 4 cups)",   "weight_per_pint": "1 lb (16 fl oz or 2 cups)" },
  {   "substance": "Alcohol",   "weight_per_gallon": "8 lb (128 fl oz)",   "weight_per_quart": "2 lb (32 fl oz)",   "weight_per_pint": "1 lb (16 fl oz)" },
  {   "substance": "Vinegar",   "weight_per_gallon": "8.4 lb",   "weight_per_quart": "2.1 lb",   "weight_per_pint": "1.05 lb" },
  {   "substance": "Glycerin",   "weight_per_gallon": "10.5 lb",   "weight_per_quart": "2.51 lb",   "weight_per_pint": "1.25 lb" },
  {   "substance": "Olive Oil",   "weight_per_gallon": "7.6 lb",   "weight_per_quart": "1.9 lb",   "weight_per_pint": ".95 lb" }
]
const TableRows = () => {
  return  solvent_weights.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.substance}</Table.Cell>
      <Table.Cell>{item.weight_per_gallon}</Table.Cell>
      <Table.Cell>{item.weight_per_quart}</Table.Cell>
      <Table.Cell>{item.weight_per_pint}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Substance</Table.HeaderCell>
          <Table.HeaderCell>Weight per Gallon</Table.HeaderCell>
          <Table.HeaderCell>Weight per Quart</Table.HeaderCell>
          <Table.HeaderCell>Weight per Pint</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const Weight2Volume18 = () => {
const w_to_v_18= [
  {   "amount_of_herb": "1 oz",   "amount_of_menstruum": "8 oz (1 cup)" },
  {   "amount_of_herb": "1 lb",   "amount_of_menstruum": "8 lbs (1 gallon)" },
  {   "amount_of_herb": "100 kg",   "amount_of_menstruum": "800 liters" },
  {   "amount_of_herb": "1 kg",   "amount_of_menstruum": "8 liters" }
 ]
 const TableRows = () => {
  return  w_to_v_18.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.amount_of_herb}</Table.Cell>
      <Table.Cell>{item.amount_of_menstruum}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Amount of Herb</Table.HeaderCell>
          <Table.HeaderCell>Amount of Menstruum</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const HerbsSolvents = () => {
 const herbs_solvents= [
  {   "herbs": "Aromatic Herbs (essential oils)",   "water": "Fair",   "alcohol": "Good",   "glycerin": "Excellent",   "vinegar": "Good",   "oil": "Excellent" },
  {   "herbs": "Pungent Herbs (alkamindes)",   "water": "Fair",   "alcohol": "Excellent",   "glycerin": "Excellent",   "vinegar": "Good",   "oil": "Excellent" },
  {   "herbs": "Pungent or Resinous Herbs (resins) ",   "water": "Poor",   "alcohol": "Excellent",   "glycerin": "Fair to Good",   "vinegar": "Poor",   "oil": "Excellent" },
  {   "herbs": "Aromatic Bitters (sesquiterpene lactones and triterpenes)",   "water": "Good",   "alcohol": "Excellent",   "glycerin": "Poor to Fair",   "vinegar": "Poor",   "oil": "Poor" },
  {   "herbs": "Simple (nonalkaloidal) Bitters (diterpenes, glycosides) ",   "water": "Good",   "alcohol": "Excellent",   "glycerin": "Fair to Good",   "vinegar": "Poor",   "oil": "Poor" },
  {   "herbs": "Alkaloidal Bitters (alkaloids)",   "water": "Good",   "alcohol": "Good",   "glycerin": "Fair to Good",   "vinegar": "Good",   "oil": "Poor" },
  {   "herbs": "Acrid Herbs (resins, alkaloids)",   "water": "Good",   "alcohol": "Excellent",   "glycerin": "Good",   "vinegar": "Fair",   "oil": "Poor" },
  {   "herbs": "Astringent Herbs (tannins)",   "water": "Good",   "alcohol": "Fair",   "glycerin": "Excellent",   "vinegar": "Fair",   "oil": "Fair" },
  {   "herbs": "Salty Herbs (minerals)",   "water": "Excellent",   "alcohol": "Poor",   "glycerin": "Fair",   "vinegar": "Poor to Fair",   "oil": "Poor" },
  {   "herbs": "Sweet or Tonic Herbs (polysaccharides, sapons, glycosides)",   "water": "Excellent",   "alcohol": "Good",   "glycerin": "Good",   "vinegar": "Poor",   "oil": "Poor" },
  {   "herbs": "Demulcent Herbs (mucilage and gums)",   "water": "Good",   "alcohol": "Poor",   "glycerin": "Fair",   "vinegar": "Poor",   "oil": "Fair" },
  {   "herbs": "Sour Herbs (organic acids)",   "water": "Good",   "alcohol": "Good",   "glycerin": "Excellent",   "vinegar": "Fair",   "oil": "Poor" },
  {   "herbs": "OilyHerbs (oils)",   "water": "Poor",   "alcohol": "Fair",   "glycerin": "Fair",   "vinegar": "Poor",   "oil": "Excellent" }
 ]
 const TableRows = () => {
  return  herbs_solvents.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.herbs}</Table.Cell>
      <Table.Cell>{item.water}</Table.Cell>
      <Table.Cell>{item.alcohol}</Table.Cell>
      <Table.Cell>{item.glycerin}</Table.Cell>
      <Table.Cell>{item.vinegar}</Table.Cell>
      <Table.Cell>{item.oil}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Herbs</Table.HeaderCell>
          <Table.HeaderCell>Water</Table.HeaderCell>
          <Table.HeaderCell>Alcohol</Table.HeaderCell>
          <Table.HeaderCell>Glycerin</Table.HeaderCell>
          <Table.HeaderCell>Vinegar</Table.HeaderCell>
          <Table.HeaderCell>Oil</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const AgeDosageChart = () => {
  const age_dosages = [
    {   "age": "1 month old",   "recommended_daily_dosage": "1/18 - 1/14 of adult dose",   "fine_granules": "0.3 - 0.4 grams",   "capsules": "N/R*" },
    {   "age": "1 - 6 month old",   "recommended_daily_dosage": "1/14 - 1/7 of adult dose",   "fine_granules": "0.4 - 0.9 grams",   "capsules": "N/R*" },
    {   "age": "6 - 12 month old",   "recommended_daily_dosage": "1/7 - 1/5 of adult dose",   "fine_granules": "0.9 - 1.2 grams",   "capsules": "N/R*" },
    {   "age": "1 - 2 years old",   "recommended_daily_dosage": "1/5 - 1/4 of adult dose",   "fine_granules": "1.2 - 1.5 grams",   "capsules": "N/R*" },
    {   "age": "2 - 4 years old",   "recommended_daily_dosage": "1/4 - 1/3 of adult dose",   "fine_granules": "1.5 - 2.0 grams",   "capsules": "N/R*" },
    {   "age": "4 - 6 years old",   "recommended_daily_dosage": "1/3 - 2/5 of adult dose",   "fine_granules": "2.0 - 2.4 grams",   "capsules": "N/R*" },
    {   "age": "6 - 9 years old",   "recommended_daily_dosage": "2/5 - 1/2 of adult dose",   "fine_granules": "2.4 - 3.0 grams",   "capsules": "5 - 6 capsules**" },
    {   "age": "9 - 14 years old",   "recommended_daily_dosage": "1/2 - 2/3 of adult dose",   "fine_granules": "3.0 - 4.0 grams",   "capsules": "6 - 8 capsules**" },
    {   "age": "14 - 18 years old",   "recommended_daily_dosage": "2/3 - full adult dose",   "fine_granules": "4.0 - 6.0 grams",   "capsules": "8 - 12 capsules**" },
    {   "age": "18 - 60 years old",   "recommended_daily_dosage": "adult dose",   "fine_granules": "6.0 grams",   "capsules": "12 capsules**" },
    {   "age": "60 years old and over",   "recommended_daily_dosage": "3/4 of adult dose or less",   "fine_granules": "4.5 - 6.0 grams",   "capsules": "9 - 12 capsules**" }
  ]

  const TableRows = () => {
    return  age_dosages.map((item) =>(
      <Table.Row>
        <Table.Cell>{item.age}</Table.Cell>
        <Table.Cell>{item.recommended_daily_dosage}</Table.Cell>
        <Table.Cell>{item.fine_granules}</Table.Cell>
        <Table.Cell>{item.capsules}</Table.Cell>
      </Table.Row>
    ))
  }

    return (
        <>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Recommended Daily Dosage</Table.HeaderCell>
            <Table.HeaderCell>Fine Granules</Table.HeaderCell>
            <Table.HeaderCell>Capsules</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <TableRows />
        </Table.Body>
        </Table>
        <p>* N/R: Not Recommend for infants and young children since they may have difficulty swallowing.</p>
        <p>** Each capsule weighs 500 mg or 0.5 gram.</p>
        </>
    )
}

export const WeightDosageChart = () => {
  const weight_dosage= [
    {   "weight": "30 - 40 lbs",   "recommended_daily_dosage": "20% - 27% of adult dose",   "fine_granules": "1.2 - 1.6 grams",   "capsules": "N/R*" },
    {   "weight": "40 - 50 lbs",   "recommended_daily_dosage": "27% - 33% of adult dose",   "fine_granules": "1.6 - 1.9 grams",   "capsules": "N/R*" },
    {   "weight": "50 - 60 lbs",   "recommended_daily_dosage": "33% - 40% of adult dose",   "fine_granules": "1.9 - 2.4 grams",   "capsules": "N/R*" },
    {   "weight": "60 - 70 lbs",   "recommended_daily_dosage": "40% - 47% of adult dose",   "fine_granules": "2.4 - 2.8 grams",   "capsules": "N/R*" },
    {   "weight": "70 - 80 lbs",   "recommended_daily_dosage": "47% - 53% of adult dose",   "fine_granules": "2.8 - 3.2 grams",   "capsules": "5 - 6 capsules**" },
    {   "weight": "80 - 100 lbs",   "recommended_daily_dosage": "53% - 67% of adult dose",   "fine_granules": "3.2 - 4.0 grams",   "capsules": "6 - 8 capsules**" },
    {   "weight": "100 - 120 lbs",   "recommended_daily_dosage": "67% - 80% of adult dose",   "fine_granules": "4.0 - 4.8 grams",   "capsules": "8 - 10 capsules**" },
    {   "weight": "120 - 150 lbs",   "recommended_daily_dosage": "80% - 100% of adult dose",   "fine_granules": "4.8 - 6.0 grams",   "capsules": "10 - 12 capsules**" },
    {   "weight": "150 lbs",   "recommended_daily_dosage": "adult dose",   "fine_granules": "6.0 grams",   "capsules": "12 capsules**" },
    {   "weight": "150 - 200 lbs",   "recommended_daily_dosage": "100% - 133% of adult dose",   "fine_granules": "6.0 - 7.9 grams",   "capsules": "12 - 16 capsules**" },
    {   "weight": "200 - 250 lbs",   "recommended_daily_dosage": "133% - 167% of adult dose",   "fine_granules": "7.9 - 10.0 grams",   "capsules": "16 - 20 capsules**" },
    {   "weight": "250 - 300 lbs",   "recommended_daily_dosage": "167% - 200% of adult dose",   "fine_granules": "10.0 - 12.0 grams",   "capsules": "20 - 24 capsules**" }
  ]

  const TableRows = () => {
    return  weight_dosage.map((item) =>(
      <Table.Row>
        <Table.Cell>{item.weight}</Table.Cell>
        <Table.Cell>{item.recommended_daily_dosage}</Table.Cell>
        <Table.Cell>{item.fine_granules}</Table.Cell>
        <Table.Cell>{item.capsules}</Table.Cell>
      </Table.Row>
    ))
  }
    return (
        <>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Weight (lbs.)</Table.HeaderCell>
            <Table.HeaderCell>Recommended Daily Dosage</Table.HeaderCell>
            <Table.HeaderCell>Fine Granules</Table.HeaderCell>
            <Table.HeaderCell>Capsules</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <TableRows />
        </Table.Body>
        </Table>
        <p>* N/R: Not Recommend for infants and young children since they may have difficulty swallowing.</p>
        <p>** Each capsule weighs 500 mg or 0.5 gram.</p>
        </>
    )
}

export const StrongSolution = () => {
const strong_solution= [
  {   "alcohol_proof": "Amount of Alcohol",   "95_percent": "80 mL or fl oz",   "90_percent": "80 mL or fl oz",   "80_percent": "80 mL or fl oz" },
  {   "alcohol_proof": "Amount of Water to Add",   "95_percent": "15 mL or fl oz",   "90_percent": "10 mL or fl oz",   "80_percent": "none" },
  {   "alcohol_proof": "Total Amount of Solution",   "95_percent": "95 mL or fl oz",   "90_percent": "90 mL or fl oz",   "80_percent": "80 mL or fl oz" }
 ]
 const TableRows = () => {
  return  strong_solution.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.alcohol_proof}</Table.Cell>
      <Table.Cell>{item['95_percent']}</Table.Cell>
      <Table.Cell>{item['90_percent']}</Table.Cell>
      <Table.Cell>{item['80_percent']}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Alcohol Proof</Table.HeaderCell>
          <Table.HeaderCell>95% (190 Proof)</Table.HeaderCell>
          <Table.HeaderCell>90% (180 Proof)</Table.HeaderCell>
          <Table.HeaderCell>80% (160 Proof)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const StandardSolution = () => {
 const standard_solution= [
  {   "alcohol_proof": "Amount of Alcohol",   "95_percent": "60 mL or fl oz",   "90_percent": "60 mL or fl oz",   "80_percent": "60 mL or floz" },
  {   "alcohol_proof": "Amount of Water to Add",   "95_percent": "35 mL or fl oz",   "90_percent": "30 mL or fl oz",   "80_percent": "20 mL or fl oz" },
  {   "alcohol_proof": "Total Amount of Solution",   "95_percent": "95 mL or fl oz",   "90_percent": "90 mL or fl oz",   "80_percent": "80 mL or fl oz" }
 ]
 const TableRows = () => {
  return  standard_solution.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.alcohol_proof}</Table.Cell>
      <Table.Cell>{item['95_percent']}</Table.Cell>
      <Table.Cell>{item['90_percent']}</Table.Cell>
      <Table.Cell>{item['80_percent']}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Alcohol Proof</Table.HeaderCell>
          <Table.HeaderCell>95% (190 Proof)</Table.HeaderCell>
          <Table.HeaderCell>90% (180 Proof)</Table.HeaderCell>
          <Table.HeaderCell>80% (160 Proof)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const WeakSolution = () => {
 const weak_solution= [
  {   "alcohol_proof": "Amount of Alcohol",   "95_percent": "40 mL or fl oz",   "90_percent": "40 mL or fl oz",   "80_percent": "40 mL or fl oz" },
  {   "alcohol_proof": "Amount of Water to Add",   "95_percent": "55 mL or fl oz",   "90_percent": "50 mL or fl oz",   "80_percent": "40 mL or fl oz" },
  {   "alcohol_proof": "Total Amount of Solution",   "95_percent": "95 mL or fl oz",   "90_percent": "90 mL or fl oz",   "80_percent": "80 mL or fl oz" }
 ]
 const TableRows = () => {
  return  weak_solution.map((item) =>(
    <Table.Row>
      <Table.Cell>{item.alcohol_proof}</Table.Cell>
      <Table.Cell>{item['95_percent']}</Table.Cell>
      <Table.Cell>{item['90_percent']}</Table.Cell>
      <Table.Cell>{item['80_percent']}</Table.Cell>
    </Table.Row>
  ))
}

  return (
      <>
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Alcohol Proof</Table.HeaderCell>
          <Table.HeaderCell>95% (190 Proof)</Table.HeaderCell>
          <Table.HeaderCell>90% (180 Proof)</Table.HeaderCell>
          <Table.HeaderCell>80% (160 Proof)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRows />
      </Table.Body>
      </Table>
      </>
  )
}

export const IllnessChart = () => {
  const illnesses_chart= [
    {   "illness": "Acute Illnesses",   "dosage": "Small, frequent doses, ranging from every 15 minutes up to every 2 hours",   "expected_improvement": "Look for signs of improvement within 1-3 hours" },
    {   "illness": "Subacute Illnesses",   "dosage": "Dose every 2-4 hours or 4-8 times daily",   "expected_improvement": "Anticipate improvement within 24-48 hours. Subacute illnesses typically arise when acute conditions are untreated, leading to lingering symptoms." },
    {   "illness": "Chronic Illnesses",   "dosage": "Typically 2-4 times daily",   "expected_improvement": "Some improvement should be noticeable within 7-10 days. Chronic illnesses persist for more than a week or two, requiring a consistent approach for gradual recovery." },
    {   "illness": "Degenerative Illnesses",   "dosage": "Similar to chronic illnesses (2-4 times daily)",   "expected_improvement": "Given the severely weakened state of the body, significant improvement may take longer, up to 1-3 weeks." }
   ]
   const TableRows = () => {
    return  illnesses_chart.map((item) =>(
      <Table.Row>
        <Table.Cell>{item.illness}</Table.Cell>
        <Table.Cell>{item.dosage}</Table.Cell>
        <Table.Cell>{item.expected_improvement}</Table.Cell>
      </Table.Row>
    ))
  }
  
    return (
        <>
        <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Illness</Table.HeaderCell>
            <Table.HeaderCell>Dosage</Table.HeaderCell>
            <Table.HeaderCell>Expected Improvement</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <TableRows />
        </Table.Body>
        </Table>
        </>
    )
}

