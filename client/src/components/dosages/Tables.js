import React from "react"
import { Table } from 'semantic-ui-react'

export const AgeDosageChart = () => {
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
          <Table.Row>
            <Table.Cell>1 month old</Table.Cell>
            <Table.Cell>1/18 - 1/14 of adult dose</Table.Cell>
            <Table.Cell>0.3 - 0.4 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 - 6 month old</Table.Cell>
            <Table.Cell>1/14 - 1/7 of adult dose</Table.Cell>
            <Table.Cell>0.4 - 0.9 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>6 - 12 month old</Table.Cell>
            <Table.Cell>1/7 - 1/5 of adult dose</Table.Cell>
            <Table.Cell>0.9 - 1.2 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1 - 2 years old</Table.Cell>
            <Table.Cell>1/5 - 1/4 of adult dose</Table.Cell>
            <Table.Cell>1.2 - 1.5 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2 - 4 years old</Table.Cell>
            <Table.Cell>1/4 - 1/3 of adult dose</Table.Cell>
            <Table.Cell>1.5 - 2.0 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>4 - 6 years old</Table.Cell>
            <Table.Cell>1/3 - 2/5 of adult dose</Table.Cell>
            <Table.Cell>2.0 - 2.4 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>6 - 9 years old</Table.Cell>
            <Table.Cell>2/5 - 1/2 of adult dose</Table.Cell>
            <Table.Cell>2.4 - 3.0 grams</Table.Cell>
            <Table.Cell>5 - 6 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>9 - 14 years old</Table.Cell>
            <Table.Cell>1/2 - 2/3 of adult dose</Table.Cell>
            <Table.Cell>3.0 - 4.0 grams</Table.Cell>
            <Table.Cell>6 - 8 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>14 - 18 years old</Table.Cell>
            <Table.Cell>2/3 - full adult dose</Table.Cell>
            <Table.Cell>4.0 - 6.0 grams</Table.Cell>
            <Table.Cell>8 - 12 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>18 - 60 years old</Table.Cell>
            <Table.Cell>adult dose</Table.Cell>
            <Table.Cell>6.0 grams</Table.Cell>
            <Table.Cell>12 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>60 years old and over</Table.Cell>
            <Table.Cell>3/4 of adult dose or less</Table.Cell>
            <Table.Cell>4.5 - 6.0 grams</Table.Cell>
            <Table.Cell>9 - 12 capsules**</Table.Cell>
          </Table.Row>
        </Table.Body>
        </Table>
        <p>* N/R: Not Recommend for infants and young children since they may have difficulty swallowing.

        ** Each capsule weighs 500 mg or 0.5 gram.</p>
        </>
    )
}

export const WeightDosageChart = () => {
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
          <Table.Row>
            <Table.Cell>30 - 40 lbs</Table.Cell>
            <Table.Cell>20% - 27% of adult dose</Table.Cell>
            <Table.Cell>1.2 - 1.6 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>40 - 50 lbs</Table.Cell>
            <Table.Cell>27% - 33% of adult dose</Table.Cell>
            <Table.Cell>1.6 - 1.9 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>50 - 60 lbs</Table.Cell>
            <Table.Cell>33% - 40% of adult dose</Table.Cell>
            <Table.Cell>1.9 - 2.4 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>60 - 70 lbs</Table.Cell>
            <Table.Cell>40% - 47% of adult dose</Table.Cell>
            <Table.Cell>2.4 - 2.8 grams</Table.Cell>
            <Table.Cell>N/R*</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>70 - 80 lbs</Table.Cell>
            <Table.Cell>47% - 53% of adult dose</Table.Cell>
            <Table.Cell>2.8 - 3.2 grams</Table.Cell>
            <Table.Cell>5 - 6 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>80 - 100 lbs</Table.Cell>
            <Table.Cell>53% - 67% of adult dose</Table.Cell>
            <Table.Cell>3.2 - 4.0 grams</Table.Cell>
            <Table.Cell>6 - 8 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>100 - 120 lbs</Table.Cell>
            <Table.Cell>67% - 80% of adult dose</Table.Cell>
            <Table.Cell>4.0 - 4.8 grams</Table.Cell>
            <Table.Cell>8 - 10 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>120 - 150 lbs</Table.Cell>
            <Table.Cell>80% - 100% of adult dose</Table.Cell>
            <Table.Cell>4.8 - 6.0 grams</Table.Cell>
            <Table.Cell>10 - 12 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>150 lbs</Table.Cell>
            <Table.Cell>adult dose</Table.Cell>
            <Table.Cell>6.0 grams</Table.Cell>
            <Table.Cell>12 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>150 - 200 lbs</Table.Cell>
            <Table.Cell>100% - 133% of adult dose</Table.Cell>
            <Table.Cell>6.0 - 7.9 grams</Table.Cell>
            <Table.Cell>12 - 16 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>200 - 250 lbs</Table.Cell>
            <Table.Cell>133% - 167% of adult dose</Table.Cell>
            <Table.Cell>7.9 - 10.0 grams</Table.Cell>
            <Table.Cell>16 - 20 capsules**</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>250 - 300 lbs</Table.Cell>
            <Table.Cell>167% - 200% of adult dose</Table.Cell>
            <Table.Cell>10.0 - 12.0 grams</Table.Cell>
            <Table.Cell>20 - 24 capsules**</Table.Cell>
          </Table.Row>
        </Table.Body>
        </Table>
        <p>* N/R: Not Recommend for infants and young children since they may have difficulty swallowing.

        ** Each capsule weighs 500 mg or 0.5 gram.</p>
        </>
    )
}

export const IllnessChart = () => {
  return (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Illness </Table.HeaderCell>
        <Table.HeaderCell>Dosage </Table.HeaderCell>
        <Table.HeaderCell>Expected Improvement </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Acute Illnesses </Table.Cell>
        <Table.Cell>Small, frequent doses, ranging from every 15 minutes up to every 2 hours </Table.Cell>
        <Table.Cell>Look for signs of improvement within 1-3 hours </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Subacute Illnesses </Table.Cell>
        <Table.Cell>Dose every 2-4 hours or 4-8 times daily </Table.Cell>
        <Table.Cell>Anticipate improvement within 24-48 hours. Subacute illnesses typically arise when acute conditions are untreated, leading to lingering symptoms. </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Chronic Illnesses </Table.Cell>
        <Table.Cell>Typically 2-4 times daily </Table.Cell>
        <Table.Cell>Some improvement should be noticeable within 7-10 days. Chronic illnesses persist for more than a week or two, requiring a consistent approach for gradual recovery. </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Degenerative Illnesses </Table.Cell>
        <Table.Cell>Similar to chronic illnesses (2-4 times daily) </Table.Cell>
        <Table.Cell>Given the severely weakened state of the body, significant improvement may take longer, up to 1-3 weeks. </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  )
}