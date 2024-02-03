import React, { useState, useEffect } from "react";
import AttendanceGrid from "../components/AttendanceGrid";
import ScheduleGrid from "../components/ScheduleGrid";
import { teachers, allocations } from "../data";

const ScheduleTodayPage = () => {
    const [teachersData, setTeachersData] = useState(teachers); // Store teacher attendance status
    const [techerAllocations, setAllocations] = useState(allocations);
    useEffect(() => {
        let tempTeachers = JSON.parse(JSON.stringify(teachers));
        let sortedTeachersByHierarchy = tempTeachers.sort((a, b) => b.hierarchy - a.hierarchy);//sort all teachers based on hierarchy
        let newAllocations = techerAllocations.map((item) => {
            {/* get teachers list for subject and current assigned teacher for each student */ }
            let allocatedTeachers = updateTeacherList(item, sortedTeachersByHierarchy);
            return {
                ...item,
                teachers: allocatedTeachers?.['assignedTeachers'],
                currentAssignTeacher: allocatedTeachers?.['currentAssignTeacher']
            }
        });
        setAllocations(newAllocations);
        setTeachersData(teachers);
    }, []);
    const updateTeacherList = (student, sortedTeachersByHierarchy) => {
        let assignedTeachers = student.teachers || [];
        let lowestTeacherHierarchy = 4;
        let newAssignedTeachers = sortedTeachersByHierarchy.filter(teacher => {
            return teacher.hierarchy < lowestTeacherHierarchy && teacher.subjects?.includes(student.subject)
        });
        newAssignedTeachers.forEach(teacher => {
            if (!assignedTeachers.includes(teacher.name)) {
                assignedTeachers.push(teacher.name);
            }
        })
        return {
            assignedTeachers: assignedTeachers,
            currentAssignTeacher: getAssignedTeacher(assignedTeachers, teachers)
        }
    }

    const handleAttendanceChange = (teacher, status) => {
        // Update teacher attendance status
        let tempteachersdata = JSON.parse(JSON.stringify(teachersData));
        tempteachersdata = tempteachersdata?.map((item) => {
            if (item?.id === teacher?.id) {
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
        {/* update current Assigned teacher for each student if teacher ayttendance changed */ }
        let newAllocations = techerAllocations.map((item) => {

            return {
                ...item,
                currentAssignTeacher: getAssignedTeacher(item?.teachers, tempteachersdata)
            }
        });
        setAllocations(newAllocations);
    };

    const checkIfTeacherPresent = (name, newTeachersList) => {
        let teacher = newTeachersList?.filter(item => {
            return item?.name === name && item?.attendance === 'Present'
        })
        return teacher?.length ? true : false
    }
    const getAssignedTeacher = (assignedTeachers, newTeachersList) => {
        let getPresentTeachers = assignedTeachers?.filter(item => {
            return (checkIfTeacherPresent(item, newTeachersList));
        });
        return getPresentTeachers?.length ? getPresentTeachers?.[0] : 'Not Assigned'
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