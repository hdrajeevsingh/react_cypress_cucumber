import AttendanceGrid from '../../src/components/AttendanceGrid';
import { teachers } from "../../src/data";
describe('AttendanceGrid Component', () => {

    beforeEach(() => {
        // Mount the component with required props before each test
        cy.mount(<AttendanceGrid teachers={teachers} handleAttendanceChange={cy.stub().as('handleAttendanceChange')} />);
    });

    it('renders a table with the correct structure', () => {
        cy.get('table#currentScheduleTable').should('exist');
        cy.get('table#currentScheduleTable thead th').should('have.length', 2); // Ensure two header columns
        cy.get('table#currentScheduleTable tbody tr').should('have.length', teachers.length); // Ensure correct number of rows
    });

    it('displays teacher names and attendance status correctly', () => {
        teachers.forEach((teacher) => {
            cy.get(`table#currentScheduleTable tbody td:contains("${teacher.name}")`).should('exist');
            cy.get(`table#currentScheduleTable tbody select[data-teacher="${teacher.name}"]`).should('have.value', teacher.attendance);
        });
    });

    it('calls handleAttendanceChange when attendance is changed', () => {
        // Simulate changing attendance for the first teacher
        cy.get('table#currentScheduleTable tbody select[data-teacher="Severus Snape"]').select('Absent');

        // Check if handleAttendanceChange was called with the correct arguments
        cy.get('@handleAttendanceChange').should('be.calledWith', teachers[4], 'Absent');
    });
});
