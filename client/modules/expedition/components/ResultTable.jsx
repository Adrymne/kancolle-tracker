import React from 'react';
import { Table } from 'react-bootstrap';
import ExpeditionFleet from './ExpeditionFleet';

const ResultTable = ({ expeditions }) => (
  <Table>
    <thead>
      <tr>
        <th>#</th>
        <th>JP Name</th>
        <th>Fleet</th>
        <th>Fuel</th>
        <th>Ammo</th>
        <th>Steel</th>
        <th>Bauxite</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
    {expeditions.map(expedition => (
      <tr key={expedition._id}>
        <td>{expedition.num}</td>
        <td>{expedition.jp}</td>
        <td><ExpeditionFleet fleet={expedition.fleet} /></td>
        <td>{expedition.output.fuel}</td>
        <td>{expedition.output.ammo}</td>
        <td>{expedition.output.steel}</td>
        <td>{expedition.output.bauxite}</td>
        <td>{expedition.score}</td>
      </tr>
    ))}
    </tbody>
  </Table>
);
ResultTable.propTypes = {
  expeditions: React.PropTypes.array.isRequired,
};

export default ResultTable;
