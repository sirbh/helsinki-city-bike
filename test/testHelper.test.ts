import { expect } from "@jest/globals";
import { getAvgDistanceEndingOnStation, getAvgDistanceStartingFromStation, getJourneyEnding, getJourneyStarting, getPopularDepartureStation, getPopularReturnStation, getStationDetailsByID } from "../util/testHelper";

test('if getStationDetails works as expected',()=>{
    const result = getStationDetailsByID(14);

    expect(result?.id).toBe(14);
    expect(result?.name).toBe('Senate Square');
    expect(result?.address).toBe('Alexandersgatan 22');
    expect(result?.city).toBe('Espoo');
    expect(result?.operator).toBe('CityBike Finland');
    expect(result?.capacity).toBe(22);
    expect(result?.x).toBe(24.9526414004662);
    expect(result?.y).toBe(60.1691277919118);
});

test('if getJourneyStarting gives count of all journey starting from station', ()=>{
    expect(getJourneyStarting(541)).toBe(2);
    expect(getJourneyStarting(45)).toBe(3);
    expect(getJourneyStarting(533)).toBe(0);
});

test('if getJourneyEnding gives count of all journey ending at station', ()=>{
    expect(getJourneyEnding(541)).toBe(2);
    expect(getJourneyEnding(45)).toBe(4);
    expect(getJourneyEnding(54)).toBe(0);
});

test('if getAvgDistanceStartingFromStation returns avg distance for journeys starting from station', ()=>{
    expect(getAvgDistanceStartingFromStation(541)).toBeCloseTo(792,2);
    expect(getAvgDistanceStartingFromStation(45)).toBeCloseTo(2601.556,2);
    expect(getAvgDistanceStartingFromStation(533)).toBeCloseTo(0,2);
});

test('if getAvgDistanceEndingOnStation returns avg distance for journeys ending at station', ()=>{
    expect(getAvgDistanceEndingOnStation(541)).toBeCloseTo(683,2);
    expect(getAvgDistanceEndingOnStation(45)).toBeCloseTo(4371.417,2);
    expect(getAvgDistanceEndingOnStation(54)).toBeCloseTo(0,2);
});

test('if getPopularReturnStation returns top return station for given station', ()=>{
    const result1 = getPopularReturnStation(541);
    expect(result1.length).toBe(2);
    expect(result1[0].id).toBe(547);
    expect(result1[0].count).toBe(1);
    expect(result1[1].id).toBe(533);
    expect(result1[1].count).toBe(1);

    const result2 = getPopularReturnStation(54);
    expect(result2.length).toBe(1);
    expect(result2[0].id).toBe(45);
    expect(result2[0].count).toBe(2);

    const result3 = getPopularReturnStation(533);
    expect(result3.length).toBe(0);
    expect(result3).toEqual([]);

});

test('if getPopularDepartureStation returns top departure station for given station', ()=>{
    const result1 = getPopularDepartureStation(533);
    expect(result1.length).toBe(2);
    expect(result1[0].id).toBe(547);
    expect(result1[0].count).toBe(2);
    expect(result1[1].id).toBe(541);
    expect(result1[1].count).toBe(1);


    const result3 = getPopularDepartureStation(54);
    expect(result3.length).toBe(0);
    expect(result3).toEqual([]);

});