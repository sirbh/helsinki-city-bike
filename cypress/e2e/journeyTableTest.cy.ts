// import { journeys } from "../../util/helperdata";

// import { journeys } from "../../util/helperdata";
import { getStationSortedByDeparture, getStationSortedByDistance, getStationSortedByDuration, getStationSortedByReturn } from "../../util/testHelper";

describe("journey table test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should have correct header", () => {
    cy.get("table thead tr th:nth-child(1)").should(
      "contain",
      "Departure station"
    );
    cy.get("table thead tr th:nth-child(2)").should(
      "contain",
      "Return Station"
    );
    cy.get("table thead tr th:nth-child(3)").should(
      "contain",
      "Covered Distance"
    );
    cy.get("table thead tr th:nth-child(4)").should("contain", "Duration");
  });
  it("should have correct number of rows", () => {
    cy.get("table tbody tr").should("have.length", 10);
  });
  it("should have the correct content in a specific cell", () => {
    cy.get("table tbody tr:nth-child(2) td:nth-child(1)").should(
      "contain",
      "Aalto-yliopisto (M), Korkeakouluaukio"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(2)").should(
      "contain",
      "Tekniikantie"
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(3)").should(
      "contain",
      0.51
    );
    cy.get("table tbody tr:nth-child(2) td:nth-child(4)").should(
      "contain",
      2.5
    );
  });

  it("should be sorted by departure station by default", () => {
    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const departureStations = cellDataArray.filter((_d, i) => i % 4 === 0);
        expect(departureStations).to.deep.equal(
          getStationSortedByDeparture("asc")
            .map((station) => station.departure_station_name)
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by departure station if clicked on the departure station tab",() => {
    cy.contains('Departure Station').click();
    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const departureStations = cellDataArray.filter((_d, i) => i % 4 === 0);
        expect(departureStations).to.deep.equal(
          getStationSortedByDeparture("desc")
            .map((station) => station.departure_station_name)
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by return station if clicked on the return station tab",() => {
    cy.contains('Return Station').click();
    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const returnStations = cellDataArray.filter((_d, i) => i % 4 === 1);
        expect(returnStations).to.deep.equal(
          getStationSortedByReturn("asc")
            .map((station) => station.return_station_name)
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by return station in descending order if clicked twice on the return station tab",() => {
    cy.contains('Return Station').click();
    cy.wait(1000);
    cy.contains('Return Station').click();
    cy.wait(1000);
    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const returnStations = cellDataArray.filter((_d, i) => i % 4 === 1);
        expect(returnStations).to.deep.equal(
          getStationSortedByReturn("desc")
            .map((station) => station.return_station_name)
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by covered distance in ascending order if clicked on the covered distance tab",() => {
    cy.contains('Covered Distance').click();
    cy.wait(1000);

    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const distanceArray = cellDataArray.filter((_d, i) => i % 4 === 2);
        expect(distanceArray).to.deep.equal(
          getStationSortedByDistance("asc")
            .map((station) => (station.covered_distance/1000).toFixed(2))
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by covered distance in descending order if clicked on the covered distance tab twice",() => {
    cy.contains('Covered Distance').click();
    cy.wait(1000);
    cy.contains('Covered Distance').click();
    cy.wait(1000);

    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const distanceArray = cellDataArray.filter((_d, i) => i % 4 === 2);
        expect(distanceArray).to.deep.equal(
          getStationSortedByDistance("desc")
            .map((station) => (station.covered_distance/1000).toFixed(2))
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by duration in ascending order if clicked on the duration tab",() => {
    cy.contains('Duration').click();
    cy.wait(1000);

    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const durationArray = cellDataArray.filter((_d, i) => i % 4 === 3);
        expect(durationArray).to.deep.equal(
          getStationSortedByDuration("asc")
            .map((station) => (station.duration/60).toFixed(1))
            .slice(0, 10)
        );
      });
  });

  it("should be sorted by duration in desceding order if clicked on the duration tab twice",() => {
    cy.contains('Duration').click();
    cy.wait(1000);
    cy.contains('Duration').click();
    cy.wait(1000);

    cy.get("table tbody tr td")
      .then(($el) => {
        return Cypress._.map($el, "innerText");
      })
      .then((cellDataArray) => {
        const durationArray = cellDataArray.filter((_d, i) => i % 4 === 3);
        expect(durationArray).to.deep.equal(
          getStationSortedByDuration("desc")
            .map((station) => (station.duration/60).toFixed(1))
            .slice(0, 10)
        );
      });
  });

});
