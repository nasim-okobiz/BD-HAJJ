import React from 'react';

const SubAgent = () => {
    return (
        <div className="bg-blue-200 p-4 w-full mt-4">
            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th>No</th>
                        <th>Sub-Agent Name</th>
                        <th>ID No</th>
                        <th>NID Number</th>
                        <th>Incentive</th>
                        <th>Edit</th>
                        <th>Active</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-blue-100">
                        <td>1</td>
                        <td>Agent A</td>
                        <td>SA1234</td>
                        <td>1234567890</td>
                        <td>$300</td>
                        <td><button className="bg-blue-600 text-white p-1 rounded">Edit</button></td>
                        <td><button className="bg-green-500 text-white p-1 rounded">Active</button></td>
                        <td><button className="bg-red-500 text-white p-1 rounded">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SubAgent;
