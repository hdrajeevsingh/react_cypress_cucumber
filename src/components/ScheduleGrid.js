import React from "react";
const ScheduleGrid = ({ allocations, getAssignedTeacher }) => {
    return (
        <table id="currentScheduleTable">
            {/* Schedule table headers */}
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                </tr>
            </thead>
            {/* Schedule table body */}
            <tbody>
                {allocations.map((item) => (
                    <tr data-test-id={item.student} key={item.student}>
                        <td>{item.student}</td>
                        <td>{item.subject}</td>
                        <td>{item.currentAssignTeacher}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default ScheduleGrid;
