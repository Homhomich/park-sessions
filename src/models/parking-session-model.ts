import {Car} from "./car";
import {ParkingArea} from "./parking-area";

export interface ParkingSessionModel{
    sessionId: number,
    entryTime: number,
    exitTime?: number,
    car: Car,
    parkingArea: ParkingArea,
}
