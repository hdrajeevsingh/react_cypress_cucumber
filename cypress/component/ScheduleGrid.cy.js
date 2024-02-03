import ScheduleGrid from '../../src/components/ScheduleGrid';

describe('ScheduleGrid Component', () => {
    const allocationsData = [
        { student: 'Harry Potter', subject: 'Potions Master', currentAssignTeacher: 'Severus Snape' },
        { student: 'Hermione Granger', subject: 'Potions Master', currentAssignTeacher: 'Minerva McGonagall' },
        { student: "Ron Weasley", subject: "Potions Master", currentAssignTeacher: "Severus Snape" }
        // Add more allocation objects as needed
    ];

    beforeEach(() => {
        // Mount the component with required props before each test
        cy.mount(<ScheduleGrid allocations={allocationsData} getAssignedTeacher={cy.stub().as('getAssignedTeacher')} />);
    });

    it('renders a table with the correct structure', () => {
        cy.get('table#currentScheduleTable').should('exist');
        cy.get('table#currentScheduleTable thead th').should('have.length', 3); // Ensure three header columns
        cy.get('table#currentScheduleTable tbody tr').should('have.length', allocationsData.length); // Ensure correct number of rows
    });

    it('displays allocation data correctly', () => {
        allocationsData.forEach((allocation) => {
            cy.get(`table#currentScheduleTable tbody td:contains("${allocation.student}")`).should('exist');
            cy.get(`table#currentScheduleTable tbody td:contains("${allocation.subject}")`).should('exist');
            cy.get(`table#currentScheduleTable tbody td:contains("${allocation.currentAssignTeacher}")`).should('exist');
        });
    });

    it('applies data-test-id to each row', () => {
        allocationsData.forEach((allocation) => {
            cy.get(`table#currentScheduleTable tbody tr[data-test-id="${allocation.student}"]`).should('exist');
        });
    });
});
