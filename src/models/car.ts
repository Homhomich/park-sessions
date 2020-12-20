import {ParkingSessionModel} from "./parking-session-model";

export interface Car{
    id: number,
    govNum?: string,
    makeAndModel?: string,
    hasFreeAccess?: boolean,
}
