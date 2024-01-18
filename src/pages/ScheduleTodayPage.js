
import React, { useState, useEffect } from "react";
import AttendanceGrid from "../components/AttendanceGrid";
import ScheduleGrid from "../components/ScheduleGrid";
import { teachers, allocations } from "../data";

const ScheduleTodayPage = () => {
    const [teachersData, setTeachersData] = useState(teachers); // Store teacher attendance status
    const [techerAllocations, setAllocations] = useState(allocations);
    useEffect(() => {
        let newAllocations = techerAllocations.map((item) => {
            return getAssignedTeacher(item);
        });
        setAllocations(newAllocations);
    }, [teachersData])
    const handleAttendanceChange = (teacher, status) => {
        // Update teacher attendance status
        let tempteachersdata = JSON.parse(JSON.stringify(teachersData));
        tempteachersdata = tempteachersdata.map((item) => {
            if (item.id === teacher.id) {
                return {
                    ...item,
                    attendance: status
                }
            }
            else {
                return item;
            }
        });
        setTeachersData(tempteachersdata);

    };
    const getAssignedTeacher = (student) => {
        let assignedTeacher = "";
        let currentTeacherHierarchy = 4;
        if (student.teacher) {
            //check if teacher is Present or Not
            let teacher = teachersData?.filter((item) => {
                currentTeacherHierarchy = item.hierarchy;
                return item.name === student.teacher && item.attendance === 'Present';
            });
            if (teacher.length)
                assignedTeacher = teacher[0].name;
        }
        if (!assignedTeacher) {
            // If no teacher is allocated, find the teacher higher up in hierarchy
            let availableTeachers = teachersData?.filter((item) => {
                return item.attendance === 'Present' && item.subjects?.includes(student.subject)
            });
            let sortedTeachers = availableTeachers.length && availableTeachers.sort((a, b) => b.hierarchy - a.hierarchy);

            let sortedTeachersWithHeighrHierarchy = sortedTeachers.filter((item) => {
                return item.hierarchy < currentTeacherHierarchy;
            })
            if (sortedTeachersWithHeighrHierarchy.length) {
                assignedTeacher = sortedTeachersWithHeighrHierarchy[0].name;
            }
        }

        return {
            ...student,
            teacher: assignedTeacher ? assignedTeacher : "Not Assigned"
        };
    };
    return (
        <>
            <div className="pageheader">Schedule Today</div>
            <div className='schedule-container'>

                {/* Attendance Section */}
                <div className="attendance-section">
                    <h2>Attendance</h2>
                    <AttendanceGrid teachers={teachersData} handleAttendanceChange={handleAttendanceChange} />
                </div>

                {/* Vertical Separator */}
                <div className="separator" />

                {/* Current Schedule Section */}
                <div className="schedule-section">
                    <h2>Current Schedule</h2>
                    <ScheduleGrid allocations={techerAllocations} />
                </div>
            </div>
        </>

    );
};

export default ScheduleTodayPage;
