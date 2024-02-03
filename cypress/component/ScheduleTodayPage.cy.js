import ScheduleTodayPage from '../../src/pages/ScheduleTodayPage';
describe('ScheduleTodayPage.cy.js', () => {
  it('mounts', () => {
    cy.viewport(800, 600)
    cy.mount(<ScheduleTodayPage />)

  })
  it('should display the page header', () => {
    cy.mount(<ScheduleTodayPage />)
    cy.get('.pageheader').should('have.text', 'Schedule Today');
  });
  it('should have Attendance Section, a vertical seperator and Current Schedule Section ', () => {
    cy.mount(<ScheduleTodayPage />)
    cy.get('.attendance-section').should('exist');
    cy.get('.separator').should('exist');
    cy.get('.schedule-section').should('exist');
    cy.get('.attendance-section').find('h2')
      // Perform assertions with the found <h2> element
      .should('have.text', 'Attendance');
    cy.get('.schedule-section').find('h2')
      // Perform assertions with the found <h2> element
      .should('have.text', 'Current Schedule');
  });
  it('Attendance section should have a table with two cloumns (Teacher and Attendance) ', () => {
    cy.mount(<ScheduleTodayPage />)
    cy.get('.attendance-section').
      find('table').should('exist');
    cy.get('.attendance-section')
      .find('table')
      .find('tr').eq(0)
      .find('th')
      .should('have.length', 2);
    cy.get('.attendance-section').find('table')
      .find('th').eq(0)
      .should('have.text', 'Teacher');
    cy.get('.attendance-section').find('table')
      .find('th').eq(1)
      .should('have.text', 'Attendance');
  });
  it('Current Schedule Section should have a table with three cloumns (Student, Subject and Teacher) ', () => {
    cy.mount(<ScheduleTodayPage />)
    cy.get('.schedule-section').
      find('table').should('exist');
    cy.get('.schedule-section')
      .find('table')
      .find('tr').eq(0)
      .find('th')
      .should('have.length', 3);
    cy.get('.schedule-section').find('table')
      .find('th').eq(0)
      .should('have.text', 'Student');
    cy.get('.schedule-section').find('table')
      .find('th').eq(1)
      .should('have.text', 'Subject');
    cy.get('.schedule-section').find('table')
      .find('th').eq(2)
      .should('have.text', 'Teacher');
  });
  it('should update teacher attendance', () => {
    cy.mount(<ScheduleTodayPage />)
    // Mock data for testing
    const teacher = 'Rubeus Hagrid';
    const newAttendanceStatus = 'Absent';
    // Interact with the UI
    cy.get(`select[data-teacher="${teacher}"]`).select(newAttendanceStatus);
    // Assertions
    cy.get(`select[data-teacher="${teacher}"]`).should('have.value', newAttendanceStatus);
  });
  it('should display the current schedule grid with correct allocations', () => {
    cy.mount(<ScheduleTodayPage />)
    // Mock data for testing
    const studentName = 'Harry Potter';
    const subject = 'Potions Master';
    const expectedTeacher = 'Horace Slughorn';
    cy.get(`[data-test-id="${studentName}"]`)
      .find('td')
      .eq(1) // Assuming the subject column is at index 1
      .should('have.text', subject);
    // Assertions
    cy.get(`[data-test-id="${studentName}"]`)
      .find('td')
      .eq(2) // Assuming the teacher column is at index 2
      .should('have.text', expectedTeacher);
  });
});