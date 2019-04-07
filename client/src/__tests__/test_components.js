import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar.js';
import CompleteTable from '../components/CompleteTable.js';
import TimeBlock from '../components/TimeBlock.js';
import TableContent from '../components/TableContent.js';
import FixedTable from '../components/FixedTable.js';


it('renders without crashing', () => {
    const div = document.createElement('div');
    const tbody = document.createElement('tbody');
    ReactDOM.render(<Sidebar/ >, div);
    ReactDOM.render(<CompleteTable/ >, div);
    ReactDOM.render(<FixedTable/ >, tbody);
    ReactDOM.render(<TableContent/ >, tbody);
    ReactDOM.render(<TimeBlock/ >, div);
})

