import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
beforeEach(() => {
    // For local testing, app is hosted at http://localhost:3000
    cy.visit('http://localhost:3000');
});
Given(/^the Hogwarts teachers' attendance is as follows:$/, (dataTable) => {
    cy.then(() => {
        dataTable.hashes().forEach((row) => {
            const teacher = row.Teacher;
            const attendance = row.Attendance;
            cy.get(`select[data-teacher="${teacher}"]`).select(attendance);
        });
    });
});
Given('the current schedule is as follows:', (dataTable) => {
    cy.get('table#currentScheduleTable').should('be.visible');
    dataTable.hashes().forEach((row, index) => {
        const student = row.Student;
        const subject = row.Subject;
        const teacher = row.Teacher;
        cy.get(`[data-test-id="${student}"]`).children().eq(0).should('contain', student);
        cy.get(`[data-test-id="${student}"]`).children().eq(1).should('contain', subject);
        cy.get(`[data-test-id="${student}"]`).children().eq(2).should('contain', teacher);
    });
});
When('the teacher Rubeus Hagrid is marked as "Absent"', () => {
    // Select "Absent" for the teacher Rubeus Hagrid
    cy.get('select[data-teacher="Rubeus Hagrid"').select('Absent', { force: true });
});
Then('Hermione Granger should be auto-assigned the teacher Minerva McGonagall', () => {
    cy.get('[data-test-id="Hermione Granger"]').children().eq(2).should('contain', 'Minerva McGonagall');
})
Then('the updated schedule should be as follows:', (dataTable) => {
    // Assuming your app has a table with id currentScheduleTable
    dataTable.hashes().forEach((row, index) => {
        const student = row.Student;
        const subject = row.Subject;
        const teacher = row.Teacher;
        cy.get(`[data-test-id="${student}"]`).children().eq(0).should('contain', student);
        cy.get(`[data-test-id="${student}"]`).children().eq(1).should('contain', subject);
        cy.get(`[data-test-id="${student}"]`).children().eq(2).should('contain', teacher);
    })
});



